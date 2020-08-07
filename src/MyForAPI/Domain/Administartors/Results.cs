using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Administartors
{
    public class Results
    {
        /// <summary>
        /// 管理员登录后返回的登录信息
        /// </summary>
        public class UserInfo
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public string JWT { get; set; } = "";
        }

        public class UserItem
        {
            public int Id { get; set; }
            public string Account { get; set; }
            public string Email { get; set; }
            public string Avatar { get; set; }
            public string CreateDate { get; set; }
        }
    }
}
