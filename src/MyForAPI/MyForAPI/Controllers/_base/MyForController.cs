using Microsoft.AspNetCore.Mvc;

namespace MyForAPI.Controllers._base
{
    /// <summary>
    /// 所有控制器的基类
    /// </summary>
    [ApiController, Route("api")]
    public class MyForController : ControllerBase
    {
        /// <summary>
        /// 返回一个 410 状态码
        /// 表示所请求的资源不再可用，将不再可用。
        /// 当资源被有意地删除并且资源应被清除时，应该使用这个。
        /// 在收到410状态码后，用户应停止再次请求资源。
        /// </summary>
        /// <returns>410 status code</returns>
        protected ObjectResult Gone(string value = "") => StatusCode(410, value);
    }
}
