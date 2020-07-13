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
    /// 搜索列表的博文列表
    /// </summary>
    class SearchList : BlogsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            string s = pager["s"] ?? "";

            Expression<Func<DB.Tables.Blog, bool>> whereStatement = blog => blog.State == (int)Blog.BlogState.Enabled;
            var searchStatement = StatementBuild(s);
            if (searchStatement != null)
                whereStatement = whereStatement.And(searchStatement);

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
                                           Avatar = Files.File.GetVisitablePath(blog.Author.Avatar.SaveName),
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

        private Expression<Func<DB.Tables.Blog, bool>> StatementBuild(string search)
        {
            string[] searchKeywords = search.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            Expression<Func<DB.Tables.Blog, bool>> where = q => false;
            if (searchKeywords.Length == 0)
                where = null;
            else
            {
                for (int i = 0; i < searchKeywords.Length; i++)
                {
                    string keyword = searchKeywords[i];
                    if (i == 0)
                        where = q => q.Title.Contains(keyword, StringComparison.OrdinalIgnoreCase);
                    else
                        where = where.Or(q => q.Title.Contains(keyword, StringComparison.OrdinalIgnoreCase));
                }
            }
            return where;
        }
    }
}
