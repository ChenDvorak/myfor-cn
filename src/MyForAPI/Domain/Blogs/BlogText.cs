using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Blogs
{
    class BlogText
    {
        /// <summary>
        /// 获取引用 HTML
        /// </summary>
        /// <param name="referenceId"></param>
        /// <returns></returns>
        internal static async Task<KeyValue<string, string>> GetReference(int? referenceId)
        {
            if (!referenceId.HasValue) return default;
            var blogModel = await BlogsHub.GetBlogModelAsync(referenceId.Value);
            if (blogModel == null) return default;
            return KeyValue.Create(Convert.ToBase64String(Encoding.UTF8.GetBytes(blogModel.Id.ToString())), blogModel.Title);
        }

        /// <summary>
        /// 获取见解 HTML
        /// </summary>
        /// <param name="thoughtId"></param>
        /// <returns></returns>
        internal static async Task<KeyValue<string, string>> GetThought(int? thoughtId)
        {
            if (!thoughtId.HasValue) return default;
            var blogModel = await BlogsHub.GetBlogModelAsync(thoughtId.Value);
            if (blogModel == null) return default;
            return KeyValue.Create(Convert.ToBase64String(Encoding.UTF8.GetBytes(blogModel.Id.ToString())), blogModel.Title);
        }
    }
}
