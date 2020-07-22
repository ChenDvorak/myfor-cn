using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyForAPI.Controllers.Administrators
{
    [Route("api/administrators/[controller]")]
    [Authorize(policy: Authorization.Policy.ADMINISTRATOR)]
    public abstract class AdministartorsSideController : _base.MyForController
    {

    }
}
