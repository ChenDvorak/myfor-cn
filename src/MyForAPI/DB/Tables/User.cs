using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DB.Tables
{
    /// <summary>
    /// 用户，客户
    /// </summary>
    public class User: Entity
    {
        /// <summary>
        /// 登录账号
        /// </summary>
        [Required, StringLength(20)]
        public string Account { get; set; } = "";
        /// <summary>
        /// 用户名字
        /// </summary>
        [Required, StringLength(20)]
        public string Name { get; set; } = "";
        [Required, StringLength(64)]
        public string Password { get; set; } = "";
        [Required, StringLength(64), EmailAddress]
        public string Email { get; set; } = "";
        public int AvatarId { get; set; } = 1;
        public File Avatar { get; set; }
        [Required, StringLength(512)]
        public string Introduction { get; set; } = "";
        public List<Blog> Blogs { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
