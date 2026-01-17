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
        // Acá mañana van reglas, logs, validaciones, etc.
        return await _clienteRepository.GetAllAsync();
    }
}
