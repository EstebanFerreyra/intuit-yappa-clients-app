using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intuit.Yappa.Clients.Domain.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string RazonSocial { get; set; } = null!;
        public string Cuit { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string TelefonoCelular { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaModificacion { get; set; }
    }
}
