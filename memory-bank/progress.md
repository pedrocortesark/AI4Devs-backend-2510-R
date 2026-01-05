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
- [ ] Creación de .agent/rules/00-memory-bank.md (siguiente)

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

## Métricas

**Cobertura:** 4/12 entidades (33.3%)  
**Tests:** 0% backend, 0% frontend
