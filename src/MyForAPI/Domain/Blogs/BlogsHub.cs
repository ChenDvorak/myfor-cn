using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Blogs
{
    /// <summary>
    /// 博文仓库
    /// </summary>
    public class BlogsHub
    {
        /// <summary>
        /// 列表类型
        /// </summary>
        [Flags]
        public enum ListType
        {
            HomePage = 0
        }

        /// <summary>
        /// 发布新博文
        /// </summary>
        /// <param name="model"></param>
        /// <returns>(是否成功，失败原因，成功则返回 ID)</returns>
        public async Task<(bool, string)> PostBlogAsync(Models.NewBlog model)
        {
            Users.UsersHub usersHub = new Users.UsersHub();
            var user = await usersHub.GetUserAsync(model.AuthorAccount);
            if (user == null)
                return (false, "该用户不存在");

            if (string.IsNullOrWhiteSpace(model.Title) || model.Title.Length > Blog.Title_Max_length)
                return (false, $"标题不能为空，且限制在{Blog.Title_Max_length}字以内");
            if (string.IsNullOrWhiteSpace(model.Content) || model.Content.Length > Blog.Content_Max_length)
                return (false, $"内容不能为空，且限制在{Blog.Content_Max_length}字以内");

            await using var db = new DB.MyForDbContext();
            DB.Tables.Blog newBlog = new DB.Tables.Blog
            { 
                AuthorId = user.Id,
                Title = model.Title,
                Content = model.Content
            };
            await db.Blogs.AddAsync(newBlog);
            if (await db.SaveChangesAsync() == 1)
                return (true, newBlog.Id.ToString());
            throw new Exception("发布博文失败");
        }


    }
}
