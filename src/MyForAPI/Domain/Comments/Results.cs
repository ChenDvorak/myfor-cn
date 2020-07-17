using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Comments
{
    public class Results
    {
        public class CommentItem
        {
            public int Id { get; set; }
            public string AuthorName { get; set; }
            public string AuthorAccount { get; set; }
            public string Avatar { get; set; }
            public string DateTime { get; set; }
            public string Content { get; set; }
            public int AgreeCount { get; set; }
        }
    }
}
