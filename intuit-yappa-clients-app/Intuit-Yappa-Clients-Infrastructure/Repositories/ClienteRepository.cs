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
}
