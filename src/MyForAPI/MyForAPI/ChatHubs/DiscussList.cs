using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyForAPI.ChatHubs
{
    /// <summary>
    /// 讨论区列表
    /// </summary>
    public class DiscussList : Hub<IDiscussList>
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}
