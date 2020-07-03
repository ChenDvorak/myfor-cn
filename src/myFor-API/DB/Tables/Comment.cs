using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DB.Tables
{
    /// <summary>
    /// 评论
    /// </summary>
    public class Comment: Entity
    {
        [StringLength(200), Required]
        public string Content { get; set; } = "";
        [Required]
        public int CommenterId { get; set; }
        public User Commenter { get; set; }
        [Required]
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
        /// <summary>
        /// 赞同数
        /// </summary>
        [Required]
        public int AgreedCount { get; set; } = 0;
    }
}
