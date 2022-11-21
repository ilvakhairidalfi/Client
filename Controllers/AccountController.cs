using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using NuGet.Protocol.Plugins;
using WebApp.Context;
using WebApp.Handlers;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class AccountController : Controller
    {
        MyContext myContext;


        public AccountController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        // Login
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            // cek email ada atau tdk di data
            var data = myContext.Users
                .Include(x => x.Employee)
                .Include(x => x.Role)
                .SingleOrDefault(x => x.Employee.Email.Equals(email));

            // kalau ada baru panggil validatepassword(password. data.password)
            var result = Hashing.ValidatePassword(password, data.Password);
            if (result)   // = if (validatePassword == true)
            {
                if (data != null)
                {
                    HttpContext.Session.SetInt32("Id", data.Id); // session >> ganti sesuai yyg ingin ditampilkan
                    HttpContext.Session.SetString("FullName", data.Employee.FullName);
                    HttpContext.Session.SetString("Email", data.Employee.Email);
                    HttpContext.Session.SetString("Role", data.Role.Name);

                    return RedirectToAction("Index", "Home");
                }
                return View();
            }
            return View();


            //var data = myContext.Users
            //    .Include(x => x.Employee)
            //    .Include(x => x.Role)
            //    .SingleOrDefault(x => x.Employee.Email.Equals(email) && x.Password.Equals(password));
            //if (data != null)
            //{
            //    //ResponseLogin responseLogin = new ResponseLogin()       // stlh session 38 - 43 delete
            //    //{
            //    //    FullName = data.Employee.FullName,
            //    //    Email = data.Employee.Email,
            //    //    Role = data.Role.Name
            //    //};

            //    HttpContext.Session.SetInt32("Id", data.Id); // session >> ganti sesuai yyg ingin ditampilkan
            //    HttpContext.Session.SetString("FullName", data.Employee.FullName); 
            //    HttpContext.Session.SetString("Email", data.Employee.Email); 
            //    HttpContext.Session.SetString("Role", data.Role.Name); 

            //    return RedirectToAction("Index", "Home");
            //}
            //return View();
        }

        //Register
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(string fullName, string email, DateTime birthDate, string password)
        {
            Employee employee = new Employee()
            {
                FullName = fullName,
                Email = email,
                BirthDate = birthDate
            };

            // cek email tdk blh sama
            var data = myContext.Employees
                .SingleOrDefault(x => x.Email.Equals(email));
            if (data != null)
            {
                return View();
            }
            else
            {
                myContext.Employees.Add(employee);

                var result = myContext.SaveChanges();
                if (result > 0)
                {
                    var id = myContext.Employees.SingleOrDefault(x => x.Email.Equals(email)).Id;
                    User user = new User
                    {
                        Id = id,
                        //Password = password,
                        Password = Hashing.HashPassword(password),
                        RoleId = 1
                    };
                    myContext.Users.Add(user);
                    var resultUser = myContext.SaveChanges();
                    if (resultUser > 0)
                        return RedirectToAction("Login", "Account");
                }
            }
            return View();
        }

        // Change Password
        public IActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ChangePassword(string email, string currentPassword, string newPassword)
        {
            var data = myContext.Users
                .Include(x => x.Employee)
                .SingleOrDefault(x => x.Employee.Email.Equals(email)); //&& x.Password.Equals(currentPassword));

            var result = Hashing.ValidatePassword(currentPassword, data.Password);
            if (result)
            {
                //data.Password = newPassword;
                data.Password = Hashing.HashPassword(newPassword);
                myContext.Entry(data).State = EntityState.Modified;

                var resultPassword = myContext.SaveChanges();
                if (resultPassword > 0)
                    return RedirectToAction("Login", "Account");

                return View();
            }
            return View();
        }


        // Forgot Password
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ForgotPassword(string fullName, string email, string newPassword)
        {

            var data = myContext.Users
                .Include(x => x.Employee)
                .SingleOrDefault(x => x.Employee.Email.Equals(email) && x.Employee.FullName.Equals(fullName));

            //data.Password = newPassword;
            data.Password = Hashing.HashPassword(newPassword);
            myContext.Entry(data).State = EntityState.Modified;

            var resultPassword = myContext.SaveChanges();
            if (resultPassword > 0)
                return RedirectToAction("Login", "Account");

            return View();
        }
    }
}
    

