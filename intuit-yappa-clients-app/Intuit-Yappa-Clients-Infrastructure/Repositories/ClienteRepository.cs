using Intuit.Yappa.Clients.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class ClienteRepository : IClienteRepository
{
    private readonly ClientsDbContext _context;

    public ClienteRepository(ClientsDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Client>> GetAllAsync()
    {
        return await _context.Clientes.ToListAsync();
    }

    public async Task<Client?> GetByIdAsync(int id)
    {
        return await _context.Clientes.FindAsync(id);
    }

    public async Task<IEnumerable<Client>> SearchAsync(string term)
    {
        return await _context.Clientes
            .Where(c =>
                c.Nombre.Contains(term) ||
                c.Apellido.Contains(term))
            .ToListAsync();
    }

    public async Task AddAsync(Client client)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "CALL sp_clients_insert({0}, {1}, {2}, {3}, {4}, {5}, {6})",
            client.Nombre,
            client.Apellido,
            client.RazonSocial,
            client.Cuit,
            client.FechaNacimiento,
            client.TelefonoCelular,
            client.Email
        );
    }

    public async Task UpdateAsync(Client client)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "CALL sp_clients_update({0}, {1}, {2}, {3}, {4})",
            client.Id,
            client.Nombre,
            client.Apellido,
            client.TelefonoCelular,
            client.Email
        );
    }

    public async Task DeleteAsync(Client client)
    {
        _context.Clientes.Remove(client);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByIdAsync(int id)
    {
        return await _context.Clientes.AnyAsync(c => c.Id == id);
    }

}
