using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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

        /// <summary>
        /// 获取博文列表
        /// </summary>
        /// <param name="type">列表类型</param>
        /// <param name="pager">分页参数</param>
        /// <returns></returns>
        public async Task<Paginator> GetListAsync(List.BlogsList.ListType type, Paginator pager)
        {
            List.IListable list = type switch
            {
                List.BlogsList.ListType.HomePage => new List.HomePageList(),
                List.BlogsList.ListType.SearchPage => new List.SearchList(),
                _ => throw new ArgumentException()
            };
            return await list.GetListAsync(pager);
        }

        /// <summary>
        /// 获取一个博文
        /// </summary>
        /// <param name="blogId"></param>
        /// <returns></returns>
        public async Task<Blog> GetBlogAsync(int blogId)
        {
            var model = await GetBlogModelAsync(blogId);
            return Blog.Parse(model);
        }

        /// <summary>
        /// 根据账号获取博文模型
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        private async Task<DB.Tables.Blog> GetBlogModelAsync(int blogId)
        {
            var value = await RedisCache.GetRedis().HashGetAsync(Blog.REDIS_HASH_KEY, blogId);
            if (value.HasValue)
                return JsonConvert.DeserializeObject<DB.Tables.Blog>(value);

            await using DB.MyForDbContext db = new DB.MyForDbContext();
            var blogModel = await db.Blogs.AsNoTracking()
                                          .Include(blog => blog.Author)
                                            .ThenInclude(author => author.Avatar)
                                          .FirstOrDefaultAsync(blog => blog.Id == blogId);
            if (blogModel != null)
                await RedisCache.GetRedis().HashSetAsync(Blog.REDIS_HASH_KEY, blogId, JsonConvert.SerializeObject(blogModel));
            return blogModel;
        }
    }
}
