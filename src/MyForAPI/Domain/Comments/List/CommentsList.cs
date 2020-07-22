using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Comments.List
{
    abstract class CommentsList
    {
        /// <summary>
        /// 评论列表类型
        /// </summary>
        [Flags]
        public enum ListType
        {
            /// <summary>
            /// 博文详情下的评论列表
            /// </summary>
            BlogDetail,
            /// <summary>
            /// 用户详情页的评论列表
            /// </summary>
            UserSelf
        }

        /// <summary>
        /// 评论内容显示的长度限制
        /// </summary>
        protected const int COMMENT_LIST_CONTENT_LENGTH = 100;
        /// <summary>
        /// 当评论内容太长，会截断一部分，然后拼接上这个省略字符
        /// </summary>
        protected const string COMMENT_LIST_CONTENT_OVERFLOW_CHARS = "...";

        public abstract Task<Paginator> GetListAsync(Paginator pager);

        /// <summary>
        /// 原始查询字符串
        /// </summary>
        /// <param name="contentMaxLength"></param>
        /// <returns></returns>
        protected string CommentsQueryString => $@"
SELECT
Id, State, CreateDate,
IF(CHAR_LENGTH(Content) > {COMMENT_LIST_CONTENT_LENGTH}, concat(left(content, {COMMENT_LIST_CONTENT_LENGTH}), '{COMMENT_LIST_CONTENT_OVERFLOW_CHARS}'), Content) as Content,
CommenterId, BlogId, AgreedCount
FROM Comments
";
    }
}
