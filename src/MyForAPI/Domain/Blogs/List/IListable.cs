using System.Threading.Tasks;

namespace Domain.Blogs.List
{
    interface IListable
    {
        Task<Paginator> GetListAsync(Paginator pager);
    }
}
