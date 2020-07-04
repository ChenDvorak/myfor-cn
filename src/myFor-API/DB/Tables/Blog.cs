using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DB.Tables
{
    /// <summary>
    /// 短博文
    /// </summary>
    public class Blog: Entity
    {
        [StringLength(64), Required]
        public string Title { get; set; } = "";
        [StringLength(1000), Required]
        public string Content { get; set; } = "";
        [Required]
        public int AuthorId { get; set; }
        public User Author { get; set; }
        /// <summary>
        /// 赞同数
        /// </summary>
        [Required]
        public int AgreedCount { get; set; } = 0;
        /// <summary>
        /// 评论
        /// </summary>
        public List<Comment> Comments { get; set; }
        /// <summary>
        /// 评论数
        /// </summary>
        [Required]
        public int CommentCount { get; set; } = 0;
        /// <summary>
        /// 引用自，没有则是 null
        /// </summary>
        public int? ReferencedFromId { get; set; }
        /// <summary>
        /// 被引用数
        /// </summary>
        [Required]
        public int ReferencedCount { get; set; } = 0;
        /// <summary>
        /// 见解自, 没有则是 null
        /// </summary>
        public int? ThoughtFromId { get; set; }
        /// <summary>
        /// 被见解数
        /// </summary>
        [Required]
        public int ThoughtCount { get; set; } = 0;
    }
}
