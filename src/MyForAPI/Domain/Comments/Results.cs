using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Comments
{
    public class Results
    {
        /// <summary>
        /// 博文详情页下的评论列表
        /// </summary>
        public class CommentItem
        {
            public int Id { get; set; }
            public string AuthorName { get; set; }
            public string AuthorAccount { get; set; }
            public string Avatar { get; set; }
            public string DateTime { get; set; }
            public string Content { get; set; }
            public int AgreeCount { get; set; }
        }

        /// <summary>
        /// 用户详情页的评论列表
        /// </summary>
        public class CommentItemInUserDetail
        {
            public int Id { get; set; }
            public string BlogCode { get; set; }
            public string BlogTitle { get; set; }
            public string DateTime { get; set; }
            public string Content { get; set; }
            public int AgreeCount { get; set; }
        }
    }
}
