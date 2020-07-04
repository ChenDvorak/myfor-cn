using Common;
using Microsoft.EntityFrameworkCore;

namespace DB
{
    public class MyForDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(Config.GetConnectionString("myfor-mysql"));
        }
        /// <summary>
        /// 文件
        /// </summary>
        public DbSet<Tables.File> Files { get; set; }
        /// <summary>
        /// 客户，用户
        /// </summary>
        public DbSet<Tables.User> Users { get; set; }
        /// <summary>
        /// 博文
        /// </summary>
        public DbSet<Tables.Blog> Blogs { get; set; }
        /// <summary>
        /// 评论数
        /// </summary>
        public DbSet<Tables.Comment> Comments { get; set; }
        public DbSet<Tables.AgreesRecord> AgreesRecords { get; set; }
    }
}
