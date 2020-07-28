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
        public abstract Task<Paginator> GetListAsync(Paginator pager);
    }
}
