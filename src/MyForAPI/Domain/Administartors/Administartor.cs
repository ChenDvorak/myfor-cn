using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Administartors
{
    /// <summary>
    /// 管理员
    /// </summary>
    public class Administartor: BaseEntity
    {
        /// <summary>
        /// Redis Hash Key
        /// </summary>
        public const string REDIS_HASH_KEY = nameof(Administartor);
    }
}
