using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Blogs.List
{
    /// <summary>
    /// 首页的博文列表
    /// </summary>
    internal class HomePageList : BlogsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            Expression<Func<DB.Tables.Blog, bool>> whereStatement = blog => blog.State == (int)Blog.BlogState.Enabled;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Blogs.CountAsync(whereStatement);
            pager.List = await db.Blogs.AsNoTracking()
                                       .OrderByDescending(blog => blog.CreateDate)
                                       .Where(whereStatement)
                                       .Include(blog => blog.Author)
                                            .ThenInclude(author => author.Avatar)
                                       .Skip(pager.Skip)
                                       .Take(pager.Size)
                                       .Select(blog => new Results.BlogItem
                                       {
                                           Code = Convert.ToBase64String(Encoding.UTF8.GetBytes(blog.Id.ToString())),
                                           AuthorName = blog.Author.Name,
                                           AuthorAccount = blog.Author.Account,
                                           Avatar = Files.File.GetVisitablePath(blog.Author.Avatar.SaveName, true),
                                           Title = blog.Title,
                                           PostedTime = blog.CreateDate.ToString("yyyy-MM-dd"),
                                           Content = blog.Content.Overflow(BLOG_LIST_CONTENT_LENGTH),
                                           IsFull = blog.Content.Length <= BLOG_LIST_CONTENT_LENGTH,
                                           CommentCount = blog.CommentCount,
                                           AgreeCount = blog.AgreedCount,
                                           ReferenceCount = blog.ReferencedCount,
                                           ThinkCount = blog.ThoughtCount
                                       })
                                       .ToListAsync();
            return pager;
        }
    }
}
