using System.Collections.Generic;

namespace Domain.Blogs
{
    public class Results
    {
        public class BlogItem
        {
            public string Code { get; set; } = "";
            public string AuthorName { get; set; } = "";
            public string AuthorAccount { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string Title { get; set; } = "";
            public string PostedTime { get; set; } = "";
            public KeyValue<string, string> ThoughtFrom { get; set; }
            public KeyValue<string, string> ReferenceFrom { get; set; }
            public string Content { get; set; } = "";
            public bool IsFull { get; set; } = false;
            public int CommentCount { get; set; } = 0;
            public int AgreeCount { get; set; } = 0;
            public int ReferenceCount { get; set; } = 0;
            public int ThinkCount { get; set; } = 0;
            public bool Agreed { get; set; } = false;
        }

        public class BlogDetail
        {
            public string Code { get; set; } = "";
            public string AuthorName { get; set; } = "";
            public string AuthorAccount { get; set; } = "";
            public string Avatar { get; set; } = "";
            public string Title { get; set; } = "";
            public string PostedTime { get; set; } = "";
            public KeyValue<string, string> ThoughtFrom { get; set; }
            public KeyValue<string, string> ReferenceFrom { get; set; }
            public string Content { get; set; } = "";
            public int CommentCount { get; set; } = 0;
            public int AgreeCount { get; set; } = 0;
            public bool Agreed { get; set; } = false;
            public int ReferenceCount { get; set; } = 0;
            public int ThinkCount { get; set; } = 0;
        }
    }
}
