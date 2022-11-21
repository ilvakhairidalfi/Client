using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Base;

namespace _181022.Model
{
    public class Division : BaseModel
    {
        public Division()
        {

        }
        public Division(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
