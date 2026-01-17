using Microsoft.EntityFrameworkCore;
using Xunit;
using Intuit.Yappa.Clients.Domain.Entities;

public class ClienteRepositoryTests
{
    private ClientsDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<ClientsDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new ClientsDbContext(options);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllClientes()
    {
        // Arrange
        var context = CreateDbContext();

        context.Clientes.AddRange(
            new Client
            {
                Nombre = "Juan",
                Apellido = "Perez",
                RazonSocial = "JP SA",
                Cuit = "20-12345678-9",
                FechaNacimiento = new DateTime(1990, 1, 1),
                TelefonoCelular = "3411111111",
                Email = "juan@test.com",
                FechaCreacion = DateTime.Now,
                FechaModificacion = DateTime.Now
            },
            new Client
            {
                Nombre = "Ana",
                Apellido = "Gomez",
                RazonSocial = "AG SRL",
                Cuit = "27-87654321-0",
                FechaNacimiento = new DateTime(1985, 5, 10),
                TelefonoCelular = "3412222222",
                Email = "ana@test.com",
                FechaCreacion = DateTime.Now,
                FechaModificacion = DateTime.Now
            }
        );

        await context.SaveChangesAsync();

        var repository = new ClienteRepository(context);

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }
}
