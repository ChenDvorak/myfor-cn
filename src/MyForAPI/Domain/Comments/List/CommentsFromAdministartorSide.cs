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
    class CommentsFromAdministartorSide : CommentsList
    {
        public override async Task<Paginator> GetListAsync(Paginator pager)
        {
            var author = pager["author"] ?? "";
            if (!int.TryParse(author, out int authorId))
                throw new ArgumentException("参数错误");

            Expression<Func<DB.Tables.Comment, bool>> whereStatement = comment => comment.CommenterId == authorId;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Comments.CountAsync(whereStatement);
            pager.List = await db.Comments
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
                                     DateTime = comment.CreateDate.ToLocalTime().ToString("yyyy-MM-dd HH:mm"),
                                     Content = comment.Content,
                                     AgreeCount = comment.AgreedCount
                                 })
                                 .ToListAsync();
            return pager;
        }
    }
}
