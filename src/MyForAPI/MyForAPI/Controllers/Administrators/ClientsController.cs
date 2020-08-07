using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyForAPI.Controllers.Administrators
{
    /// <summary>
    /// 客户
    /// </summary>
    public class ClientsController : AdministartorsSideController
    {
        private readonly IUser _user;
        
        public ClientsController(IUser _user)
        {
            this._user = _user;
        }

        /*
*  获取客户列表
*  return:
*      200:    success
*/
        [HttpGet]
        public async Task<IActionResult> GetClientListAsync(int index, int size, string account)
        {
            var pager = Paginator.New(index, size, 1);
            pager["account"] = account ?? "";

            Domain.Users.UsersHub hub = new Domain.Users.UsersHub();
            pager = await hub.GetUserListAsync(pager, Domain.Users.UsersHub.ListType.AdministartorSide);
            return Ok(pager);
        }

        /*
         *  获取客户详情
         *  return:
         *      200:    success
         *      410:    client not exist
         */
        [HttpGet("{clientAccount}")]
        public async Task<IActionResult> GetClientDetailAsync(string clientAccount)
        {
            var user = await _user.GetUserAsync(clientAccount);
            if (user == null) return Gone($"该用户@{clientAccount}不存在");
            var detail = await user.GetUserDetailAsync();
            return Ok(detail);
        }
    }
}
