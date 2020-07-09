using Microsoft.AspNetCore.Mvc;

namespace MyForAPI.Controllers.Clients
{
    [Route("api/clients/[controller]")]
    [ApiController]
    public class ClientsSideController : _base.MyForController
    {
        protected const string CLIENT_JWT_KEY = "no0ko72a";

        /*
         *  /api/clients/ClientsSide
         */
        [Route("/api/clients/success")]
        public string TestSuccess()
        {
            return "CLIENTS SUCCESS";
        }
    }
}
