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
        /// 获取评论列表
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        internal async Task<Paginator> GetCommentsListAsync(Paginator pager, List.CommentsList.ListType type)
        {
            List.CommentsList list = type switch
            { 
                List.CommentsList.ListType.BlogDetail => new List.ListInBlogDetail(),
                List.CommentsList.ListType.UserSelf => new List.UserSelfList(),
                List.CommentsList.ListType.AdministartorSide => new List.CommentsFromAdministartorSide(),
                _ => throw new ArgumentException()
            };
            pager = await list.GetListAsync(pager);
            return pager;
        }
    }
}
