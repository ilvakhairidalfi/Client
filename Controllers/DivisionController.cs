using _181022.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;

namespace WebApp.Controllers
{
    public class DivisionController : Controller
    {
        MyContext myContext;

        public DivisionController(MyContext myContext)     // constractor dari MyContext
        {
            this.myContext = myContext;
        }
         
        // GET ALL
        public IActionResult Index()
        {
            var data = myContext.Divisions.ToList();    // mangiil constractor MyContext. Kalau mau pakai WHERE di ToList blh
                                                        //  (context).(nama tabel).ToList (get all-nya)
            return View(data);                          // data taro di dlem View utk di passing ke View. Lalu buat View
        }

        // GET BY ID
        public IActionResult Details(int id)    // kalau get id/ detail pakai parameter yg akan di get
        {
            var data = myContext.Divisions.Find(id);    // (context).(nama tabel).Find(id) (utk mencari id)
            return View(data);
        }

        // INSERT - GET POST
        public IActionResult Create()           // insert Get
        {                                       // untuk bikin view di insert, pilih salah satu saja
            //get data disini
            //ex : dropdown data didapat dari database
            return View();
        }

        [HttpPost]                              // insert post
        [ValidateAntiForgeryToken]

        public IActionResult Create(Division division)
        {
            myContext.Divisions.Add(division);
            var result = myContext.SaveChanges();       // SaveChanges disini sama seperti return non query
            if (result > 0)
                return RedirectToAction("Index", "Division");
            return View();                              // mereturn integer/ jumlah row yang tereksekusi
        }

        // UPDATE - GET POST
        public IActionResult Edit(int id)           
        {       
            var data = myContext.Divisions.Find(id);
            return View(data);
        }

        [HttpPost]                              
        [ValidateAntiForgeryToken]

        public IActionResult Edit(int id, Division division)
        {
            var data = myContext.Divisions.Find(id);
            if (data != null)
            {
                data.Name = division.Name;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Division");
            }
            return View();                              
        }

        // DELETE - GET POST
        public IActionResult Delete(int id)
        {
            var data = myContext.Divisions.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Delete(Division division)
        {
            myContext.Divisions.Remove(division);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Division");
            return View();
        }
    }
}
