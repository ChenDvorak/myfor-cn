using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Users
{
    public class Models
    {
        /// <summary>
        /// 登录信息
        /// </summary>
        public class Login
        {
            /// <summary>
            /// 登录账号或邮箱
            /// </summary>
            public string Account { get; set; }
            public string Password { get; set; }
        }
        /// <summary>
        /// 注册信息
        /// </summary>
        public class SignUp
        {
            public string Email { get; set; } = "";
            public string Account { get; set; } = "";
            public string Password { get; set; } = "";
            public string ConfirmPassword { get; set; } = "";
        }
    }
}
