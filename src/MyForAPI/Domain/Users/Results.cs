using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Users
{
    public class Results
    {
        public class LoginInfo
        {
            public string Account { get; set; } = "";
            public string Nickname { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string Jwt { get; set; } = "";
        }

        public class UserDetail
        {
            public string Account { get; set; } = "";
            public string Name { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string Email { get; set; } = "";
            public string Introduction { get; set; } = "";
            public string CreateDate { get; set; } = "";
        }

        public class UserItem_AdministartorSide
        {
            public int Id { get; set; }
            public string Account { get; set; }
            public string Name { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string CreateDate { get; set; } = "";
        }
    }
}
