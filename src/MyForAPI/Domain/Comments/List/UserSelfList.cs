using DB;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Comments.List
{
    class UserSelfList : CommentsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            var account = pager["Account"];
            var currentUserAccount = pager["CurrentUser"];
            string s = pager["s"] ?? "";

            var user = await Users.UsersHub.GetUserAsync(account);
            if (user == null)
                throw new Exception("要获取的用户不存在");

            Expression<Func<DB.Tables.Comment, bool>> whereStatement = comment => comment.CommenterId == user.Id;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Comments.CountAsync(whereStatement);
            pager.List = await db.Comments
                                 .FromSqlRaw(CommentsQueryString)
                                 .AsNoTracking()
                                 .OrderByDescending(comment => comment.CreateDate)
                                 .Where(whereStatement)
                                 .Skip(pager.Skip)
                                 .Take(pager.Size)
                                 .Include(comment => comment.Blog)
                                 .Select(comment => new Results.CommentItemInUserDetail
                                 { 
                                     Id = comment.Id,
                                     BlogCode = Convert.ToBase64String(Encoding.UTF8.GetBytes(comment.BlogId.ToString())),
                                     BlogTitle = comment.Blog.Title,
                                     DateTime = comment.CreateDate.ToString("yyyy-MM-dd HH:mm"),
                                     Content = comment.Content,
                                     AgreeCount = comment.AgreedCount
                                 })
                                 .ToListAsync();

            

            return pager;
        }
    }
}
