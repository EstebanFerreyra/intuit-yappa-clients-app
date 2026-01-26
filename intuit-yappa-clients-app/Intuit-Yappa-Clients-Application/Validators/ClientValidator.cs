using System.Text.RegularExpressions;
using Intuit.Yappa.Clients.Domain.Entities;

public static class ClientValidator
{
    public static void Validate(Client client)
    {
        if (string.IsNullOrWhiteSpace(client.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(client.Apellido))
            throw new BadRequestException("El apellido es obligatorio");

        if (string.IsNullOrWhiteSpace(client.RazonSocial))
            throw new BadRequestException("La razón social es obligatoria");

        if (string.IsNullOrWhiteSpace(client.Email))
            throw new BadRequestException("El email es obligatorio");

        if (!IsValidEmail(client.Email))
            throw new BadRequestException("El email no tiene un formato válido");

        if (string.IsNullOrWhiteSpace(client.Cuit))
            throw new BadRequestException("El CUIT es obligatorio");

        if (!IsValidCuit(client.Cuit))
            throw new BadRequestException("El CUIT no tiene un formato válido");

        if (string.IsNullOrWhiteSpace(client.TelefonoCelular))
            throw new BadRequestException("El teléfono celular es obligatorio");

        if (!IsValidPhone(client.TelefonoCelular))
            throw new BadRequestException("El teléfono celular no es válido");

        if (client.FechaNacimiento == default)
            throw new BadRequestException("La fecha de nacimiento es obligatoria");
    }

    private static bool IsValidEmail(string email)
        => Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");

    private static bool IsValidPhone(string phone)
        => Regex.IsMatch(phone, @"^\d{10,15}$");

    private static bool IsValidCuit(string cuit)
        => Regex.IsMatch(cuit, @"^\d{2}-\d{8}-\d{1}$");

    public static void ValidateUpdate(ClientUpdateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Apellido))
            throw new BadRequestException("El apellido es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.TelefonoCelular))
            throw new BadRequestException("El teléfono es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Email))
            throw new BadRequestException("El email es obligatorio");

        if (!Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            throw new BadRequestException("Formato de email inválido");
    }

}

