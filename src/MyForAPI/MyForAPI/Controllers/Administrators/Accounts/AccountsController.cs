using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Administartors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyForAPI.Controllers.Administrators.Accounts
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
        [HttpPatch("login")]
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
            var userInfo = await hub.LoginAsync(model);
            if (userInfo == null) return Unauthorized("账号不存在或密码错误");

            //  build JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.Role, "Administrator"),
                new Claim(ClaimTypes.NameIdentifier, userInfo.UserName)
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

            userInfo.JWT = token;
            return Ok(userInfo);
        }
    }
}
