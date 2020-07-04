using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Users
{
    public class Models
    {
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
