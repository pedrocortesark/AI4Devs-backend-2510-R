# Progress - Historial de Cambios y Deuda Técnica

> **Registro cronológico de hitos, decisiones y pendientes del proyecto LTI.**

## Hitos Completados

### ✅ Fase 0-3: Setup y CRUD de Candidatos
**Fecha:** Antes de 2026-01-05
- [x] Estructura de carpetas frontend/backend
- [x] Schema Prisma completo (10 modelos)
- [x] Backend: CRUD de Candidatos con Education, WorkExperience, Resume
- [x] Frontend: Formulario de candidatos con react-bootstrap
- [x] Docker Compose + PostgreSQL

### ✅ Fase 4: Resolución de Problemas de Prisma
**Fecha:** 2026-01-05 ~07:00
- [x] Migraciones aplicadas correctamente
- [x] Seeding de datos de prueba funcionando

### ✅ Fase 5: Inicialización del Memory Bank
**Fecha:** 2026-01-05 09:00
- [x] Lectura del protocolo AGENTS.md
- [x] Creación de memory-bank/ (6 archivos core)
- [x] Registro en prompts-log.md
- [x] Creación de .agent/rules/00-memory-bank.md (siguiente)

## Deuda Técnica

### 🔴 Crítica
1. **No hay tests** - Bloquea validación automatizada (2-3 días)
2. **Dos procesos backend duplicados** - Verificar `npm run dev` (5 min)

### 🟡 Moderada
3. **URL DB hardcodeada** - Dificulta multi-entorno (1 hora)
4. **Sin documentación Swagger** - Afecta onboarding (4 horas)
5. **Manejo de errores inconsistente** (2 horas)
6. **Sin logging estructurado** (2 horas)

### 🟢 Baja
7. **Sin validación runtime** - Integrar Zod (3 horas)
8. **Sin estado global frontend** - Redux/Zustand (1 día)
9. **Sin paginación** - GET /candidates (2 horas)

## Funcionalidades Pendientes

### Sprint 1: Positions (2 días)
- [ ] PositionService + endpoints CRUD
- [ ] Frontend: formulario de Position

### Sprint 2: Applications (3 días)
- [ ] ApplicationService
- [ ] UI vincular Candidate + Position
- [ ] Vista de pipeline

### Sprint 3: Interviews (4 días)
- [ ] InterviewService + scheduling
- [ ] UI calendario y feedback

### Sprint 4: Auth (3 días)
- [ ] JWT + roles
- [ ] Login/Logout

## Decisiones Técnicas

**DT-001:** Prisma ORM (type-safety, migraciones)  
**DT-002:** Puerto 5433 PostgreSQL (evitar conflictos)  
**DT-003:** DATABASE_URL hardcodeada (⚠️ revisar)  
**DT-004:** Bootstrap 5 (componentes pre-built)  
**DT-005:** Memory Bank multi-agente (2026-01-05)

---

## Funcionalidades Pendientes (Roadmap)

### Sprint Kanban Backend (EN CURSO - 2026-01-05)
**Objetivo:** Implementar endpoints para funcionalidad Kanban de seguimiento de candidatos.

**⚠️ DIRECTRIZ DE SIMPLICIDAD:** Usar SOLO archivos existentes, NO crear nuevos módulos.

#### Análisis y Diseño (1 hora)
- [x] Análisis del schema Prisma (relaciones Application-Candidate-Interview)
- [x] Diseño de query para cálculo de score promedio
- [x] **Decisión arquitectónica:** Extender `candidateService.ts` y `candidateRoutes.ts` existentes
- [ ] Validación de reglas de negocio (¿puede un candidato retroceder de fase?)

#### Endpoint 1: GET /positions/:id/candidates (2.5 horas)
**Archivos a modificar:**
- ✏️ `backend/src/application/services/candidateService.ts`
- ✏️ `backend/src/routes/candidateRoutes.ts`

**Paso 1.1:** Añadir funciones en `candidateService.ts` (60 min)
- [x] Función: `getCandidatesByPosition(prisma, positionId)`
  - Query Prisma con includes: `candidate`, `interviewStep`, `interviews`
  - Mapeo a DTO con `fullName`, `currentStage`, `averageScore`
- [x] Función auxiliar: `calculateAverageScore(interviews[])`
  - Filtrar `score !== null`
  - Calcular promedio o retornar `null`

**Paso 1.2:** Añadir ruta en `candidateRoutes.ts` (45 min)
- [x] Endpoint: `GET /candidates/positions/:id/candidates` (Ruta anidada por estructura existente)
- [x] Validación: `positionId` debe ser número entero positivo
- [x] Manejo de errores: 400 (invalid ID), 500 (server error)

**Paso 1.3:** Testing manual (30 min)
```bash
# Verificar datos en Prisma Studio
npx prisma studio

# Test del endpoint (Nota: prefijo /candidates heredado de index.ts)
curl http://localhost:3010/candidates/positions/1/candidates
```

#### Endpoint 2: PUT /candidates/:id/stage (2 horas)
**Archivos a modificar:**
- ✏️ `backend/src/application/services/candidateService.ts`
- ✏️ `backend/src/routes/candidateRoutes.ts`

**Paso 2.1:** Añadir función en `candidateService.ts` (75 min)
- [x] Función: `updateCandidateStage(prisma, candidateId, positionId, newStepId)`
  - Buscar Application por candidateId + positionId
  - Validar que newStepId pertenece al InterviewFlow de la Position
  - Actualizar `currentInterviewStep` en Application
  - Manejar errores: Application not found, Invalid stepId

**Paso 2.2:** Añadir ruta en `candidateRoutes.ts` (30 min)
- [x] Endpoint: `PUT /candidates/:id/stage`
- [x] Body: `{ "positionId": number, "newInterviewStepId": number }`
- [x] Manejo de errores: 400, 404, 500

**Paso 2.3:** Testing manual (15 min)
```bash
curl -X PUT http://localhost:3010/candidates/1/stage \
  -H "Content-Type: application/json" \
  -d '{"positionId": 1, "newInterviewStepId": 3}'
```

#### Refactorización y Limpieza de Código (1 hora)
**⚠️ CRÍTICO:** No introducir deuda técnica. Aplicar principios SOLID/DRY.

**Paso 3.1:** Code Review Interno (20 min)
- [x] Verificar SRP: Cada función tiene responsabilidad única (Aplicado en diseño)
- [x] Verificar DRY: No hay código duplicado (Helpers reutilizados)
- [x] Verificar tipado: No hay uso de `any`, tipos explícitos (`CandidateKanbanDTO`)
- [x] Verificar nombres: Variables y funciones son auto-explicativas

**Paso 3.2:** Extracción de Helpers (30 min)
- [x] `calculateAverageScore()` extraído
- [x] `buildFullName()` extraído
- [x] `validateInterviewStepBelongsToFlow()` extraído

**Paso 3.3:** Documentación JSDoc (10 min)
- [x] Documentación añadida a todas las funciones exportadas e internas


- [ ] Test unitario: `calculateAverageScore()` con Jest
- [ ] Test de integración: GET endpoint
- [ ] Test de integración: PUT endpoint

**Estimación Total:** 6.5-8.5 horas  
**Owner:** Asignar  
**Dependencias:** Seed con Positions, Applications e Interviews

---

### Sprint 1: Gestión de Posiciones (2 días)

- [ ] Crear `PositionService.ts`
- [ ] Implementar endpoints CRUD de Positions
- [ ] Crear formulario React para añadir Position
- [ ] Vincular Position con Company (requiere implementar Company primero)

**Estimación:** 2 días  
**Owner:** Asignar

### Sprint 2: Flujo de Applications (3 días)

**Estimación:** 8 horas total  
**Owner:** Asignar  
**Dependencias:** Requiere datos de prueba (seed) con Positions, Applications e Interviews

---

## Métricas

**Cobertura:** 4/12 entidades (33.3%)  
**Tests:** 0% backend, 0% frontend
