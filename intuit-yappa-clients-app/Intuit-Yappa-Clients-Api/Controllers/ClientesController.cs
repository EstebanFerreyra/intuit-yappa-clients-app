using Intuit.Yappa.Clients.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Intuit.Yappa.Clients.Application.Mappings;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteService _clienteService;

    public ClientesController(IClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
           => Ok(await _clienteService.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var client = await _clienteService.GetByIdAsync(id);
        return client is null ? NotFound() : Ok(client);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string term)
        => Ok(await _clienteService.SearchAsync(term));

    [HttpPost]
    public async Task<IActionResult> Create(ClientCreateDto clientDto)
    {
        await _clienteService.CreateAsync(clientDto);
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ClientUpdateDto client)
    {
        var updated = await _clienteService.UpdateAsync(id, client);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _clienteService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
