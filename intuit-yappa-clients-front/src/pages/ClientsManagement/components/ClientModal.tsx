import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import type { Client } from "../../../models/Client";
import { clientService } from "../../../services/client.service";

interface ClientModalProps {
  open: boolean;
  mode: "create" | "edit";
  client?: Client | null;
  onClose: () => void;
  onSuccess: () => void;
}

type ClientForm = Omit<Client, "id">;
type FormErrors = Partial<Record<keyof ClientForm, string>>;

const formatCuit = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2)}`;

  return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
};

const ClientModal = ({
  open,
  mode,
  client,
  onClose,
  onSuccess,
}: ClientModalProps) => {
  const [form, setForm] = useState<ClientForm>({
    nombre: client?.nombre ?? "",
    apellido: client?.apellido ?? "",
    email: client?.email ?? "",
    cuit: client?.cuit ?? "",
    telefonoCelular: client?.telefonoCelular ?? "",
    razonSocial: client?.razonSocial ?? "",
    fechaNacimiento: client?.fechaNacimiento ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof ClientForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCuitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCuit(e.target.value);
    setForm((prev) => ({ ...prev, cuit: formatted }));
  };

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    if (mode === "create") {
      if (!form.nombre) validationErrors.nombre = "Campo obligatorio";
      if (!form.apellido) validationErrors.apellido = "Campo obligatorio";
      if (!form.email) validationErrors.email = "Campo obligatorio";
      if (!form.cuit) validationErrors.cuit = "Campo obligatorio";
      if (!form.telefonoCelular)
        validationErrors.telefonoCelular = "Campo obligatorio";
      if (!form.razonSocial) validationErrors.razonSocial = "Campo obligatorio";
      if (!form.fechaNacimiento)
        validationErrors.fechaNacimiento = "Campo obligatorio";
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      validationErrors.email = "Email inválido";
    }

    if (form.cuit && !/^\d{2}-\d{8}-\d{1}$/.test(form.cuit)) {
      validationErrors.cuit = "Formato inválido (XX-XXXXXXXX-X)";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      if (mode === "edit" && client) {
        await clientService.update(client.id, {
          ...form,
          id: client.id,
        });
      } else {
        await clientService.create(form);
      }

      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      setErrors({ email: "Error al guardar cliente" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {mode === "edit" ? "Editar cliente" : "Agregar cliente"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nombre"
              fullWidth
              value={form.nombre}
              onChange={handleChange("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Apellido"
              fullWidth
              value={form.apellido}
              onChange={handleChange("apellido")}
              error={!!errors.apellido}
              helperText={errors.apellido}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="CUIT"
              fullWidth
              value={form.cuit}
              onChange={handleCuitChange}
              disabled={mode === "edit"}
              error={!!errors.cuit}
              helperText={errors.cuit ?? "Formato: 20-44731927-7"}
              inputProps={{ inputMode: "numeric" }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Teléfono"
              fullWidth
              value={form.telefonoCelular}
              onChange={handleChange("telefonoCelular")}
              error={!!errors.telefonoCelular}
              helperText={errors.telefonoCelular}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Razón Social"
              fullWidth
              value={form.razonSocial}
              onChange={handleChange("razonSocial")}
              disabled={mode === "edit"}
              error={!!errors.razonSocial}
              helperText={errors.razonSocial}
            />
          </Grid>

          {mode === "create" && (
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                value={form.fechaNacimiento}
                onChange={handleChange("fechaNacimiento")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.fechaNacimiento}
                helperText={errors.fechaNacimiento}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={22} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientModal;
