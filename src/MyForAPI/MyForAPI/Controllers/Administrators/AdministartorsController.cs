using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Administartors;
using Microsoft.AspNetCore.Mvc;

namespace MyForAPI.Controllers.Administrators
{
    public class AdministartorsController : AdministartorsSideController
    {
        /*
         *  获取系统管理员列表
         *  return:
         *      200
         */
        [HttpGet]
        public async Task<IActionResult> GetListAsync(int index, int size, string account)
        {
            var pager = Paginator.New(index, size, 1);
            pager["account"] = account ?? "";

            AdministartorHub hub = new AdministartorHub();
            pager = await hub.GetListAsync(pager);
            return Ok(pager);
        }

        /*
         *  创建一个管理员账号
         *  return:
         *      201:    
         */
        [HttpPost]
        public async Task<IActionResult> CreateAsync(Models.NewAdministarnor model)
        {
            if (string.IsNullOrWhiteSpace(model.Account)) return BadRequest("账号不能为空");
            if (string.IsNullOrWhiteSpace(model.Password)) return BadRequest("密码不能为空");
            if (string.IsNullOrWhiteSpace(model.Email)) return BadRequest("邮箱不能为空");

            AdministartorHub hub = new AdministartorHub();
            (bool isSuccess, string msg) = await hub.CreateAsync(model);
            if (isSuccess) return Created(model.Account, null);
            return BadRequest(msg);
        }
    }
}
