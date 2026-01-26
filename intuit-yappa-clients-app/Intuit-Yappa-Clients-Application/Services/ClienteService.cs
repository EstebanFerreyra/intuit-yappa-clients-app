using Intuit.Yappa.Clients.Application.Mappings;
using Intuit.Yappa.Clients.Domain.Entities;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _clienteRepository;

    public ClienteService(IClienteRepository clienteRepository)
    {
        _clienteRepository = clienteRepository;
    }

    public async Task<IEnumerable<Client>> GetAllAsync()
    {
        return await _clienteRepository.GetAllAsync();
    }

    public async Task<Client?> GetByIdAsync(int id)
    {
        var client = await _clienteRepository.GetByIdAsync(id);

        if (client == null)
            throw new NotFoundException($"No se encontró el cliente con ID {id}");

        return client;
    }

    public Task<IEnumerable<Client>> SearchAsync(string term)
        => _clienteRepository.SearchAsync(term);

    public async Task CreateAsync(ClientCreateDto clientDto)
    {
        var client = clientDto.ToEntity();

        ClientValidator.Validate(client);

        if (await _clienteRepository.ExistsByIdAsync(client.Id))
            throw new BadRequestException($"Ya existe un cliente con ID {client.Id}");
        
        await _clienteRepository.AddAsync(client);
    }

    public async Task<bool> UpdateAsync(int id, ClientUpdateDto clientdDto)
    {
        if (!await _clienteRepository.ExistsByIdAsync(id))
            throw new NotFoundException($"Cliente con ID {id} no encontrado");

        ClientValidator.ValidateUpdate(clientdDto);

        var client = clientdDto.ToEntity(id);

        await _clienteRepository.UpdateAsync(client);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var client = await _clienteRepository.GetByIdAsync(id);
        if (client is null) return false;

        await _clienteRepository.DeleteAsync(client);
        return true;
    }
}
