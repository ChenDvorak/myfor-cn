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
    public class User: BaseEntity
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

        private DB.Tables.User _model;
        private User() { }
        public string Account => _model.Account;
        /// <summary>
        /// 获取登录信息
        /// </summary>
        /// <returns></returns>
        public async Task<Results.LoginInfo> GetLoginInfoAsync()
        {
            var result = new Results.LoginInfo
            { 
                Account = _model.Account,
                NickName = _model.Name
            };
            if (_model.Avatar == null)
            {
                string path = Files.File.SaveWebPath;
                await using var db = new DB.MyForDbContext();
                _model.Avatar = await db.Files.AsNoTracking().FirstOrDefaultAsync(file => file.Id == _model.AvatarId);
                result.Avatar = (path.EndsWith("/") ? path : path + "/") + _model.Avatar?.SaveName ?? "";
            }
            return result;
        }
        /// <summary>
        /// 将用户模型转换成用户(对象)
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        public static User Parse(DB.Tables.User userModel)
        {
            if (userModel == null) throw new NullReferenceException("转换成用户的模型不能为空");
            return new User 
            {
                Id = userModel.Id,
                _model = userModel
            };
        }
    }
}
