using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyForAPI.ChatHubs
{
    /// <summary>
    /// 讨论区的讨论页
    /// </summary>
    public class DiscussInfo : Hub<IDiscussInfo>
    {
    }
}
