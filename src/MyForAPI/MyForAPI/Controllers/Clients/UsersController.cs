using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Users;

namespace MyForAPI.Controllers.Clients
{
    /// <summary>
    /// 用户控制器
    /// </summary>
    public class UsersController : ClientsSideController
    {
        public UsersController() {}

        /*
         *  获取用户页详情
         */
        [HttpGet("{account}")]
        public async Task<IActionResult> GetUserPageDetailAsync(string account)
        {
            var user = await UsersHub.GetUserAsync(account);
            if (user == null) return Gone($"用户 @{account} 不存在");
            var detail = await user.GetUserDetailAsync();
            return Ok(detail);
        }
    }
}
