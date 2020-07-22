using DB;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Blogs.List
{
    /// <summary>
    /// 用户自己的博文
    /// </summary>
    class UserSelfList : BlogsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            var account = pager["Account"];
            var currentUserAccount = pager["CurrentUser"];
            string s = pager["s"] ?? "";

            var user = await Users.UsersHub.GetUserAsync(account);
            if (user == null)
                throw new Exception("要获取的用户不存在");

            Expression<Func<DB.Tables.Blog, bool>> whereStatement = blog => blog.AuthorId == user.Id;
            if (!bool.TryParse(pager["IsSelf"], out bool isSelf))
                throw new ArgumentException("参数有误");
            //  如果当前用户不是要获取的用户，就只能获取通过的博文列表
            if (!isSelf)
                whereStatement = whereStatement.And(blog => blog.State == (int)Blog.BlogState.Enabled);

            var searchStatement = StatementBuild(s);
            if (searchStatement != null)
                whereStatement = whereStatement.And(searchStatement);

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
