using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DB.Tables
{
    /// <summary>
    /// 系统管理员
    /// </summary>
    public class Administartor: Entity
    {
        /// <summary>
        /// 账号和用户名
        /// </summary>
        [Required, StringLength(32)]
        public string UserName { get; set; } = "";
        /// <summary>
        /// 密码
        /// </summary>
        [Required, StringLength(64)]
        public string Password { get; set; } = "";
        /// <summary>
        /// 邮箱
        /// </summary>
        [Required, StringLength(64)]
        public string Email { get; set; } = "";
        /// <summary>
        /// 头像ID
        /// </summary>
        [Required]
        public int AvatarId { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        public File Avatar { get; set; }
    }
}
