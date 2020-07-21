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

        /*
         *  获取用户自己发布的博文
         *  return:
         *      200:    success
         */
        [HttpGet("{account}/blogs")]
        public async Task<IActionResult> GetUserBlogsListAsync(int index, int size, string account, string s)
        {
            var pager = Domain.Paginator.New(index, size, 3);
            pager["Account"] = account;
            pager["s"] = s;
            pager["CurrentUser"] = CurrentAccount;
            pager["isSelf"] = (CurrentIsLogged && CurrentAccount.Equals(account, StringComparison.OrdinalIgnoreCase)).ToString();

            var blogsHub = new Domain.Blogs.BlogsHub();
            pager = await blogsHub.GetListAsync(Domain.Blogs.List.BlogsList.ListType.UserSelf, pager);
            return Ok(pager);
        }
    }
}
