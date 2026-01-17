using Intuit.Yappa.Clients.Domain.Entities;

public interface IClienteService
{
    Task<IEnumerable<Client>> GetAllAsync();
}
