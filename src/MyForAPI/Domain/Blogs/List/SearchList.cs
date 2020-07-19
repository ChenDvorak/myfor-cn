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
            List<DB.Tables.Blog> modelList = await db.Blogs
                                       .FromSqlRaw(GetBlogsQueryString)
                                       .AsNoTracking()
                                       .OrderByDescending(blog => blog.CreateDate)
                                       .Where(whereStatement)
                                       .Include(blog => blog.Author)
                                            .ThenInclude(author => author.Avatar)
                                       .Skip(pager.Skip)
                                       .Take(pager.Size)
                                       .ToListAsync();

            List<Results.BlogItem> list = await ConvertToBlogsList(modelList);
            pager.List = list;

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
