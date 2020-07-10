using System.Threading.Tasks;

namespace Domain.Blogs.List
{
    /// <summary>
    /// 博文列表抽象类
    /// </summary>
    abstract class BlogsList: IListable
    {
        /// <summary>
        /// 列表内容显示的长度限制
        /// </summary>
        protected const int BLOG_LIST_CONTENT_LENGTH = 50;

        public abstract Task<Paginator> GetListAsync(Paginator pager);
    }
}
