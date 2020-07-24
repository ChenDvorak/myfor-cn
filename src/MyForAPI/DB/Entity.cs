using System;
using System.ComponentModel.DataAnnotations;

namespace DB
{
    public abstract class Entity
    {
        [Required, Key]
        public int Id { get; set; }
        [Required]
        public int State { get; set; } = 0;
        /// <summary>
        /// 储存为 UTC 时间
        /// </summary>
        [Required]
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }

}
