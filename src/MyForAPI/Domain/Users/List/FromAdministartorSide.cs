using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Users.List
{
    internal class FromAdministartorSide : IUserList
    {
        public async Task<Paginator> GetListAsync(Paginator pager)
        {
            string account = pager["account"] ?? "";

            Expression<Func<DB.Tables.User, bool>> whereStatement = u => true;
            if (!string.IsNullOrWhiteSpace(account))
                whereStatement = whereStatement.And(u => u.Account.Contains(account));

            await using var db = new MyForDbContext();
            pager.TotalSize = await db.Users.CountAsync(whereStatement);
            pager.List = await db.Users.AsNoTracking()
                                       .OrderByDescending(u => u.CreateDate)
                                       .Where(whereStatement)
                                       .Include(u => u.Avatar)
                                       .Select(u => new Results.UserItem_AdministartorSide
                                       {
                                           Id = u.Id,
                                           Account = u.Account,
                                           Name = u.Name,
                                           Avatar = Files.File.GetVisitablePath(u.Avatar.SaveName, "api"),
                                           CreateDate = u.CreateDate.ToString("yyyy-MM-dd")
                                       })
                                       .ToListAsync();

            return pager;
        }
    }
}
