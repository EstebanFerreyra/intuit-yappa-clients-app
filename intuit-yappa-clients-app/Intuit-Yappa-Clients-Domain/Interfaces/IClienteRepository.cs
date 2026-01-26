using Intuit.Yappa.Clients.Domain.Entities;

public interface IClienteRepository
{
    Task<IEnumerable<Client>> GetAllAsync();
    Task<Client?> GetByIdAsync(int id);
    Task<IEnumerable<Client>> SearchAsync(string term);
    Task AddAsync(Client client);
    Task UpdateAsync(Client client);
    Task DeleteAsync(Client client);
    Task<bool> ExistsByIdAsync(int id);

}
