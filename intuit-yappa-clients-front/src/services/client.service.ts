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
};
