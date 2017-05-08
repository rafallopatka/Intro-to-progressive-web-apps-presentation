using Microsoft.AspNetCore.Mvc;

namespace HomeTasksPwa.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
