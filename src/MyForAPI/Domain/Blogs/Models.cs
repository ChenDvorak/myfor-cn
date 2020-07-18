using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Blogs
{
    public class Models
    {
        public class NewBlog
        {
            public string AuthorAccount { get; set; }
            public string Title { get; set; } = "";
            public string Content { get; set; } = "";
            public string ReferenceFrom { get; set; } = "";
            public string ThoughtFrom { get; set; } = "";
        }
    }
}
