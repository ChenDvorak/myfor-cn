using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Users;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace myFor_API.Controllers.Clients
{
    public class AccountsController : ClientsSideController
    {
        private readonly IConfiguration _configuration;
        public AccountsController(ICurrentUser currentUser, IConfiguration _configuration)
        {
            this._configuration = _configuration;
        }


        /*
         * client login
         * return: 
         *  -   200: login success, the user name in body
         *  -   400: login fault, the reason in body
         */
        //  patch: /api/clients/login
        [HttpPatch("login")]
        public async Task<IActionResult> LoginAsync([FromBody]string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
                return BadRequest("请输入要账号/邮箱、密码");

            string decoding = Encoding.UTF8.GetString(Convert.FromBase64String(base64));

            var model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Login>(decoding);

            var userHub = new UsersHub();
            (var user, string msg) = await userHub.LoginAsync(model);
            if (user is null)
                return BadRequest(msg);

            //  build JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Account)
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
            Response.Cookies.Append(CLIENT_JWT_KEY, token);
            //  返回登录账号，用户名，角色
            Results.LoginInfo result = await user.GetLoginInfoAsync();
            return Ok(result);
        }

        /*
         * client logout
         * return: 
         *  -   200: logout successfully
         */
        //  patch: /api/clients/login
        [HttpPatch("logout"), Authorize]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(CLIENT_JWT_KEY);
            return Ok();
        }

        /*
         * sign up
         * return:
         *  -   200:    sign up successfull
         *  -   400:    default
         */
        [HttpPost("signup")]
        public async Task<IActionResult> SignUpAsync([FromBody]string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
                return BadRequest("请输入要注册的账号、密码、邮箱");

            string decoding = Encoding.UTF8.GetString(Convert.FromBase64String(base64));

            var model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.SignUp>(decoding);

            UsersHub usersHub = new UsersHub();
            (var isSuccess, string msg) = await usersHub.SignUpAsync(model);
            if (isSuccess)
                return Ok();
            return BadRequest(msg);
        }
    }
}
