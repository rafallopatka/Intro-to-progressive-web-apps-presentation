using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;

namespace HomeTasksPwaOptimized
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
                .UseApplicationInsights()
                .Build();

            host.Run();
        }
    }
}
