using DB;
using System;
using System.Collections.Generic;
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
    }
}
