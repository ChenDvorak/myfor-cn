using DB;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Comments
{
    /// <summary>
    /// 评论
    /// </summary>
    public class CommentsHub
    {
        /// <summary>
        /// 添加评论
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        internal async Task AddCommentAsync(Models.NewComment comment)
        {
            DB.Tables.Comment model = new DB.Tables.Comment
            { 
                BlogId = comment.BlogId,
                CommenterId = comment.CommenterId,
                Content = comment.Content
            };

            await using var db = new MyForDbContext();
            await db.Comments.AddAsync(model);
            int changeCount = await db.SaveChangesAsync();
            if (changeCount != 1)
                throw new Exception("评论失败");
        }

        /// <summary>
        /// 获取评论
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        internal async Task<Paginator> GetCommentsListAsync(int blogId, Paginator pager)
        {
            Expression<Func<DB.Tables.Comment, bool>> whereStatement = comment => comment.BlogId == blogId;

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Comments.CountAsync(whereStatement);
            pager.List = await db.Comments.AsNoTracking()
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
                                              DateTime = comment.CreateDate.ToString("yyyy-MM-dd HH:mm"),
                                              Content = comment.Content,
                                              AgreeCount = comment.AgreedCount
                                          })
                                          .ToListAsync();
            return pager;
        }
    }
}
