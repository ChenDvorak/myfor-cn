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
            SearchPage
        }

        /// <summary>
        /// 列表内容显示的长度限制
        /// </summary>
        protected const int BLOG_LIST_CONTENT_LENGTH = 50;

        public abstract Task<Paginator> GetListAsync(Paginator pager);

        /// <summary>
        /// 原始查询字符串
        /// </summary>
        /// <param name="contentMaxLength"></param>
        /// <returns></returns>
        protected string GetBlogsQueryString => $@"SELECT 
Id,State,CreateDate,Title,
IF(CHAR_LENGTH(Content) > {BLOG_LIST_CONTENT_LENGTH}, concat(left(content, {BLOG_LIST_CONTENT_LENGTH}), '...'), Content) as Content,
AuthorId,AgreedCount,CommentCount,ReferencedFromId,ReferencedCount,ThoughtFromId,ThoughtCount 
FROM 
Blogs;
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
                    PostedTime = blog.CreateDate.ToString("yyyy-MM-dd"),
                    Content = blog.Content,
                    IsFull = blog.Content.EndsWith("..."),
                    CommentCount = blog.CommentCount,
                    AgreeCount = blog.AgreedCount,
                    ReferenceCount = blog.ReferencedCount,
                    ThinkCount = blog.ThoughtCount,
                    ThoughtFrom = await BlogText.GetThoughtHTML(blog.ThoughtFromId),
                    ReferenceFrom = await BlogText.GetReferenceHTML(blog.ReferencedFromId)
                });
            }
            return list;
        }
    }
}
