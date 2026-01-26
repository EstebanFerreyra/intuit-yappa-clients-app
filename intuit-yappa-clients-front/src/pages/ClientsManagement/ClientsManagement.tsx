import type { Client } from "../../models/Client";
import DataTable from "../../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { clientService } from "../../services/client.service";
import { getColumnsClientsManagement } from "./components/ClientsManagementColumns";
import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Spinner from "../../components/Spinner/Spinner";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClientModal from "./components/ClientModal";

const ClientsManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchOptions, setSearchOptions] = useState<Client[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<ClientModalMode>("create");

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setModalMode("edit");
    setOpenModal(true);
  };

  const columns = getColumnsClientsManagement(handleEdit);

  const navigate = useNavigate();

  type ClientModalMode = "create" | "edit";

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAll();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      console.log(err);
      setError("Error al obtener los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchClients();
  }, []);

  useEffect(() => {
    clientService
      .getAll()
      .then(setClients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchInput = async (value: string) => {
    if (value.length < 3) {
      setSearchOptions([]);
      return;
    }

    try {
      setLoadingSearch(true);
      const result = await clientService.search(value);
      setSearchOptions(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "5px",
        paddingLeft: "20px",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Autocomplete
              options={searchOptions}
              loading={loadingSearch}
              getOptionLabel={(option) =>
                `${option.nombre} ${option.apellido} - ${option.email}`
              }
              onInputChange={(_, value) => handleSearchInput(value)}
              onChange={(_, selectedClient) => {
                if (!selectedClient) {
                  setFilteredClients(clients);
                  return;
                }

                setFilteredClients([selectedClient]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar cliente"
                  placeholder="Ingrese al menos 3 caracteres"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingSearch ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid sx={{ height: 370 }}>
            <DataTable<Client>
              rows={filteredClients}
              columns={columns}
              checkboxSelection
              onRowSelect={(row) => setSelectedClient(row)}
            />
          </Grid>
          <Grid display="flex" gap={1}>
            <Button
              variant="contained"
              onClick={() => {
                setModalMode("create");
                setSelectedClient(null);
                setOpenModal(true);
              }}
            >
              Agregar Usuario
            </Button>

            <Button
              variant="contained"
              disabled={!selectedClient}
              onClick={() =>
                navigate(`/clients/${selectedClient!.id}`, {
                  state: selectedClient,
                })
              }
            >
              Ver Detalle
            </Button>
          </Grid>
        </Grid>
      </div>
      {openModal && (
        <ClientModal
          open={openModal}
          mode={modalMode}
          client={selectedClient}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            setOpenModal(false);
            fetchClients();
          }}
        />
      )}
    </div>
  );
};

export default ClientsManagement;
