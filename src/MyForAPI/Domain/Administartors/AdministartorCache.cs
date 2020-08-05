using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft;
using Common;
using System.Threading.Tasks;
using Newtonsoft.Json;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Domain.Administartors
{
    /// <summary>
    /// 缓存用    
    /// /// </summary>
    internal class AdministartorCache
    {
        /// <summary>
        /// 放入缓存
        /// </summary>
        /// <param name="administartorModel"></param>
        internal static async Task SetAdministartorModelCacheAsync(DB.Tables.Administartor administartorModel)
        {
            var r = RedisCache.GetRedis();
            if (r == null)
            {
                await r.HashDeleteAsync(Administartor.REDIS_HASH_KEY, administartorModel.Id);
                return;
            }

            var saveContent = JsonConvert.SerializeObject(administartorModel);
            await r.HashSetAsync(Administartor.REDIS_HASH_KEY, administartorModel.Id, saveContent);
        }

        /// <summary>
        /// 删除一个缓存
        /// </summary>
        /// <param name="administartorModel"></param>
        /// <returns></returns>
        internal static async Task RemoveAdministartorModelAsync(DB.Tables.Administartor administartorModel)
        {
            if (administartorModel == null) return;
            await RemoveAdministartorModelAsync(administartorModel.Id);
        }

        /// <summary>
        /// 删除一个缓存
        /// </summary>
        /// <param name="administartorModel"></param>
        /// <returns></returns>
        internal static async Task RemoveAdministartorModelAsync(int administartorId)
        {
            await RedisCache.GetRedis().HashDeleteAsync(Administartor.REDIS_HASH_KEY, administartorId);
        }

        /// <summary>
        /// 获取一个管理员缓存
        /// </summary>
        /// <param name="administartorModelId"></param>
        /// <returns></returns>
        internal static async Task<DB.Tables.Administartor> GetAdministartorModelCacheAsync(int administartorModelId)
        {
            var value = await RedisCache.GetRedis().HashGetAsync(Administartor.REDIS_HASH_KEY, administartorModelId);
            if (value.HasValue)
                return JsonConvert.DeserializeObject<DB.Tables.Administartor>(value);
            return null;
        }

        /// <summary>
        /// 获取一个管理员模型
        /// </summary>
        /// <param name="administartorModelId"></param>
        /// <returns></returns>
        internal static async Task<DB.Tables.Administartor> GetAdministartorModelAsync(int administartorModelId)
        {
            var model = await GetAdministartorModelCacheAsync(administartorModelId);
            if (model != null) return model;
            await using var db = new MyForDbContext();
            model = await db.Administartors.AsNoTracking().SingleOrDefaultAsync(a => a.Id == administartorModelId);
            return model;
        }
    }
}
