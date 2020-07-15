using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Comments
{
    public class Models
    {
        /// <summary>
        /// 新评论
        /// </summary>
        internal struct NewComment
        {
            public int CommenterId { get; set; }
            public string Content { get; set; }
            public int BlogId { get; set; }
        }
    }
}
