import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import type { Client } from "../../models/Client";

const ClientDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const client = state as Client;

  if (!client) {
    return <Typography>No se encontró el cliente</Typography>;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          minHeight: 420,
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }} textAlign="center">
              <Avatar
                src="/user-default.png"
                alt="Usuario"
                sx={{
                  width: 140,
                  height: 140,
                  mx: "auto",
                  mb: 2,
                }}
              />

              <Typography variant="h5" fontWeight="bold">
                {client.nombre} {client.apellido}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" mt={1}>
                {client.razonSocial}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Información del cliente
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{client.email}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    CUIT
                  </Typography>
                  <Typography variant="body1">{client.cuit}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1">
                    {client.telefonoCelular}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Fecha de nacimiento
                  </Typography>
                  <Typography variant="body1">
                    {new Date(client.fechaNacimiento).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button variant="contained" onClick={() => navigate(-1)}>
                  Volver
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientDetail;
