using Intuit.Yappa.Clients.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class ClientsDbContext : DbContext
{
    public ClientsDbContext(DbContextOptions<ClientsDbContext> options)
        : base(options)
    {
    }

    public DbSet<Client> Clientes => Set<Client>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.ToTable("clientes");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
            entity.Property(e => e.Apellido).HasColumnName("apellido");
            entity.Property(e => e.RazonSocial).HasColumnName("razon_social");
            entity.Property(e => e.Cuit).HasColumnName("cuit");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.TelefonoCelular).HasColumnName("telefono_celular");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FechaCreacion).HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion).HasColumnName("fecha_modificacion");
        });
    }
}


