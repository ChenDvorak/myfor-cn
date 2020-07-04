/*
 *  用户仓库， 用户即是客户
 */

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Newtonsoft.Json;

namespace Domain.Users
{
    /// <summary>
    /// 用户仓库
    /// </summary>
    public class UsersHub
    {
        /// <summary>
        /// 注册
        /// </summary>
        /// <returns>注册后的用户, 注册失败的说明信息</returns>
        public async Task<(User, string)> SignUpAsync(Models.SignUp model)
        {
            if (string.IsNullOrWhiteSpace(model.Account) || model.Account.Length < User.Account_Min_length || model.Account.Length > User.Account_Max_length)
                return (null, $"注册账号长度不能小于{User.Account_Min_length}");
            if (string.IsNullOrWhiteSpace(model.Password) || model.Password.Length < User.Password_Min_length || model.Account.Length > User.Password_Max_length)
                return (null, $"密码长度不能小于{User.Password_Min_length}");
            if (!model.Password.Equals(model.ConfirmPassword)) return (null, "两次密码不一致");

            var userModel = await GetUserModel(model.Account);
            if (userModel != null)
                return (null, "该账号已被使用");
            await using DB.MyForDbContext db = new DB.MyForDbContext();
            if (await db.Users.AsNoTracking().AnyAsync(user => user.Email.Equals(model.Email, StringComparison.OrdinalIgnoreCase)))
                return (null, "该邮箱已被使用");

            userModel = new DB.Tables.User
            { 
                Account = model.Account,
                Password = model.Password,
                Name = model.Account
            };
            await db.Users.AddAsync(userModel);
            if (await db.SaveChangesAsync() == 1)
                return (User.Parse(userModel), null);
            throw new Exception("注册失败");
        }

        /// <summary>
        /// 根据账号获取用户
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<User> GetUser(string account)
        {
            var userModel = await GetUserModel(account);
            return User.Parse(userModel);
        }

        /// <summary>
        /// 根据账号获取用户模型
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        private async Task<DB.Tables.User> GetUserModel(string account)
        {
            var value = RedisCache.GetRedis().HashGet(User.REDIS_HASH_KEY, account);
            if (value.HasValue)
                return JsonConvert.DeserializeObject<DB.Tables.User>(value);

            await using DB.MyForDbContext db = new DB.MyForDbContext();
            var userModel = await db.Users.AsNoTracking()
                                          .FirstOrDefaultAsync(user => user.Account.Equals(account, StringComparison.OrdinalIgnoreCase));
            return userModel;
        }
    }
}
