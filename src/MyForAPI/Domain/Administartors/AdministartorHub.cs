using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
        public async Task<Administartor> LoginAsync(Models.Login model)
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

            return Administartor.Parse(adminModel);
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task LogoutAsync(int administartorId)
        {
            await AdministartorCache.RemoveAdministartorModelAsync(administartorId);
        }
        
        /// <summary>
        /// 创建一个管理员
        /// </summary>
        /// <param name="newAdministartor"></param>
        /// <returns></returns>
        public async Task<(bool, string)> CreateAsync(Models.NewAdministarnor newAdministartor)
        {
            if (string.IsNullOrWhiteSpace(newAdministartor.Account)) return (false, "账号不能为空");
            if (string.IsNullOrWhiteSpace(newAdministartor.Password)) return (false, "密码不能为空");
            if (string.IsNullOrWhiteSpace(newAdministartor.Email)) return (false, "邮箱不能为空");

            await using var db = new MyForDbContext();
            if (await db.Administartors.AnyAsync(a => a.UserName.Equals(newAdministartor.Account, StringComparison.OrdinalIgnoreCase)))
                return (false, $"账号{newAdministartor.Account}已被使用");

            DB.Tables.Administartor newModel = new DB.Tables.Administartor
            { 
                AvatarId = 1,
                UserName = newAdministartor.Account,
                Password = newAdministartor.Password,
                Email = newAdministartor.Email
            };
            await db.Administartors.AddAsync(newModel);
            int changeCount = await db.SaveChangesAsync();
            if (changeCount != 1) throw new Exception("创建失败");
            return (true, "");
        }

        /// <summary>
        /// 获取管理员列表
        /// </summary>
        public async Task<Paginator> GetListAsync(Paginator pager)
        {
            string account = pager["account"] ?? "";

            Expression<Func<DB.Tables.Administartor, bool>> whereStatement = u => true;
            if (!string.IsNullOrWhiteSpace(account))
                whereStatement = whereStatement.And(u => u.UserName.Contains(account));

            await using var db = new MyForDbContext();

            pager.TotalSize = await db.Administartors.CountAsync(whereStatement);
            pager.List = await db.Administartors.AsNoTracking()
                                       .OrderByDescending(u => u.CreateDate)
                                       .Where(whereStatement)
                                       .Include(u => u.Avatar)
                                       .Select(u => new Results.UserItem
                                       {
                                           Id = u.Id,
                                           Account = u.UserName,
                                           Email = u.Email,
                                           Avatar = Files.File.GetVisitablePath(u.Avatar.SaveName, "api"),
                                           CreateDate = u.CreateDate.ToString("yyyy-MM-dd")
                                       })
                                       .ToListAsync();
            return pager;
        }
    }
}
