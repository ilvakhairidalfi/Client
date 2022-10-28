using _181022.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class UserController : Controller
    {
        MyContext myContext;

        public UserController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        //get all
        public IActionResult Index()
        {
            var data = myContext.Users.ToList();
            return View(data);
        }

        //get id
        public IActionResult Details(int id)    // kalau get id/ detail pakai parameter yg akan di get
        {
            var data = myContext.Users.Find(id);    // (context).(nama tabel).Find(id) (utk mencari id)
            return View(data);
        }

        // INSERT - GET POST
        public IActionResult Create()          // insert get
        {
            // agar role dan employee id jadi drop down list

            var UserList = new UserListVM();
            UserList.Roles = myContext.Roles.Select(r => new SelectListItem()
            {
                Value = r.Id.ToString(),
                Text = r.Name
            }).ToList();
            
            return View(UserList);
        }

        [HttpPost]                              // insert post
        [ValidateAntiForgeryToken]

        public IActionResult Create(User user)
        {
            myContext.Users.Add(user);
            var result = myContext.SaveChanges();       // SaveChanges disini sama seperti return non query
            if (result > 0)
                return RedirectToAction("Index", "User");
            return View();                              // mereturn integer/ jumlah row yang tereksekusi
        }

        // UPDATE - GET POST
        public IActionResult Edit(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Edit(int id, User user)
        {
            var data = myContext.Users.Find(id);
            if (data != null)
            {
                data.Password = user.Password;
                data.RoleId = user.RoleId;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "User");
            }
            return View();
        }

        // DELETE - GET POST
        public IActionResult Delete(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Delete(User user)
        {
            myContext.Users.Remove(user);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "user");
            return View();
        }
    }
}
