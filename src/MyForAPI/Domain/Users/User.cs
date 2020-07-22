using DB;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    /// <summary>
    /// 用户（客户）
    /// </summary>
    public class User : BaseEntity
    {
        /// <summary>
        /// Redis Hash Key
        /// </summary>
        public const string REDIS_HASH_KEY = nameof(User);
        /// <summary>
        /// 账号最长长度
        /// </summary>
        public static readonly int Account_Max_length = Common.Config.GetValue<int>("User:AccountMaxLength");
        /// <summary>
        /// 账号最短长度
        /// </summary>
        public static readonly int Account_Min_length = Common.Config.GetValue<int>("User:AccountMinLength");
        /// <summary>
        /// 密码最长长度
        /// </summary>
        public static readonly int Password_Max_length = Common.Config.GetValue<int>("User:PasswordMaxLength");
        /// <summary>
        /// 密码最短长度
        /// </summary>
        public static readonly int Password_Min_length = Common.Config.GetValue<int>("User:PasswordMinLength");

        private DB.Tables.User _userModel;
        private User() { }
        public string Account => _userModel.Account;
        /// <summary>
        /// 获取登录信息
        /// </summary>
        /// <returns></returns>
        public async Task<Results.LoginInfo> GetLoginInfoAsync()
        {
            var result = new Results.LoginInfo
            {
                Account = _userModel.Account,
                NickName = _userModel.Name
            };
            if (_userModel.Avatar == null)
            {
                string path = Files.File.SaveWebPath;
                await using var db = new DB.MyForDbContext();
                _userModel.Avatar = await db.Files.AsNoTracking().FirstOrDefaultAsync(file => file.Id == _userModel.AvatarId);
                result.Avatar = Files.File.GetVisitablePath(_userModel.Avatar?.SaveName);
            }
            return result;
        }

        /// <summary>
        /// 获取用户详情
        /// </summary>
        /// <returns></returns>
        public async Task<Results.UserDetail> GetUserDetailAsync()
        {
            await using var db = new MyForDbContext();
            var avatar = await db.Files.AsNoTracking().FirstOrDefaultAsync(file => file.Id == _userModel.AvatarId);
            var detail = new Results.UserDetail
            {
                Account = _userModel.Account,
                Name = _userModel.Name,
                Introdution = _userModel.Introduction,
                CreateDate = _userModel.CreateDate.ToString("yyyy-MM-dd"),
                Avatar = Files.File.GetVisitablePath(avatar.SaveName, "api")
            };
            return detail;
        }

        /// <summary>
        /// 获取用户发表的评论
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        public async Task<Paginator> GetCommentsLisnAsync(Paginator pager)
        {
            var commentsHub = new Comments.CommentsHub();
            pager = await commentsHub.GetCommentsListAsync(pager, Comments.List.CommentsList.ListType.UserSelf);
            return pager;
        }

        /// <summary>
        /// 将用户模型转换成用户(对象)
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        public static User Parse(DB.Tables.User userModel)
        {
            return userModel == null ? null : new User
            {
                Id = userModel.Id,
                _userModel = userModel
            };
        }

        /// <summary>
        /// 发布新博文
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<(bool, string)> PostBlogAsync(Blogs.Models.NewBlog model)
        {
            model.AuthorAccount = Account;
            Blogs.BlogsHub blogsHub = new Blogs.BlogsHub();
            return await blogsHub.PostBlogAsync(model);
        }
    }
}
