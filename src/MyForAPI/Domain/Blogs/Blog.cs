using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Blogs
{
    public class Blog : BaseEntity
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
                ThinkCount = _blog.ThoughtCount,
                ThoughtFrom = await BlogText.GetThoughtHTML(_blog.ThoughtFromId),
                ReferenceFrom = await BlogText.GetReferenceHTML(_blog.ReferencedFromId)
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
            _blog.Author = userModel ?? throw new NullReferenceException("不存在的作者");
        }

        /// <summary>
        /// 用户是否同意了这个博文
        /// </summary>
        /// <param name="userAccount"></param>
        /// <param name="blogCode"></param>
        /// <returns></returns>
        public static async Task<bool> IsUserAgreedBlogAsync(string userAccount, string blogCode)
        {
            (bool isSuccess, int blogId) = ParseCodeToId(blogCode);
            if (!isSuccess) return false;
            var blog = await BlogsHub.GetBlogAsync(blogId);
            return await blog.IsAgreedAsync(userAccount);
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
            
            var user = await Users.UsersHub.GetUserAsync(account);
            if (user == null) throw new NullReferenceException($"账号 {account} 不存在");
            await using var db = new MyForDbContext();
            bool isAgreed = await db.AgreesRecords.AsNoTracking().AnyAsync(r => r.AgreerId == user.Id && r.AccepterId == Id);
            await r.StringSetAsync(key, isAgreed);
            return isAgreed;
        }
        /// <summary>
        /// 获取要缓存的 KEY
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        private string GetIsAgreedCacheKey(string account)
        {
            return $"{REDIS_HASH_KEY}-{Id}-argeed-{account}";
        }

        /// <summary>
        /// 评论  
        /// </summary>
        /// <param name="content"></param>
        /// <returns>(bool: 是否成功, string: 失败原因)</returns>
        public async Task AppendCommentAsync(int commenterId, string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                throw new ArgumentNullException("评论内容不能位空");

            var comment = new Comments.Models.NewComment
            {
                CommenterId = commenterId,
                BlogId = Id,
                Content = content
            };

            Comments.CommentsHub commentsHub = new Comments.CommentsHub();
            await commentsHub.AddCommentAsync(comment);
            await IncreaseCommentCountAsync();
        }

        /// <summary>
        /// 评论数 + 1
        /// </summary>
        /// <returns></returns>
        internal async Task IncreaseCommentCountAsync()
        {
            var cacheBlog = await BlogsHub.GetBlogModelAsync(Id);
            if (cacheBlog != null)
            {
                cacheBlog.CommentCount++;
                await BlogsHub.SaveCacheBlogAsync(cacheBlog);
            }

            _blog.CommentCount++;
            await using var db = new MyForDbContext();
            db.Update(_blog);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// 被引用数 + 1
        /// </summary>
        /// <returns></returns>
        internal async Task IncreaseReferenceCountAsync()
        {
            var cacheBlog = await BlogsHub.GetBlogModelAsync(Id);
            if (cacheBlog != null)
            {
                cacheBlog.ReferencedCount++;
                await BlogsHub.SaveCacheBlogAsync(cacheBlog);
            }

            _blog.ReferencedCount++;
            await using var db = new MyForDbContext();
            db.Update(_blog);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// 被见解数 + 1
        /// </summary>
        /// <returns></returns>
        internal async Task IncreaseThoughtCountAsync()
        {
            var cacheBlog = await BlogsHub.GetBlogModelAsync(Id);
            if (cacheBlog != null)
            {
                cacheBlog.ThoughtCount++;
                await BlogsHub.SaveCacheBlogAsync(cacheBlog);
            }

            _blog.ThoughtCount++;
            await using var db = new MyForDbContext();
            db.Update(_blog);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// 同意或取消同意
        /// </summary>
        public async Task AgreeOrNotAsync(int agreerId)
        {
            if (_blog == null) throw new NullReferenceException("该博文不存在");

            await using var db = new MyForDbContext();
            var record = await db.AgreesRecords.AsNoTracking().Where(r => r.AgreerId == agreerId && r.AccepterId == Id).FirstOrDefaultAsync();
            if (record == null)
            {
                //  同意
                record = new DB.Tables.AgreesRecord
                {
                    AgreerId = agreerId,
                    AccepterId = Id
                };
                await db.AgreesRecords.AddAsync(record);
                _blog.AgreedCount++;
                db.Blogs.Update(_blog);
                int changeCount = await db.SaveChangesAsync();
                if (changeCount != 2) throw new Exception("同意失败");
            }
            else
            {
                //  取消同意
                db.AgreesRecords.Remove(record);
                if (_blog.AgreedCount > 0)
                    _blog.AgreedCount--;
                db.Blogs.Update(_blog);
                int changeCount = await db.SaveChangesAsync();
                if (changeCount != 2) throw new Exception("取消同意失败");
            }

            await BlogsHub.SaveCacheBlogAsync(_blog);
        }

        /// <summary>
        /// 获取评论列表
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        public async Task<Paginator> GetCommentsListAsync(Paginator pager)
        {
            Comments.CommentsHub commentsHub = new Comments.CommentsHub();
            return await commentsHub.GetCommentsListAsync(Id, pager);
        }

        /// <summary>
        /// 解码博文编号为 ID
        /// </summary>
        /// <param name="blogCode"></param>
        /// <returns></returns>
        public static (bool, int) ParseCodeToId(string blogCode)
        {
            string debasedCode = Encoding.UTF8.GetString(Convert.FromBase64String(blogCode));
            return (int.TryParse(debasedCode, out int blogId), blogId);

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
