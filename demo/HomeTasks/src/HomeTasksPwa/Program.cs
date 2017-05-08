using Microsoft.AspNetCore.Hosting;
using System.Security.Cryptography.X509Certificates;
using System.IO;

namespace HomeTasksPwa
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var cert = new X509Certificate2("../../Cert/ServerSSL.pfx", "qwerty");

            var host = new WebHostBuilder()
                .UseKestrel(cfg =>
                {
                    cfg.UseHttps(cert);
                })
                .UseUrls("http://localhost.com", "https://localhost.com:443")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
