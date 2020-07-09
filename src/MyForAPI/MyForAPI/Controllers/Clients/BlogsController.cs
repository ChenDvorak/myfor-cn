using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Blogs;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace MyForAPI.Controllers.Clients
{
    public class BlogsController : ClientsSideController
    {
        private readonly Domain.Users.ICurrentUser _currentUser;
        public BlogsController(Domain.Users.ICurrentUser _currentUser)
        {
            this._currentUser = _currentUser;
        }

        /// <summary>
        /// 发布新博文
        /// </summary>
        [HttpPost, Authorize]
        public async Task<IActionResult> PostBlogAsync(Models.NewBlog model)
        {
            if (string.IsNullOrWhiteSpace(CurrentAccount))
                return Unauthorized("请先登录");
            var user = await _currentUser.GetUserAsync(CurrentAccount);
            (bool isSuccess, string msg) = await user.PostBlogAsync(model);
            if (isSuccess)
            {
                string encodeId = Convert.ToBase64String(Encoding.UTF8.GetBytes(msg));
                return Created($"/blogs/{encodeId}", encodeId);
            }
            return BadRequest(msg);
        }
    }
}
