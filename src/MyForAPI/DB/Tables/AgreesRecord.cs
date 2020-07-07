using System;
using System.Collections.Generic;
using System.Text;

namespace DB.Tables
{
    /// <summary>
    /// 赞同记录
    /// </summary>
    public class AgreesRecord: Entity
    {
        /// <summary>
        /// 同意方
        /// </summary>
        public int AgreerId { get; set; }
        /// <summary>
        /// 被同意方
        /// </summary>
        public int AccepterId { get; set; }
    }
}
