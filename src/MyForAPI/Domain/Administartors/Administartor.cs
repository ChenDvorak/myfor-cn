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

        private readonly DB.Tables.Administartor _model;

        public Administartor(DB.Tables.Administartor _model)
        {
            this._model = _model;
            Id = _model.Id;
        }


        /// <summary>
        /// 获取登录后的登录信息
        /// </summary>
        /// <returns></returns>
        public Results.UserInfo GetLoginInfo() => new Results.UserInfo { UserName = _model.UserName, Email = _model.Email };

        public static Administartor Parse(DB.Tables.Administartor model)
        {
            if (model == null)
                return null;
            return new Administartor(model);
        }
    }
}
