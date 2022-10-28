using _181022.Model;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Context
{
    public class MyContext : DbContext
    {

        public MyContext(DbContextOptions<MyContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Division> Divisions { get; set; }
        public DbSet<Departement> Departements { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
