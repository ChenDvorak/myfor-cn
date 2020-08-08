using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Blogs.List
{
    /// <summary>
    /// 博文列表抽象类
    /// </summary>
    public abstract class BlogsList: IListable
    {
        /// <summary>
        /// 列表类型
        /// </summary>
        [Flags]
        public enum ListType
        {
            HomePage,
            SearchPage,
            UserSelf,
            AdministartorSide
        }

        /// <summary>
        /// 列表内容显示的长度限制
        /// </summary>
        protected const int BLOG_LIST_CONTENT_LENGTH = 50;
        /// <summary>
        /// 当列表的博文内容太长，会截断一部分，然后拼接上这个省略字符
        /// </summary>
        protected const string BLOG_LIST_CONTENT_OVERFLOW_CHARS = "...";

        public abstract Task<Paginator> GetListAsync(Paginator pager);

        /// <summary>
        /// 原始查询字符串
        /// </summary>
        /// <param name="contentMaxLength"></param>
        /// <returns></returns>
        protected string BlogsQueryString => $@"SELECT 
Id,State,CreateDate,Title,
IF(CHAR_LENGTH(Content) > {BLOG_LIST_CONTENT_LENGTH}, concat(left(content, {BLOG_LIST_CONTENT_LENGTH}), '{BLOG_LIST_CONTENT_OVERFLOW_CHARS}'), Content) as Content,
AuthorId,AgreedCount,CommentCount,ReferencedFromId,ReferencedCount,ThoughtFromId,ThoughtCount 
FROM 
Blogs
";

        /// <summary>
        /// 将模型转换为博文列表
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        protected async Task<List<Results.BlogItem>> ConvertToBlogsList(IList<DB.Tables.Blog> models)
        {
            List<Results.BlogItem> list = new List<Results.BlogItem>(models.Count);

            foreach (var blog in models)
            {
                list.Add(new Results.BlogItem
                {
                    Code = Convert.ToBase64String(Encoding.UTF8.GetBytes(blog.Id.ToString())),
                    AuthorName = blog.Author.Name,
                    AuthorAccount = blog.Author.Account,
                    Avatar = Files.File.GetVisitablePath(blog.Author.Avatar.SaveName, "api"),
                    Title = blog.Title,
                    PostedTime = blog.CreateDate.ToLocalTime().ToString("yyyy-MM-dd"),
                    Content = blog.Content,
                    IsFull = !blog.Content.EndsWith(BLOG_LIST_CONTENT_OVERFLOW_CHARS),
                    CommentCount = blog.CommentCount,
                    AgreeCount = blog.AgreedCount,
                    ReferenceCount = blog.ReferencedCount,
                    ThinkCount = blog.ThoughtCount,
                    ThoughtFrom = await BlogText.GetThought(blog.ThoughtFromId),
                    ReferenceFrom = await BlogText.GetReference(blog.ReferencedFromId)
                });
            }
            return list;
        }

        protected async Task<List<Results.BlogItem>> CurrentUserIsAgreedAsync(List<Results.BlogItem> list, string currentUserAccount)
        {
            if (string.IsNullOrWhiteSpace(currentUserAccount))
                return list;
            foreach (var blog in list)
            {
                blog.Agreed = await Blog.IsUserAgreedBlogAsync(currentUserAccount, blog.Code);
            }
            return list;
        }
    }
}
