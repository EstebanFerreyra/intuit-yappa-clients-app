using Intuit.Yappa.Clients.Domain.Entities;

public interface IClienteRepository
{
    Task<IEnumerable<Client>> GetAllAsync();
}
