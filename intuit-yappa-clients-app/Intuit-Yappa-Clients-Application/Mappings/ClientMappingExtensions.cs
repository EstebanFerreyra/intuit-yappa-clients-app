using Intuit.Yappa.Clients.Domain.Entities;

namespace Intuit.Yappa.Clients.Application.Mappings;

public static class ClientMappingExtensions
{
    public static Client ToEntity(this ClientCreateDto dto)
    {
        return new Client
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            RazonSocial = dto.RazonSocial,
            Email = dto.Email,
            Cuit = dto.Cuit,
            TelefonoCelular = dto.TelefonoCelular,
            FechaNacimiento = dto.FechaNacimiento
        };
    }

    public static Client ToEntity(this ClientUpdateDto dto, int id)
    {
        return new Client
        {
            Id = id,
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            TelefonoCelular = dto.TelefonoCelular,
            Email = dto.Email
        };
    }
}
