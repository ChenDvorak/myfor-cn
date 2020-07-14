using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace MyForAPI.Controllers.Clients
{
    [Route("api/clients/[controller]")]
    [ApiController]
    public class ClientsSideController : _base.MyForController
    {
        protected const string CLIENT_JWT_KEY = "no0ko72a";

        /// <summary>
        /// 当前登录用户账号，没有登录则为 null
        /// </summary>
        protected string CurrentAccount => User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        /// <summary>
        /// 当前是否已登录
        /// </summary>
        protected bool CurrentIsLogged => CurrentAccount != null;
    }
}
