# System Patterns - LTI Talent Tracking System

## Arquitectura del Sistema

### Visión de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  React 18 + TypeScript + Bootstrap 5 (Port 3000)            │
│  src/                                                       │
│    ├── components/  (Formularios, Tablas)                  │
│    ├── services/    (API Client)                           │
│    └── App.tsx      (Routing)                              │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/JSON (CORS enabled)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       BACKEND API                            │
│  Express + TypeScript (Port 3010)                           │
│  backend/src/                                               │
│    ├── presentation/  (Controllers - futura expansión)     │
│    ├── routes/        (candidateRoutes.ts)                 │
│    ├── application/   (Services, Validators)               │
│    │     ├── services/  (fileUploadService, CandidateService)│
│    │     └── validator.ts                                  │
│    ├── domain/        (Models - DTOs)                      │
│    └── index.ts       (Entry point, middleware setup)      │
└──────────────────────┬──────────────────────────────────────┘
                       │ Prisma Client ORM
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    POSTGRESQL                               │
│  Docker Container (Port 5433)                               │
│  Database: LTIdb                                            │
│  User: LTIdbUser                                            │
└─────────────────────────────────────────────────────────────┘
```

## Clean Architecture (Backend)

### Capas y Responsabilidades

#### 1. **Domain Layer** (`backend/src/domain/`)
**Responsabilidad:** Entidades de negocio puras, sin lógica de infraestructura.

**Contenido Actual:**
- `models/` - Interfaces TypeScript que reflejan el schema de Prisma
  - `Candidate.ts`
  - `Education.ts`
  - `WorkExperience.ts`
  - `Resume.ts`
  - `Application.ts`
  - `Interview.ts`
  - `Position.ts`
  - `Company.ts`
  - etc.

**Regla:** No importa Prisma Client directamente, solo tipos puros.

#### 2. **Application Layer** (`backend/src/application/`)
**Responsabilidad:** Casos de uso, validación de datos, lógica de negocio.

**Contenido Actual:**
- `services/`
  - `CandidateService.ts` - Lógica de creación/actualización de candidatos
  - `fileUploadService.ts` - Manejo de uploads con Multer
- `validator.ts` - Validaciones de entrada de datos

**Regla:** Orquesta el Domain y coordina con Infrastructure (Prisma).

#### 3. **Infrastructure Layer** (Prisma ORM)
**Responsabilidad:** Comunicación con la base de datos.

**Contenido Actual:**
- `backend/prisma/schema.prisma` - Definición de modelos y relaciones
- `backend/prisma/migrations/` - Historial de cambios de schema
- `backend/prisma/seed.ts` - Datos de prueba

**Patrón:** Repository Pattern implícito mediante Prisma Client.

#### 4. **Presentation Layer** (`backend/src/presentation/` + `routes/`)
**Responsabilidad:** Controladores HTTP, serialización de respuestas.

**Contenido Actual:**
- `routes/candidateRoutes.ts` - Definición de endpoints REST para `/candidates`
- `presentation/` - Carpeta creada pero vacía (futura expansión)

**Patern:** Express Router + Middleware chain.

### Flujo de una Request Típica

```
1. HTTP Request (POST /candidates)
         ↓
2. Express Middleware Stack (CORS, JSON parser, Prisma injection)
         ↓
3. candidateRoutes.ts - Identifica handler según método HTTP
         ↓
4. validator.ts - Valida estructura del body
         ↓
5. CandidateService.ts - Lógica de negocio (ej. transformar fechas)
         ↓
6. Prisma Client - Ejecuta transacción en PostgreSQL
         ↓
7. Response JSON (status 201 Created + candidato creado)
```

## Modelo de Datos (Prisma Schema)

### Entidades Core

#### **Candidate** (Núcleo del sistema)
- **Relaciones:**
  - 1:N con `Education`
  - 1:N con `WorkExperience`
  - 1:N con `Resume`
  - 1:N con `Application`

#### **Company** (Multi-tenancy)
- **Relaciones:**
  - 1:N con `Employee`
  - 1:N con `Position`

#### **Position** (Ofertas de trabajo)
- **Relaciones:**
  - N:1 con `Company`
  - N:1 con `InterviewFlow` (define el proceso de entrevistas)
  - 1:N con `Application`

#### **InterviewFlow** (Plantilla de proceso)
- **Relaciones:**
  - 1:N con `InterviewStep` (fases ordenadas)
  - 1:N con `Position` (puede reutilizarse en múltiples posiciones)

#### **InterviewStep** (Fase concreta del proceso)
- **Relaciones:**
  - N:1 con `InterviewFlow`
  - N:1 con `InterviewType` (ej. "Técnica", "Cultural")
  - 1:N con `Application` (FK: currentInterviewStep)
  - 1:N con `Interview` (eventos de entrevista en esta fase)

#### **Application** (Candidatura concreta)
- **Relaciones:**
  - N:1 con `Position`
  - N:1 con `Candidate`
  - N:1 con `InterviewStep` (currentInterviewStep - aquí está ahora)
  - 1:N con `Interview` (historial de entrevistas realizadas)

#### **Interview** (Evento de entrevista)
- **Relaciones:**
  - N:1 con `Application`
  - N:1 con `InterviewStep`
  - N:1 con `Employee` (entrevistador asignado)

### Dependencias entre Módulos

```mermaid
graph TD
    Candidate[Candidate] -->|1:N| Education
    Candidate -->|1:N| WorkExperience
    Candidate -->|1:N| Resume
    Candidate -->|1:N| Application
    
    Company[Company] -->|1:N| Employee
    Company -->|1:N| Position
    
    Position -->|N:1| Company
    Position -->|N:1| InterviewFlow
    Position -->|1:N| Application
    
    InterviewFlow -->|1:N| InterviewStep
    InterviewType -->|1:N| InterviewStep
    
    Application -->|N:1| Position
    Application -->|N:1| Candidate
    Application -->|N:1| InterviewStep
    Application -->|1:N| Interview
    
    Interview -->|N:1| Application
    Interview -->|N:1| InterviewStep
    Interview -->|N:1| Employee
```

## Patrones de Diseño Aplicados

### 1. **Repository Pattern** (Implícito con Prisma)
```typescript
// No hay repositorio explícito, pero Prisma actúa como tal
const candidate = await req.prisma.candidate.create({
  data: { ... },
  include: { educations: true, workExperiences: true }
});
```

### 2. **Middleware Chain** (Express)
```typescript
// index.ts
app.use(express.json());           // Parser
app.use(corsMiddleware);           // CORS
app.use(prismaInjector);           // Inyección de dependencia
app.use('/candidates', routes);    // Routing
app.use(errorHandler);             // Error handling
```

### 3. **DTO Pattern** (Validación)
```typescript
// validator.ts define la estructura esperada
// Los servicios transforman Request DTO -> Domain Model
```

### 4. **Service Layer Pattern**
```typescript
// CandidateService encapsula lógica de negocio
// No es un controller ni un repositorio, sino orquestador
```

## Mapeo de Carpetas Clave

### Backend (`c:\Users\pedro.cortes\source\ai4devs\09-backend\backend\`)
```
backend/
├── src/
│   ├── index.ts              [Entry point: Express init, middleware, routes]
│   ├── application/
│   │   ├── services/
│   │   │   ├── CandidateService.ts   [Lógica de creación de candidatos]
│   │   │   └── fileUploadService.ts   [Multer config para CVs]
│   │   └── validator.ts               [Validaciones con regex y lógica custom]
│   ├── domain/
│   │   └── models/                    [Interfaces TypeScript puras]
│   ├── presentation/                  [VACÍO - futura expansión de controllers]
│   └── routes/
│       └── candidateRoutes.ts         [Endpoints: GET/POST/PUT/DELETE /candidates]
├── prisma/
│   ├── schema.prisma          [Schema ORM con 10 modelos]
│   ├── migrations/            [Historial de cambios de DB]
│   └── seed.ts                [Script de datos de prueba]
├── dist/                      [Compilado de TypeScript (npm run build)]
└── package.json               [Scripts: dev, start, build, test]
```

### Frontend (`c:\Users\pedro.cortes\source\ai4devs\09-backend\frontend\`)
```
frontend/
├── src/
│   ├── App.tsx                [Router principal]
│   ├── components/
│   │   ├── AddCandidate/      [Formulario de creación]
│   │   └── CandidateItem/     [Card/List item de candidato]
│   ├── services/
│   │   └── api.ts             [Axios/Fetch wrapper para backend]
│   └── index.tsx              [Entry point React]
├── public/                    [Assets estáticos]
└── package.json               [Scripts: start, build, test]
```

## Reglas de Modificación

### ❌ NO HAGAS ESTO sin actualizar systemPatterns.md:
1. Añadir una nueva carpeta en `src/` (ej. `infrastructure/repositories/`)
2. Cambiar el schema de Prisma (añadir modelo, modificar relación)
3. Cambiar el puerto del backend o la URL de CORS
4. Introducir un nuevo patrón arquitectónico (ej. CQRS, Event Sourcing)

### ✅ SÍ puedes hacer sin actualizar:
1. Añadir un nuevo campo a un modelo existente (pero documenta en progress.md)
2. Crear un nuevo service dentro de `application/services/`
3. Añadir validaciones al `validator.ts`
4. Crear nuevos componentes React en `components/`

### Protocolo de Actualización:
Si modificas la arquitectura:
1. Edita primero `memory-bank/systemPatterns.md`
2. Registra la decisión técnica en `memory-bank/decisions.md`
3. Actualiza `memory-bank/techContext.md` si cambia el stack
4. Luego ejecuta los cambios en código
