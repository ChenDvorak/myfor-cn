using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Blogs.List
{
    internal class HomePageList : IListable
    {
        public Task<Paginator> GetListAsync(Paginator pager)
        {
            throw new NotImplementedException();
        }
    }
}
