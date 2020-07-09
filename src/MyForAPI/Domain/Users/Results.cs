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
            public string NickName { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string Jwt { get; set; } = "";
        }
    }
}
