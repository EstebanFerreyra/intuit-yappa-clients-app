import type { GridColDef } from "@mui/x-data-grid";
import type { Client } from "../../../models/Client";

export const getColumnsClientsManagement = (): GridColDef<Client>[] => {
  return [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellido", headerName: "Apellido", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "fullName",
      headerName: "Nombre completo",
      width: 200,
      sortable: false,
      valueGetter: (_, row) => `${row.nombre} ${row.apellido}`,
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellido", headerName: "Apellido", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "fullName",
      headerName: "Nombre completo",
      width: 200,
      sortable: false,
      valueGetter: (_, row) => `${row.nombre} ${row.apellido}`,
    },
  ];
};
