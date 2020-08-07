using System.Threading.Tasks;

namespace Domain.Users
{
    /// <summary>
    /// 用户，用作 DI
    /// </summary>
    public interface IUser
    {
        /// <summary>
        /// 获取用户
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<User> GetUserAsync(string account)
        {
            return await UsersHub.GetUserAsync(account);
        }
    }
}
