using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MyForAPI.Controllers.Administrators
{
    [Route("api/administrators/[controller]"), Authorize]
    [Authorize(policy: Authorization.Policy.ADMINISTRATOR)]
    public abstract class AdministartorsSideController : _base.MyForController
    {
        /// <summary>
        /// 当前登录管理员用户ID，没有登录则为 null
        /// </summary>
        protected int? CurrentAdministartorAccount
        {
            get
            {
                var idStr = User.FindFirst(ClaimTypes.PrimarySid)?.Value;
                if (int.TryParse(idStr, out int id))
                    return id;
                return null;
            }
        }
    }
}
