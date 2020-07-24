using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tables.File>().Property(e => e.CreateDate).HasConversion(v => v.ToUniversalTime(), v => v.ToLocalTime());
            modelBuilder.Entity<Tables.User>().Property(e => e.CreateDate).HasConversion(v => v.ToUniversalTime(), v => v.ToLocalTime());
            modelBuilder.Entity<Tables.Blog>().Property(e => e.CreateDate).HasConversion(v => v.ToUniversalTime(), v => v.ToLocalTime());
            modelBuilder.Entity<Tables.Comment>().Property(e => e.CreateDate).HasConversion(v => v.ToUniversalTime(), v => v.ToLocalTime());
            modelBuilder.Entity<Tables.AgreesRecord>().Property(e => e.CreateDate).HasConversion(v => v.ToUniversalTime(), v => v.ToLocalTime());
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
