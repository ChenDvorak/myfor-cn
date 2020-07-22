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
    class ListInBlogDetail : CommentsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            if (!int.TryParse(pager["BlogId"], out int blogId))
                throw new ArgumentException("参数错误");

            Expression <Func<DB.Tables.Comment, bool>> whereStatement = comment => comment.BlogId == blogId;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Comments.CountAsync(whereStatement);
            pager.List = await db.Comments
                                 .FromSqlRaw(CommentsQueryString)
                                 .AsNoTracking()
                                 .OrderByDescending(comment => comment.CreateDate)
                                 .Where(whereStatement)
                                 .Skip(pager.Skip)
                                 .Take(pager.Size)
                                 .Include(comment => comment.Commenter)
                                 .ThenInclude(commenter => commenter.Avatar)
                                 .Select(comment => new Results.CommentItem
                                 {
                                     Id = comment.Id,
                                     AuthorName = comment.Commenter.Name,
                                     AuthorAccount = comment.Commenter.Account,
                                     Avatar = Files.File.GetVisitablePath(comment.Commenter.Avatar.SaveName, "api"),
                                     DateTime = comment.CreateDate.ToLocalTime().ToString("yyyy-MM-dd HH:mm"),
                                     Content = comment.Content,
                                     AgreeCount = comment.AgreedCount
                                 })
                                 .ToListAsync();

            return pager;
        }
    }
}
