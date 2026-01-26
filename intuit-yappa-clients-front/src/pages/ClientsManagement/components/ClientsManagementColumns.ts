import type { GridColDef } from "@mui/x-data-grid";
import type { Client } from "../../../models/Client";
import { formatDate, formatPhone } from "../../../utils/formatters";

export const getColumnsClientsManagement = (): GridColDef<Client>[] => {
  return [
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellido", headerName: "Apellido", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "razonSocial", headerName: "Razón Social", width: 200 },
    { field: "cuit", headerName: "CUIT", width: 200 },
    {
      field: "fechaNacimiento",
      headerName: "Fecha de Nacimiento",
      width: 200,
      valueFormatter: (value) => formatDate(value),
    },
    {
      field: "telefonoCelular",
      headerName: "Teléfono",
      width: 200,
      valueFormatter: (value) => formatPhone(value),
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 100,
      valueFormatter: () => "Editar",
    },
  ];
};