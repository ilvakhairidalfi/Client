using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(ResponseLogin responseLogin)
        {
            return View(responseLogin);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //public JsonResult depDashboard()
        //{
        //    try
        //    {
        //        string[] depDashboard = new string[2];

        //        SqlConnection con = new SqlConnection(ConnectionString);
        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("select count(DivisionId) as 1, (select count(DivisionId) from Depatements where DivisionId = 1")
        //    }
        //    catch(Exception ex)
        //    {
        //        ThrowExpressionSyntax ex;
        //    }
        //}
    }
}