using System;
using System.Collections.Generic;
using System.Text;
using DB;

namespace Domain.Blogs
{
    public class Blog: BaseEntity
    {
        /// <summary>
        /// Redis Hash Key
        /// </summary>
        public const string REDIS_HASH_KEY = nameof(Blog);
        /// <summary>
        /// 标题最长长度
        /// </summary>
        public static readonly int Title_Max_length = Common.Config.GetValue<int>("Blog:TitleMaxLength");
        /// <summary>
        /// 内容最长长度
        /// </summary>
        public static readonly int Content_Max_length = Common.Config.GetValue<int>("Blog:ContentMaxLength");

        private Blog() { }

        private DB.Tables.Blog _blog;

        public static Blog Parse(DB.Tables.Blog blogModel)
        {
            var blog = new Blog
            { 
                Id = blogModel.Id
            };
            blog._blog = blogModel;
            return blog;
        }
    }
}
