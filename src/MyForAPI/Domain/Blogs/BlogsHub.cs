using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
            var user = await Users.UsersHub.GetUserAsync(model.AuthorAccount);
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

            if (!string.IsNullOrWhiteSpace(model.ReferenceFrom))
            {
                if (TryGetIdFromBase64String(model.ReferenceFrom, out int fromId))
                    newBlog.ReferencedFromId = fromId;
                await IncreaseReferenceAsync(fromId);
            }
            if (!string.IsNullOrWhiteSpace(model.ThoughtFrom))
            {
                if (TryGetIdFromBase64String(model.ThoughtFrom, out int fromId))
                    newBlog.ThoughtFromId = fromId;
                await IncreaseThoughtAsync(fromId);
            }

            await db.Blogs.AddAsync(newBlog);
            if (await db.SaveChangesAsync() == 1)
            {
                return (true, newBlog.Id.ToString());
            }
            throw new Exception("发布博文失败");
        }
        private bool TryGetIdFromBase64String(string base64String, out int id)
        {
            string idStr = Encoding.UTF8.GetString(Convert.FromBase64String(base64String));
            return int.TryParse(idStr, out id);
        }

        /// <summary>
        /// 被引用数 + 1
        /// </summary>
        /// <param name="blogId"></param>
        /// <returns></returns>
        private async Task IncreaseReferenceAsync(int blogId)
        {
            var blog = await GetBlogAsync(blogId);
            if (blog == null) throw new NullReferenceException("博文不存在");
            await blog.IncreaseReferenceCountAsync();
        }
        /// <summary>
        /// 被见解数 + 1
        /// </summary>
        /// <param name="blogId"></param>
        /// <returns></returns>
        private async Task IncreaseThoughtAsync(int blogId)
        {
            var blog = await GetBlogAsync(blogId);
            if (blog == null) throw new NullReferenceException("博文不存在");
            await blog.IncreaseThoughtCountAsync();
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
        public static async Task<Blog> GetBlogAsync(int blogId)
        {
            var model = await GetBlogModelAsync(blogId);
            return Blog.Parse(model);
        }

        /// <summary>
        /// 获取博文模型，存缓存
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        internal static async Task<DB.Tables.Blog> GetBlogModelAsync(int blogId)
        {
            var value = await RedisCache.GetRedis().HashGetAsync(Blog.REDIS_HASH_KEY, blogId);
            if (value.HasValue)
                return JsonConvert.DeserializeObject<DB.Tables.Blog>(value);

            await using DB.MyForDbContext db = new DB.MyForDbContext();
            var blogModel = await db.Blogs.AsNoTracking()
                                          .FirstOrDefaultAsync(blog => blog.Id == blogId);
            await SaveCacheBlogAsync(blogModel);
            return blogModel;
        }
        /// <summary>
        /// 博文模型存进缓存
        /// </summary>
        /// <param name="blogModel"></param>
        /// <returns></returns>
        internal static async Task SaveCacheBlogAsync(DB.Tables.Blog blogModel)
        {
            if (blogModel == null) return;
            string saveValue = JsonConvert.SerializeObject(blogModel);
            await RedisCache.GetRedis().HashSetAsync(Blog.REDIS_HASH_KEY, blogModel.Id, saveValue);
        }
    }
}
