using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Administartors
{
    /// <summary>
    /// 管理员仓库
    /// </summary>
    public class AdministartorHub
    {
        /// <summary>
        /// 管理员登录
        /// </summary>
        public async Task<Results.UserInfo> LoginAsync(Models.Login model)
        {
            if (string.IsNullOrWhiteSpace(model.Account))
                throw new ArgumentException("账号不能为空");
            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ArgumentException("密码不能为空");

            await using var db = new MyForDbContext();
            var adminModel = await db.Administartors.AsNoTracking()
                                                  .SingleOrDefaultAsync(a =>
                                                    a.UserName.Equals(model.Account, StringComparison.OrdinalIgnoreCase) &&
                                                    a.Password.Equals(model.Password, StringComparison.OrdinalIgnoreCase));
            if (adminModel is null)
                return null;

            await AdministartorCache.SetAdministartorModelCacheAsync(adminModel);

            return new Results.UserInfo
            { 
                UserName = adminModel.UserName,
                Email = adminModel.Email
            };
        }

        
    }
}
