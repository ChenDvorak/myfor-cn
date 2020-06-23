using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace myFor_API.Controllers._Base
{
    /// <summary>
    /// 所有控制器的基类
    /// </summary>
    [ApiController]
    [Route("api")]
    public abstract class MyForController : ControllerBase
    {
        /// <summary>
        /// 返回一个 410 状态码
        /// 表示所请求的资源不再可用，将不再可用。
        /// 当资源被有意地删除并且资源应被清除时，应该使用这个。
        /// 在收到410状态码后，用户应停止再次请求资源。
        /// </summary>
        /// <returns></returns>
        protected StatusCodeResult Gone() => new StatusCodeResult(410);
    }
}
