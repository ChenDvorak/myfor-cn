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
            var currentUserAccount = pager["CurrentUser"];
            Expression<Func<DB.Tables.Blog, bool>> whereStatement = blog => blog.State == (int)Blog.BlogState.Enabled;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Blogs.CountAsync(whereStatement);
            List<DB.Tables.Blog> modelList = await db.Blogs
                                                        .FromSqlRaw(BlogsQueryString)
                                                        .AsNoTracking()
                                                        .OrderByDescending(blog => blog.CreateDate)
                                                        .Where(whereStatement)
                                                        .Include(blog => blog.Author)
                                                             .ThenInclude(author => author.Avatar)
                                                        .Skip(pager.Skip)
                                                        .Take(pager.Size)
                                                        .ToListAsync();

            List<Results.BlogItem> list = await ConvertToBlogsList(modelList);
            if (currentUserAccount != null)
                list = await CurrentUserIsAgreedAsync(list, currentUserAccount);
            pager.List = list;

            return pager;
        }
    }
}
