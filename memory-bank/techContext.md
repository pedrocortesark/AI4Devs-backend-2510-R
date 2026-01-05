# Tech Context - LTI Talent Tracking System

## Stack Tecnológico Completo

### Backend Stack
| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| **Runtime** | Node.js | - | Entorno de ejecución |
| **Framework** | Express | ^4.19.2 | API REST |
| **Lenguaje** | TypeScript | ^4.9.5 | Type-safe development |
| **ORM** | Prisma Client | ^5.13.0 | Database access |
| **Database** | PostgreSQL | (Docker) | Persistent storage |
| **File Upload** | Multer | ^1.4.5-lts.1 | Multipart form handling |
| **CORS** | cors | ^2.8.5 | Cross-origin requests |
| **Env Config** | dotenv | ^16.4.5 | Environment variables |
| **Documentation** | Swagger UI Express | ^5.0.0 | API docs |

### Frontend Stack
| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| **Framework** | React | ^18.3.1 | UI library |
| **Lenguaje** | TypeScript | ^4.9.5 | Type-safe development |
| **UI Library** | Bootstrap | ^5.3.3 | Styling framework |
| **React Bootstrap** | react-bootstrap | ^2.10.2 | React components for Bootstrap |
| **Icons** | react-bootstrap-icons | ^1.11.4 | Icon library |
| **Routing** | react-router-dom | ^6.23.1 | Client-side routing |
| **Date Picker** | react-datepicker | ^6.9.0 | Date input component |
| **Build Tool** | react-scripts | 5.0.1 | CRA build system |

### DevOps & Tools
| Categoría | Tecnología | Propósito |
|-----------|-----------|-----------|
| **Containerization** | Docker Compose | PostgreSQL container |
| **Testing** | Jest | ^29.7.0 | Unit testing |
| **Testing (TS)** | ts-jest | ^29.1.2 | Jest TypeScript support |
| **Linting** | ESLint | ^9.2.0 | Code quality |
| **Formatting** | Prettier | ^3.2.5 | Code formatting |
| **Dev Server (Backend)** | ts-node-dev | ^1.1.6 | Hot reload durante desarrollo |
| **TypeScript Executor** | ts-node | ^10.9.2 | Run TS scripts (ej. seed.ts) |

## Comandos Críticos

### Inicialización del Proyecto (Primera Vez)

```bash
# 1. Instalar dependencias
cd frontend
npm install

cd ../backend
npm install

# 2. Levantar base de datos PostgreSQL
cd ..
docker-compose up -d

# 3. Generar Prisma Client y migraciones
cd backend
npx prisma generate
npx prisma migrate dev

# 4. Poblar base de datos con datos de prueba
ts-node prisma/seed.ts
```

### Desarrollo Diario

```bash
# Terminal 1: Backend en modo desarrollo (puerto 3010)
cd backend
npm run dev

# Terminal 2: Frontend en modo desarrollo (puerto 3000)
cd frontend
npm start

# Verificar que PostgreSQL está corriendo
docker ps | grep postgres
```

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Build para Producción

```bash
# Backend: Compilar TypeScript a JavaScript
cd backend
npm run build
npm start  # Ejecuta dist/index.js

# Frontend: Crear build optimizado
cd frontend
npm run build  # Genera carpeta build/
```

### Manejo de Base de Datos

```bash
cd backend

# Generar Prisma Client después de cambios en schema.prisma
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name <nombre_descriptivo>

# Aplicar migraciones en producción (sin datos de prueba)
npx prisma migrate deploy

# Abrir Prisma Studio (UI para explorar datos)
npx prisma studio  # Se abre en http://localhost:5555

# Resetear base de datos (DESTRUCTIVO)
npx prisma migrate reset
```

### Docker

```bash
# Levantar PostgreSQL
docker-compose up -d

# Ver logs de PostgreSQL
docker-compose logs -f

# Detener PostgreSQL
docker-compose down

# Detener Y ELIMINAR datos (DESTRUCTIVO)
docker-compose down -v
```

## Configuración de Entornos

### Variables de Entorno

#### `.env` (Raíz del proyecto)
```env
# PostgreSQL connection (usado por Prisma)
DATABASE_URL="postgresql://LTIdbUser:D1ymf8wyQEGthFR1E9xhCq@localhost:5433/LTIdb"
```

#### `docker-compose.yml`
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: LTIdbUser
      POSTGRES_PASSWORD: D1ymf8wyQEGthFR1E9xhCq
      POSTGRES_DB: LTIdb
    ports:
      - "5433:5432"  # NOTA: Puerto no estándar para evitar conflictos
```

### Configuración de Prisma

#### `backend/prisma/schema.prisma`
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]  // Para compatibilidad Docker
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://LTIdbUser:D1ymf8wyQEGthFR1E9xhCq@localhost:5433/LTIdb"
}
```

**NOTA IMPORTANTE:** La URL está hardcodeada en `schema.prisma`. Si cambias credenciales, actualiza AMBOS archivos (`.env` y `schema.prisma`).

## Estructura de URLs y Puertos

| Servicio | URL | Propósito |
|----------|-----|-----------|
| Frontend | http://localhost:3000 | React dev server |
| Backend API | http://localhost:3010 | Express REST API |
| PostgreSQL | localhost:5433 | Database (puerto no estándar) |
| Prisma Studio | http://localhost:5555 | DB admin UI (cuando se ejecuta) |
| Swagger Docs | http://localhost:3010/api-docs | (Si se configura) |

## Endpoints API Actuales

### Candidates
```
GET    /candidates           - Lista todos los candidatos
GET    /candidates/:id       - Obtiene candidato por ID (con educations y workExperiences)
POST   /candidates           - Crea nuevo candidato
PUT    /candidates/:id       - Actualiza candidato existente
DELETE /candidates/:id       - Elimina candidato
```

### File Upload
```
POST   /upload               - Sube archivo (CV)
```

**Ejemplo de Request (POST /candidates):**
```json
{
  "firstName": "Albert",
  "lastName": "Saelices",
  "email": "albert.saelices@gmail.com",
  "phone": "656874937",
  "address": "Calle Sant Dalmir 2, 5ºB. Barcelona",
  "educations": [
    {
      "institution": "UC3M",
      "title": "Computer Science",
      "startDate": "2006-12-31",
      "endDate": "2010-12-26"
    }
  ],
  "workExperiences": [
    {
      "company": "Coca Cola",
      "position": "SWE",
      "description": "",
      "startDate": "2011-01-13",
      "endDate": "2013-01-17"
    }
  ],
  "cv": {
    "filePath": "uploads/1715760936750-cv.pdf",
    "fileType": "application/pdf"
  }
}
```

## Testing Configuration

### Jest Config (Backend)
```javascript
// backend/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

### Jest Config (Frontend)
```javascript
// frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  // Configuración para React Testing Library
};
```

**NOTA:** Jest está configurado pero no hay tests implementados todavía.

## Linting y Formatting

### ESLint (Backend)
```javascript
// backend/.eslintrc.js
module.exports = {
  extends: ['prettier'],
  // ... configuración
};
```

### Prettier (Backend)
```json
// backend/.prettierrc
{
  "semi": true,
  "singleQuote": true
}
```

**Comandos (no están en package.json, añadir si se necesitan):**
```bash
# Lint
npx eslint src/

# Format
npx prettier --write src/
```

## Troubleshooting Común

### Error: "Can't reach database server"
```bash
# Verificar que Docker está corriendo
docker ps

# Verificar logs de PostgreSQL
docker-compose logs postgres

# Verificar puerto correcto (5433, no 5432)
# Verificar que DATABASE_URL coincide con docker-compose.yml
```

### Error: "Prisma Client not generated"
```bash
cd backend
npx prisma generate
```

### Error: "CORS blocked"
```bash
# Verificar que el frontend corre en http://localhost:3000
# Verificar configuración de CORS en backend/src/index.ts
```

### Error: "Module not found" después de npm install
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Decisiones Técnicas Clave

1. **Puerto PostgreSQL 5433 (no 5432)**: Para evitar conflictos con instancias locales de Postgres
2. **TypeScript 4.9.5 (no ^5.x)**: Por compatibilidad con react-scripts 5.0.1
3. **Prisma hardcoded URL**: Se evita usar env var en schema.prisma por problemas de resolución en algunos entornos
4. **ts-node-dev en lugar de nodemon**: Mejor soporte para TypeScript con hot reload
5. **No hay .prettierrc en frontend**: Se confía en la configuración de react-scripts

## Librería de Comandos (Quick Reference)

```bash
# BACKEND
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TS -> JS
npm start            # Producción (requiere npm run build previo)
npm test             # Jest
npx prisma studio    # UI de base de datos

# FRONTEND  
npm start            # Desarrollo
npm run build        # Build de producción
npm test             # Jest

# DOCKER
docker-compose up -d     # Levantar PostgreSQL
docker-compose down      # Detener PostgreSQL
docker-compose logs -f   # Ver logs

# PRISMA
npx prisma generate         # Generar client
npx prisma migrate dev      # Nueva migración
npx prisma migrate deploy   # Aplicar migraciones (prod)
npx prisma migrate reset    # Resetear DB (DESTRUCTIVO)
ts-node prisma/seed.ts      # Poblar datos de prueba
```
