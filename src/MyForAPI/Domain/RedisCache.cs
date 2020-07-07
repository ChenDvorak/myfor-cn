using System;
using System.Collections.Generic;
using System.Text;
using Common;
using StackExchange.Redis;

namespace Domain
{
    internal static class RedisCache
    {
        private static readonly ConnectionMultiplexer _conn = ConnectionMultiplexer.Connect(Config.GetConnectionString("redis"));

        public static IDatabase GetRedis(int db = -1)
        {
            return _conn.GetDatabase(db);
        }
    }
}
