# Intuit Yappa – Clients Management Application

Este repositorio contiene una aplicación completa para la gestión de clientes (ABM), desarrollada como parte de un challenge técnico.  
La solución está compuesta por un Backend en .NET 7 y un Frontend en React + TypeScript, siguiendo buenas prácticas de arquitectura, validaciones y experiencia de usuario.

---

## 1. Descripción General

La aplicación permite:

- Listar clientes existentes
- Buscar clientes por nombre, apellido o email
- Crear nuevos clientes
- Editar clientes existentes con reglas de negocio específicas
- Visualizar el detalle de un cliente

Se implementan validaciones tanto en backend como en frontend, y se respetan restricciones funcionales definidas para altas y modificaciones.

---

## 2. Tecnologías Utilizadas

### Backend

- .NET 7 Web API
- Entity Framework Core
- MySQL
- Stored Procedures
- Swagger (OpenAPI)
- Serilog

### Frontend

- React
- TypeScript
- Vite
- Material UI (MUI)
- React Router
- Fetch API

---

## 3. Arquitectura

El backend sigue una arquitectura basada en principios de Clean Architecture, separando responsabilidades en las siguientes capas:

- API: Controladores y configuración
- Application: Lógica de negocio y validaciones
- Domain: Entidades del dominio
- Infrastructure: Acceso a datos y Stored Procedures

El frontend se organiza por features, con componentes reutilizables y tipado estricto.

---

## 4. Requisitos Previos

- .NET SDK 7.x
- Node.js 18 o superior
- MySQL o MariaDB
- npm o yarn

---

## 5. Backend – Configuración y Ejecución

### 5.1 Base de Datos

Crear la base de datos:

CREATE DATABASE challenge_clientes;

Configurar la cadena de conexión en appsettings.json:
"ConnectionStrings": {
"DefaultConnection": "Server=localhost;Port=3306;Database=challenge_clientes;User=root;Password=YOUR_PASSWORD;SslMode=none"
}

### 5.2 Ejecución del Backend

dotnet run
La api esta disponible: https://localhost:5001

## 6. Documentación de la API

La API expone su documentación mediante Swagger:
https://localhost:5001/swagger
Endpoints Principales
Método Endpoint Descripción

- GET /api/clientes Obtener todos los clientes
- GET /api/clientes/{id} Obtener cliente por ID
- GET /api/clientes/search Buscar clientes
- POST /api/clientes Crear cliente
- PUT /api/clientes/{id} Actualizar cliente

## 7. Reglas de Negocio

Alta de Cliente
Todos los campos son obligatorios:

- Nombre
- Apellido
- Email
- Teléfono celular
- CUIT (formato XX-XXXXXXXX-X)
- Razón Social
- Fecha de nacimiento
  Modificación de Cliente
  Solo se permite modificar:
- Nombre
- Apellido
- Email
- Teléfono celular

Los campos CUIT, razón social y fecha de nacimiento no son editables.

## 8. Frontend – Configuración y Ejecución

### 8.1 Instalación de Dependencias

cd intuit-yappa-clients-front
npm install

### 8.2 Ejecución en Desarrollo

npm run dev
http://localhost:5173

## 9. Funcionalidades del Frontend

- Grilla de clientes con paginación
- Búsqueda mediante Autocomplete
- Modal reutilizable para alta y edición
- Edición desde columna de acciones
- Validaciones de formulario
- Formateo automático de CUIT
- Refresco automático de la grilla luego de altas o ediciones

## 10. Validaciones

Campos obligatorios en alta

- Validación de email
- Validación y formateo de CUIT (XX-XXXXXXXX-X)
- Bloqueo de campos no editables en modo edición
- Deshabilitación de guardado ante datos inválidos

## 11. Manejo de Errores y Logging

Logging centralizado con Serilog
Manejo de errores HTTP
Mensajes de error controlados en frontend y backend

## 12. Notas Finales

Este proyecto fue desarrollado priorizando:
Código mantenible
Separación de responsabilidades
Validaciones consistentes
Experiencia de usuario clara y controlada
