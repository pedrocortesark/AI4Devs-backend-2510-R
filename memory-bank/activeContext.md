# Active Context - Estado Actual del Desarrollo

> **🚨 SEMÁFORO DE DESARROLLO**: Este archivo refleja el estado EN VIVO del proyecto.  
> **Última actualización:** 2026-01-05 09:42 CET

## ¿En qué estamos trabajando AHORA MISMO?

### 🎯 Tarea Activa
**Planificación de Endpoints Kanban (Backend)**

Se está diseñando la implementación de dos endpoints para gestionar candidatos en un tablero Kanban:
- 🔄 GET `/positions/:id/candidates` - Listar candidatos con score promedio
- 🔄 PUT `/candidates/:id/stage` - Mover candidato entre fases
- ✅ Análisis del schema Prisma completado
- ✅ Roadmap granular creado en `progress.md`
- ⏳ Esperando aprobación del plan antes de implementar

### 🔴 Bloqueos Actuales
**Ninguno** - El sistema está funcional en modo desarrollo:
- ✅ Backend corriendo en puerto 3010 (npm run dev)
- ✅ Frontend corriendo en puerto 3000 (npm start)
- ✅ PostgreSQL disponible en puerto 5433

## Lista de Tareas Inmediatas (Next Steps)

### Alta Prioridad
1. [/] **Implementar Endpoints Kanban** (EN PLANIFICACIÓN)
   - [x] Registrar prompt en prompts-log.md (ID 002)
   - [x] Analizar schema Prisma (Application-Candidate-Interview)
   - [x] Crear roadmap granular en progress.md
   - [x] Actualizar activeContext.md con nuevo foco
   - [x] **REVISIÓN ARQUITECTÓNICA:** Ajustar plan para usar solo archivos existentes
   - [x] Corregir progress.md: NO crear ApplicationService/positionRoutes
   - [x] Corregir systemPatterns.md: Extender candidateService.ts
   - [ ] **ESPERANDO APROBACIÓN DEL PLAN CORREGIDO**
   - [ ] Añadir funciones en candidateService.ts
   - [ ] Añadir rutas en candidateRoutes.ts
   - [ ] Testing manual

2. [ ] **Completar inicialización de Memory Bank**

   - [ ] Crear archivo `progress.md`
   - [ ] Crear archivo `.agent/rules/00-memory-bank.md`
   - [ ] Confirmar que todos los archivos están en su lugar

2. [ ] **Validar coherencia del Memory Bank**
   - [ ] Verificar que `systemPatterns.md` refleja la arquitectura actual
   - [ ] Confirmar que `techContext.md` tiene todos los comandos correctos
   - [ ] Revisar que no hay contradicciones entre archivos

### Media Prioridad (Próximas Features)
3. [ ] **Implementar gestión de Positions**
   - [ ] Crear `PositionService.ts`
   - [ ] Añadir rutas en `positionRoutes.ts`
   - [ ] Crear componente React `AddPosition/`
   - [ ] Actualizar `systemPatterns.md` y `activeContext.md` al iniciar

4. [ ] **Implementar flujo de Applications**
   - [ ] Diseñar UI para vincular Candidate + Position
   - [ ] Crear `ApplicationService.ts`
   - [ ] Implementar lógica de asignación automática a `InterviewStep` inicial

5. [ ] **Sistema de Tests**
   - [ ] Escribir tests unitarios para `CandidateService`
   - [ ] Tests de integración para endpoints `/candidates`
   - [ ] Tests E2E con React Testing Library

### Baja Prioridad (Backlog)
6. [ ] Implementar autenticación JWT
7. [ ] Dashboard de métricas de reclutamiento
8. [ ] Sistema de notificaciones (email)
9. [ ] Integración con calendario

## Estado de Módulos

| Módulo | Estado | Notas |
|--------|--------|-------|
| **Candidates CRUD** | ✅ Completo | Frontend + Backend + DB |
| **Education** | ✅ Completo | Relación 1:N con Candidate |
| **WorkExperience** | ✅ Completo | Relación 1:N con Candidate |
| **Resume Upload** | ✅ Completo | Multer configurado |
| **Positions** | 🚧 Parcial | Schema existe, sin UI |
| **Applications** | ❌ Pendiente | Solo schema Prisma |
| **InterviewFlow** | ❌ Pendiente | Solo schema Prisma |
| **Interviews** | ❌ Pendiente | Solo schema Prisma |
| **Company/Employee** | ❌ Pendiente | Solo schema Prisma |
| **Autenticación** | ❌ No implementado | - |
| **Testing** | ⚠️ Configurado | Jest setup, 0 tests escritos |

## Decisiones Pendientes

### Requieren Discusión con Usuario
1. **¿Implementar autenticación ahora o después?**  
   - Impacto: Si se implementa ahora, hay que refactorizar todos los endpoints
   - Decisión pendiente: Esperar a tener CRUD completo de todas las entidades

2. **¿Migrar CVs a cloud storage (S3) o mantener local?**  
   - Impacto: Escalabilidad vs. simplicidad
   - Decisión pendiente: Por ahora local, revisar en fase de producción

3. **¿Añadir validación de email único al registrar candidatos?**  
   - Impacto: Ya hay unique constraint en DB, pero podría mejorar UX con validación frontend
   - Decisión pendiente: Añadir en próxima iteración

## Contexto Histórico Reciente

### Última sesión (2026-01-05 ~07:00-08:00)
- Se resolvieron errores de Prisma migration
- Se configuró correctamente el seeding de la base de datos
- Se verificó que el flujo completo de creación de candidatos funciona

### Sesión anterior (timestamp desconocido)
- Configuración inicial del proyecto
- Setup de Docker con PostgreSQL
- Creación del schema Prisma completo

## Flags y Estados de Feature

```javascript
// Feature flags conceptuales (no implementados en código aún)
const FEATURES = {
  CANDIDATE_CRUD: true,           // ✅ Activo
  POSITION_MANAGEMENT: false,     // 🚧 En desarrollo
  APPLICATION_FLOW: false,        // ❌ No iniciado
  INTERVIEW_SCHEDULING: false,    // ❌ No iniciado
  AUTHENTICATION: false,          // ❌ No iniciado
  EMAIL_NOTIFICATIONS: false,     // ❌ No iniciado
};
```

## Comandos de Desarrollo Activos

```bash
# Estos comandos están corriendo AHORA MISMO (ver ADDITIONAL_METADATA)
# Terminal 1:
cd frontend
npm run start  # Running for 39m18s

# Terminal 2:
cd backend
npm run dev    # Running for 37m46s (duplicado accidentalmente?)

# Terminal 3:
cd backend
npm run dev    # Running for 37m40s
```

**⚠️ NOTA:** Parece haber dos instancias de `npm run dev` en el backend. Verificar si es intencional o error.

## Próxima Revisión de activeContext.md

**Cuándo actualizar:**
- Al finalizar la tarea de inicialización del Memory Bank
- Al iniciar trabajo en Positions o Applications
- Cuando se agregue/complete un módulo mayor
- Si cambia el estado de "bloqueos" (aparece un bug crítico, etc.)

**Quién actualiza:**
- Cualquier agente que complete una tarea marcada en "Lista de Tareas Inmediatas"
- El agente arquitecto al finalizar planning de una nueva feature
