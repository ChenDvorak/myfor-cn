using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Administartors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MyForAPI.Controllers.Administrators
{
    /// <summary>
    /// 账号控制器
    /// </summary>
    public class AccountsController : AdministartorsSideController
    {
        private readonly IConfiguration _configuration;

        public AccountsController(IConfiguration _configuration)
        {
            this._configuration = _configuration;
        }

        /*
         *  管理员登录
         *  return:
         *      200:    登录成功
         *      400：    登录失败
         */
        [HttpPatch("login"), AllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody]string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
                return BadRequest("请输入要账号/邮箱、密码");

            string decoding = Encoding.UTF8.GetString(Convert.FromBase64String(base64));
            var model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Login>(decoding);

            if (string.IsNullOrWhiteSpace(model.Account))
                return BadRequest("账号不能为空");
            if (string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("密码不能为空");

            AdministartorHub hub = new AdministartorHub();
            var admin = await hub.LoginAsync(model);
            if (admin == null) return BadRequest("账号不存在或密码错误");

            //  build JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.Role, "Administrator"),
                new Claim(ClaimTypes.PrimarySid, admin.Id.ToString())
            };

            string secret = _configuration.GetSection("JwtSettings:Secret").Value;
            var accessExpiration = _configuration.GetSection("JwtSettings:AccessExpiration").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var jwtToken = new JwtSecurityToken(
                    _configuration.GetSection("JwtSettings:Issuer").Value,
                    _configuration.GetSection("JwtSettings:Audience").Value,
                    claims,
                    notBefore: null,
                    DateTime.UtcNow.AddMinutes(int.Parse(accessExpiration)),
                    credentials
            );
            var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            var userInfo = admin.GetLoginInfo();
            userInfo.JWT = token;
            return Ok(userInfo);
        }

        /*
         *  登出
         *  retrun:
         *      204:
         */
        [HttpPatch("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            if (!CurrentAdministartorAccount.HasValue)
                return Unauthorized();

            AdministartorHub hub = new AdministartorHub();
            await hub.LogoutAsync(CurrentAdministartorAccount.Value);
            return NoContent();
        }

        /// <summary>
        /// 当前用户是否登录
        /// </summary>
        /// <returns></returns>
        [HttpGet("isLoggedIn"), Authorize]
        public IActionResult IsLoggedIn()
        {
            if (CurrentAdministartorAccount.HasValue)
                return NoContent();
            return Unauthorized();
        }
    }
}
