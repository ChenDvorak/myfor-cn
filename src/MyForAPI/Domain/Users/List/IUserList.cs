using System.Threading.Tasks;

namespace Domain.Users.List
{
    internal interface IUserList
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        Task<Paginator> GetListAsync(Paginator pager);
    }
}
