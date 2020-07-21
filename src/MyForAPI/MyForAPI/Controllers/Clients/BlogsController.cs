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

        /*
         *  发布新博文
         *  return:
         *      201:    success
         *      400:    
         */
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
                return Created($"/b/{encodeId}", encodeId);
            }
            return BadRequest(msg);
        }

        /*
         *  获取首页的博文列表
         *  return:
         *      200:    success
         */
        [HttpGet("home")]
        public async Task<IActionResult> GetBlogsByHomePageAsync(int index, int size)
        {
            var pager = Domain.Paginator.New(index, size, 1);
            pager["CurrentUser"] = CurrentAccount;

            BlogsHub blogsHub = new BlogsHub();
            pager = await blogsHub.GetListAsync(Domain.Blogs.List.BlogsList.ListType.HomePage, pager);
            return Ok(pager);
        }

        /*
         *  获取搜索列表的博文列表
         *  return:
         *      200: success
         */
        [HttpGet("search")]
        public async Task<IActionResult> GetBlogsBySearchAsync(int index, int size, string s)
        {
            var pager = Domain.Paginator.New(index, size, 2);
            pager["s"] = s;
            pager["CurrentUser"] = CurrentAccount;

            BlogsHub blogsHub = new BlogsHub();
            pager = await blogsHub.GetListAsync(Domain.Blogs.List.BlogsList.ListType.SearchPage, pager);
            return Ok(pager);
        }

        /*
         *  获取博文详情
         *  code:   base64 编码后的博文ID
         *  return:
         *      200:    success
         *      410:    博文不存在
         */
        [HttpGet("{code}")]
        public async Task<IActionResult> GetBlogDetailAsync(string code)
        {
            (bool isSuccess, int blogId) = Blog.ParseCodeToId(code);
            if (!isSuccess) return Gone();

            var blog = await BlogsHub.GetBlogAsync(blogId);
            var detail = await blog.GetDetailAsync();
            detail.Code = code;
            if (CurrentIsLogged)
                detail.Agreed = await blog.IsAgreedAsync(CurrentAccount);
            return Ok(detail);
        }

        /*
         *  同意博文
         */
        [HttpPost("{code}/agrees"), Authorize]
        public async Task<IActionResult> IncreaseAgreeAsync(string code)
        {
            (bool isSuccess, int blogId) = Blog.ParseCodeToId(code);
            if (!isSuccess) return Gone();

            if (!CurrentIsLogged)
                return Unauthorized();
            var user = await _currentUser.GetUserAsync(CurrentAccount);

            var blog = await BlogsHub.GetBlogAsync(blogId);
            await blog.AgreeOrNotAsync(user.Id);
            return Ok();
        }

        /*
         *  评论该博文
         *  return:
         *      201:    success
         *      410:    
         */
        [HttpPost("{code}/comments"), Authorize]
        public async Task<IActionResult> CommentAsync(string code, [FromBody]string content)
        {
            (bool isSuccess, int blogId) = Blog.ParseCodeToId(code);
            if (!isSuccess)
                return Gone("该博文不存在，请刷新");
            if (!CurrentIsLogged) return Unauthorized();

            var user = await _currentUser.GetUserAsync(CurrentAccount);
            if (user == null)
                return Gone("请重新登录");

            var blog = await BlogsHub.GetBlogAsync(blogId);
            if (blog == null)
                return Gone("该博文不存在，请刷新");
            await blog.AppendCommentAsync(user.Id, content);

            return Created($"/b/{code}", null);
        }

        /*
         *  获取该博文的评论
         *  return:
         *      200:    success
         */
        [HttpGet("{code}/comments")]
        public async Task<IActionResult> GetCommentsListAsync(string code, int index, int size)
        {
            (bool isSuccess, int blogId) = Blog.ParseCodeToId(code);
            if (!isSuccess)
                return Gone("该博文不存在，请刷新");

            Domain.Paginator pager = Domain.Paginator.New(index, size);

            var blog = await BlogsHub.GetBlogAsync(blogId);
            if (blog == null) return Gone("该博文不存在，请刷新");
            pager = await blog.GetCommentsListAsync(pager);
            return Ok(pager);
        }

        /*
         *  删除博文，只有自己能删除
         *  return:
         *      200
         *      400
         *      401
         */
        [HttpDelete("{code}"), Authorize]
        public async Task<IActionResult> DeleteBlogAsync(string code)
        {
            if (!CurrentIsLogged)
                return Unauthorized("请先登录");

            (bool isSuccess, int blogId) = Blog.ParseCodeToId(code);
            if (!isSuccess)
                return Gone("该博文不存在，请刷新");

            var blog = await BlogsHub.GetBlogAsync(blogId);
            if (blog == null)
                return Gone("该博文不存在");

            var user = await _currentUser.GetUserAsync(CurrentAccount);
            if (user == null)
                return Unauthorized("请重新登录");

            if (blog.AuthorId != user.Id)
                return BadRequest("只有作者能删除这篇博文");

            BlogsHub blogsHub = new BlogsHub();
            (bool isSucc, string msg) = await blogsHub.DeleteBlog(blog);
            if (isSucc) 
                return Ok(); 
            return BadRequest(msg);
        }
    }
}
