using _181022.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class DepartementController : Controller
    {
        MyContext myContext;

        public DepartementController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        //get all
        public IActionResult Index()
        {
            var data = myContext.Departements.ToList();
            return View(data);
        }

        //get id
        public IActionResult Details(int id)    // kalau get id/ detail pakai parameter yg akan di get
        {
            var data = myContext.Departements.Find(id);    // (context).(nama tabel).Find(id) (utk mencari id)
            return View(data);
        }

        // INSERT - GET POST
        public IActionResult Create()          // insert get
        {                                       
            // agar division id jadi drop down list

            var DropDown = new DepartementListVM();
            DropDown.Divisions = myContext.Divisions.Select(s => new SelectListItem()
            {
                Value = s.Id.ToString(),
                Text = s.Name
            }).ToList();

            return View(DropDown);
        }

        [HttpPost]                              // insert post
        [ValidateAntiForgeryToken]

        public IActionResult Create(Departement departement)
        {
            myContext.Departements.Add(departement);
            var result = myContext.SaveChanges();       // SaveChanges disini sama seperti return non query
            if (result > 0)
                return RedirectToAction("Index", "Departement");
            return View();                              // mereturn integer/ jumlah row yang tereksekusi
        }

        // UPDATE - GET POST
        public IActionResult Edit(int id)
        {
            var data = myContext.Departements.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Edit(int id, Departement departement)
        {
            var data = myContext.Departements.Find(id);
            if (data != null)
            {
                data.Name = departement.Name;
                data.DivisionID = departement.DivisionID;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Departement");
            }
            return View();
        }

        // DELETE - GET POST
        public IActionResult Delete(int id)
        {
            var data = myContext.Departements.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Delete(Departement departement)
        {
            myContext.Departements.Remove(departement);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "departement");
            return View();
        }
    }
}
