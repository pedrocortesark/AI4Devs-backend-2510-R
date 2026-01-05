# Product Context - LTI Talent Tracking System

## Contexto de Negocio

El sistema LTI nace como una solución para empresas que necesitan **profesionalizar su proceso de reclutamiento** y mantener una trazabilidad completa del ciclo de vida de candidatos desde la primera aplicación hasta la contratación (o rechazo).

### Problema que Resuelve
- **Dispersión de información**: CVs en email, notas en Excel, feedback oral
- **Falta de trazabilidad**: No se sabe en qué fase está cada candidato
- **Coordinación ineficiente**: Múltiples entrevistadores sin sistema centralizado
- **Experiencia del candidato**: Falta de feedback y seguimiento

## Usuarios y Personas

### 1. HR Manager (Usuario Principal)
**Necesita:**
- Publicar posiciones y definir flujos de entrevistas
- Ver dashboard de estado de todas las aplicaciones activas
- Asignar entrevistadores a cada fase
- Generar reportes de métricas de reclutamiento

**Pain Points:**
- Perder candidatos buenos por procesos lentos
- No saber quién está esperando feedback
- Duplicar candidatos en el sistema

### 2. Recruiter (Usuario Secundario)
**Necesita:**
- Registrar nuevos candidatos rápidamente
- Adjuntar CVs y notas
- Mover candidatos entre fases del proceso
- Contactar candidatos (necesita acceso rápido a email/teléfono)

**Pain Points:**
- Formularios largos que ralentizan el registro
- Perder archivos adjuntos (CVs)

### 3. Interviewer (Usuario Terciario)
**Necesita:**
- Ver perfil completo del candidato antes de la entrevista
- Completar formularios de feedback post-entrevista
- Consultar historial de entrevistas previas

**Pain Points:**
- Llegar a entrevistas sin contexto del candidato
- No saber qué ya se evaluó en fases anteriores

## Casos de Uso Principales

### CU-01: Registrar Nuevo Candidato
**Actor:** Recruiter  
**Flujo:**
1. Accede a formulario de candidatos
2. Completa datos personales (firstName, lastName, email, phone, address)
3. Añade educación (puede ser múltiple)
4. Añade experiencia laboral (puede ser múltiple)
5. Adjunta CV (archivo PDF)
6. Guarda candidato

**Estado Actual:** ✅ Implementado (frontend + backend)

### CU-02: Aplicar Candidato a Posición
**Actor:** Recruiter  
**Flujo:**
1. Busca candidato existente (o crea uno nuevo)
2. Busca posición abierta
3. Crea Application vinculando candidato + posición
4. Sistema asigna automáticamente al InterviewStep inicial del flujo de la posición

**Estado Actual:** 🚧 Parcial (schema existe, sin UI)

### CU-03: Programar Entrevista
**Actor:** HR Manager  
**Flujo:**
1. Selecciona una Application activa
2. Asigna Employee (interviewer) disponible
3. Define fecha/hora de la entrevista
4. Sistema crea Interview vinculada al InterviewStep actual
5. (Futuro) Envía notificación al entrevistador y candidato

**Estado Actual:** ❌ No implementado

### CU-04: Registrar Resultado de Entrevista
**Actor:** Interviewer  
**Flujo:**
1. Accede a Interview asignada
2. Completa formulario de feedback (result, score, notes)
3. Guarda resultado
4. Sistema evalúa si candidato avanza al siguiente InterviewStep o se rechaza

**Estado Actual:** ❌ No implementado

### CU-05: Consultar Estado de Candidato
**Actor:** HR Manager / Recruiter  
**Flujo:**
1. Busca candidato por nombre o email
2. Ve lista de Applications del candidato
3. Para cada Application, ve:
   - Posición aplicada
   - Fase actual del proceso (currentInterviewStep)
   - Historial de entrevistas realizadas
   - Notas acumuladas

**Estado Actual:** ✅ Backend completo para Vista Kanban (Endpoints listos). Frontend pendiente.

## Flujo de Datos Crítico

```
Candidate (creación manual o importación)
    ↓
Application (vincula Candidate + Position)
    ↓
InterviewStep (fase actual dentro del InterviewFlow de la Position) -> ✅ MOVILE via Endpoint Kanban
    ↓
Interview (evento concreto: fecha, interviewer, resultado)
    ↓
Decision: ¿Avanzar al siguiente Step o Rechazar?
```


## Dependencias Externas (Futuras)
- **Email Service**: Para notificaciones (SendGrid, AWS SES)
- **Storage Service**: Para CVs en cloud (AWS S3, Azure Blob)
- **Calendar Integration**: Para scheduling automático (Google Calendar API)

## Métricas de Éxito
- **Time-to-hire**: Días desde Application hasta contratación
- **Conversion Rate**: % de candidatos que pasan de cada fase a la siguiente
- **Interviewer Utilization**: Entrevistas realizadas por empleado/mes
- **Candidate Pipeline**: Número de candidatos activos por posición
