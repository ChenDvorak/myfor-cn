namespace Domain.Administartors
{
    public class Models
    {
        public class Login
        {
            public string Account { get; set; }
            public string Password { get; set; }
        }

        public class NewAdministarnor
        {
            public string Account { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
        }
    }
}
