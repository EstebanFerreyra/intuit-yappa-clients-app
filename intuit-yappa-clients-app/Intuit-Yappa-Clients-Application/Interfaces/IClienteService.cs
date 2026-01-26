using Intuit.Yappa.Clients.Domain.Entities;

public interface IClienteService
{
    Task<IEnumerable<Client>> GetAllAsync();
    Task<Client?> GetByIdAsync(int id);
    Task<IEnumerable<Client>> SearchAsync(string term);
    Task CreateAsync(ClientCreateDto clientDto);
    Task<bool> UpdateAsync(int id, ClientUpdateDto clientdDto);
    Task<bool> DeleteAsync(int id);
}
