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
        private DateTime _createDate = DateTime.UtcNow;
        /// <summary>
        /// 会自动转为 UTC 时间
        /// </summary>
        [Required]
        public DateTime CreateDate
        {
            get
            {
                return _createDate;
            }
            set
            {
                _createDate = value.ToUniversalTime();
            }
        }
    }

}
