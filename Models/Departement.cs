using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _181022.Model
{
    public class Departement
    {
        public Departement()
        {

        }
        public Departement(int Id, string Name, int DivisionID)
        {
            this.Id = Id;
            this.Name = Name;
            this.DivisionID = DivisionID;
        }
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("Division")]
        public int DivisionID { get; set; }

        public Division Division { get; set; }
    }
}
