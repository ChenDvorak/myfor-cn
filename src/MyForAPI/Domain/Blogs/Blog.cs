using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Blogs
{
    public class Blog: BaseEntity
    {
        public enum BlogState
        {
            Enabled = 0
        }

        /// <summary>
        /// Redis Hash Key
        /// </summary>
        public const string REDIS_HASH_KEY = nameof(Blog);
        /// <summary>
        /// 标题最长长度
        /// </summary>
        public static readonly int Title_Max_length = Common.Config.GetValue<int>("Blog:TitleMaxLength");
        /// <summary>
        /// 内容最长长度
        /// </summary>
        public static readonly int Content_Max_length = Common.Config.GetValue<int>("Blog:ContentMaxLength");

        private Blog() { }

        private DB.Tables.Blog _blog;

        /// <summary>
        /// 获取详情
        /// </summary>
        /// <returns></returns>
        public async Task<Results.BlogDetail> GetDetailAsync()
        {
            if (_blog == null) throw new NullReferenceException();
            await GetFullModelAsync();

            var detail = new Results.BlogDetail
            { 
                AuthorName = _blog.Author.Name,
                AuthorAccount = _blog.Author.Account,
                Avatar = Files.File.GetVisitablePath(_blog.Author.Avatar.SaveName, "api"),
                Title = _blog.Title,
                PostedTime = _blog.CreateDate.ToString("yyyy-MM-dd HH:mm"),
                Content = _blog.Content,
                CommentCount = _blog.CommentCount,
                AgreeCount = _blog.AgreedCount,
                ReferenceCount = _blog.ReferencedCount,
                ThinkCount = _blog.ThoughtCount
            };
            return detail;
        }
        private async Task GetFullModelAsync()
        {
            if (_blog.Author != null) return;
            await using var db = new MyForDbContext();
            var userModel = await db.Users.AsNoTracking()
                                          .Include(user => user.Avatar)
                                          .FirstOrDefaultAsync(user => user.Id == _blog.AuthorId);
            if (userModel == null) throw new NullReferenceException("不存在的作者");
            _blog.Author = userModel;
        }

        /// <summary>
        /// 查询指定账号用户是否在这个博文下点了同意
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<bool> IsAgreedAsync(string account)
        {
            string key = GetIsAgreedCacheKey(account);
            var r = RedisCache.GetRedis();
            var value = await r.StringGetAsync(key);
            if (value.HasValue && bool.TryParse(value, out bool isArgeed))
                return isArgeed;
            Users.UsersHub usersHub = new Users.UsersHub();
            var user = await usersHub.GetUserAsync(account);
            if (user == null) throw new NullReferenceException($"账号 {account} 不存在");
            await using var db = new MyForDbContext();
            bool isAgreed = await db.AgreesRecords.AsNoTracking().AnyAsync(r => r.AgreerId == user.Id && r.AccepterId == Id);
            await r.StringSetAsync(key, isAgreed);
            return isAgreed;
        }
        private string GetIsAgreedCacheKey(string account)
        {
            return $"{REDIS_HASH_KEY}-{Id}-argeed-{account}";
        }

        public static Blog Parse(DB.Tables.Blog blogModel)
        {
            if (blogModel == null)
                return null;
            var blog = new Blog
            { 
                Id = blogModel.Id
            };
            blog._blog = blogModel;
            return blog;
        }
    }
}
