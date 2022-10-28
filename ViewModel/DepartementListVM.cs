using System;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApp.ViewModel
{
    public class DepartementListVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DivisionID { get; set; }

        public List<SelectListItem> Divisions { get; set; }
    }
}
