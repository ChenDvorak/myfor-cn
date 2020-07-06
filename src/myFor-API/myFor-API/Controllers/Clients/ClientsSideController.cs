using Microsoft.AspNetCore.Mvc;

namespace myFor_API.Controllers.Clients
{
    [Route("api/clients/[controller]")]
    public class ClientsSideController : _Base.MyForController
    {
        protected const string CLIENT_JWT_KEY = "no0ko72a";

        /*
         *  /api/clients/ClientsSide
         */
        public string Index()
        {
            return "success";
        }
    }
}
