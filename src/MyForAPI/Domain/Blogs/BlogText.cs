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
        internal static async Task<string> GetReferenceHTML(int? referenceId)
        {
            if (!referenceId.HasValue) return "";
            var blogModel = await BlogsHub.GetBlogModelAsync(referenceId.Value);
            if (blogModel == null) return "";
            StringBuilder html = new StringBuilder(50);
            html.Append("引用<a target='_blank' href='/b/");
            html.Append(
                System.Web.HttpUtility.UrlEncode(Convert.ToBase64String(Encoding.UTF8.GetBytes(blogModel.Id.ToString())))
            );
            html.Append("'>@");
            html.Append(blogModel.Title);
            html.Append("</a><br>");
            return html.ToString();
        }

        /// <summary>
        /// 获取见解 HTML
        /// </summary>
        /// <param name="thoughtId"></param>
        /// <returns></returns>
        internal static async Task<string> GetThoughtHTML(int? thoughtId)
        {
            if (!thoughtId.HasValue) return "";
            var blogModel = await BlogsHub.GetBlogModelAsync(thoughtId.Value);
            if (blogModel == null) return "";
            StringBuilder html = new StringBuilder(50);
            html.Append("对<a target='_blank' href='/b/");
            html.Append(
                System.Web.HttpUtility.UrlEncode(Convert.ToBase64String(Encoding.UTF8.GetBytes(blogModel.Id.ToString())))
            );
            html.Append("'>《");
            html.Append(blogModel.Title);
            html.Append("》</a>的见解<br>");
            return html.ToString();
        }
    }
}
