# Product-payment-flow

Este es un E-commerce de amigurumis desarrollado con React, NestJS y TypeORM. La aplicación consiste en el proceso de compra de un producto(Amigurumis) con pago a tráves del consumo de una API, que incluya la obtención de datos del cliente, validación de pago, actualización de stock y visualización del resultado de la transacción.

## Requisitos

- Node 20.11
- Docker
- React
- Nest.js

## Instalación y Ejecución

### 1. Clonar el Repositorio

## Backend

Primero, clona el repositorio desde GitHub:

```bash
git https://github.com/Vane789/product-payment-flow
cd backend
```

### Instala las dependencias: npm install

```bash
npm install
```

### 2. Configuración Docker

#### Construir y ejecutar los contenedores para ejecutar la imagen de postgres

```bash
docker-compose up --build
```

### 3. Acceder a la Base de Datos

Si necesitas acceder a la base de datos PostgreSQL desde una herramienta externa como DBeaver, utiliza los siguientes parámetros de conexión:

```JSON
Host: localhost
Puerto: 5432
Nombre de la base de datos: postgres
Usuario: admin
Contraseña: admin

Asegúrate de que el contenedor db esté en ejecución y que el puerto 5432 esté expuesto.
```

### 6. Aplicar Migraciones de Base de Datos

Para actualizar la base de datos con los datos dummy se aplica el siguiente comando desde nuestro backend:

```bash
// seed.ts
npx ts-node src/infraestructure/database/seed.ts
```

### 5. Acceder a la Aplicación

La aplicación debería estar accesible en http://localhost:3000.

## Frontend

### 1. Navega al directorio del frontend:

```bash
cd frontend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Iniciar la aplicación:

```bash
npm run start
```

### 4. Acceder a la Aplicación

La aplicación debería estar accesible en http://localhost:3001.

## Estado actual

La aplicación implementa los siguientes requisitos:

1. Página del producto con información de stock.
2. Modal para el ingreso de datos de la tarjeta de crédito y la información de entrega.
3. Resumen del pago y flujo de transacción.

## Planes Futuros

Se planea agregar las siguientes características en futuras actualizaciones:

1. Implementación completa del flujo de pago con la API de Wompi.
2. Pruebas coverage.
3. Despliegue a la nube.

### Notas Adicionales

1. **Asegúrate de tener Docker en ejecución antes de levantar los contenedores**
