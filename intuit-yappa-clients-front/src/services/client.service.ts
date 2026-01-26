import type { Client } from "../models/Client";

const API_URL = "https://localhost:7153/api/clientes";

export const clientService = {
  async getAll(): Promise<Client[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener clientes");
    }

    return response.json();
  },

  async getById(id: number): Promise<Client> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el cliente");
    }

    return response.json();
  },

  // async search(term: string): Promise<Client[]> {
  //   const response = await fetch(
  //     `${API_URL}/search?term=${encodeURIComponent(term)}`,
  //   );

  //   if (!response.ok) {
  //     throw new Error("Error al buscar clientes");
  //   }

  //   return response.json();
  // },

  async search(term: string): Promise<Client[]> {
    const response = await fetch(`${API_URL}/search?term=${term}`);

    if (!response.ok) {
      throw new Error("Error en búsqueda de clientes");
    }

    return response.json();
  },

  async create(client: Omit<Client, "id">): Promise<Client> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Error al crear el cliente");
    }

    return response.json();
  },

  async update(id: number, client: Client): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el cliente");
    }
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el cliente");
    }
  },
};
