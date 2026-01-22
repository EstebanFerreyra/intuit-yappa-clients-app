import type { Client } from "../../models/Client";
import DataTable from "../../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { clientService } from "../../services/client.service";
import { getColumnsClientsManagement } from "./components/ClientsManagementColumns";

const ClientsManagement = () => {
  const [client, setClient] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = getColumnsClientsManagement();

  useEffect(() => {
    clientService
      .getAll()
      .then(setClient)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    // <div >
    //   <DataTable<Client> rows={client} columns={columns} checkboxSelection />
    // </div>
    <div
      style={{
        height: "calc(100vh - 64px)", // ajustable si después agregás AppBar
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "50px",
        paddingLeft: "20px",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <DataTable<Client> rows={client} columns={columns} checkboxSelection />
      </div>
    </div>
  );
};

export default ClientsManagement;