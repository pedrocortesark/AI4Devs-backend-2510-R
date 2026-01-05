# Project Brief - LTI Talent Tracking System

## Resumen Ejecutivo

**LTI (Learning Tech Innovation) Talent Tracking System** es una aplicación full-stack diseñada para gestionar el proceso completo de reclutamiento y seguimiento de candidatos. El sistema permite a las empresas publicar posiciones, gestionar candidatos, y realizar seguimiento de todo el flujo de entrevistas desde la aplicación inicial hasta la contratación final.

## Objetivos Clave del Proyecto

### 1. Gestión Integral de Candidatos
- **CRUD completo** de candidatos con información personal, educación y experiencia laboral
- **Gestión de CVs** mediante sistema de uploads seguro
- **Perfil enriquecido** que incluye Education y WorkExperience

### 2. Sistema de Tracking de Aplicaciones
- **Flujo de entrevistas configurables** (Interview Flows) por posición
- **Múltiples tipos de entrevistas** (técnica, cultural, gerencial, etc.)
- **Seguimiento de estado** de candidatos a través del proceso
- **Asignación de entrevistadores** (Employees) a cada fase

### 3. Multi-Tenancy Empresarial
- **Gestión de múltiples compañías** en el mismo sistema
- **Aislamiento de datos** por empresa
- **Roles diferenciados** (Admin, Recruiter, Interviewer)

### 4. Arquitectura Escalable
- **Clean Architecture** con separación de capas (Domain, Application, Infrastructure, Presentation)
- **API REST** documentada con OpenAPI/Swagger
- **Base de datos relacional** con Prisma ORM
- **Frontend SPA** con React + TypeScript

### 5. Vista Kanban de Candidatos (NUEVO - 2026-01-05)
- **Seguimiento visual** del pipeline de candidatos por posición
- **Cálculo automático** de score promedio basado en entrevistas
- **Movimiento drag-and-drop** entre fases del proceso (backend listo)

## Alcance Actual (MVP)

### ✅ Funcionalidades Implementadas
- [x] CRUD de Candidatos (frontend + backend)
- [x] Gestión de Education y WorkExperience
- [x] Upload de archivos (CVs)
- [x] Base de datos PostgreSQL con Docker
- [x] Schema Prisma completo con todas las entidades
- [x] API REST con validación de datos
- [x] Frontend React con formularios
- [x] Sistema de rutas Express

### 🚧 Funcionalidades En Desarrollo
- [/] **Endpoints Kanban** (backend en planificación):
  - GET `/positions/:id/candidates` - Listar candidatos con score promedio
  - PUT `/candidates/:id/stage` - Mover candidato entre fases

### 📋 Funcionalidades Pendientes

- [ ] Interfaz completa para Positions
- [ ] Gestión del ciclo de Applications
- [ ] Sistema de Interview Scheduling
- [ ] Dashboard de analíticas
- [ ] Autenticación y autorización
- [ ] Testing completo (Jest configurado pero no implementado)

## Restricciones y Decisiones Técnicas

1. **Sin Autenticación en MVP**: El sistema actualmente no implementa auth; se asume en fase de desarrollo
2. **CORS Abierto para localhost:3000**: Configuración específica para desarrollo
3. **Puerto Backend**: 3010 (para evitar conflictos con frontend en 3000)
4. **Puerto PostgreSQL**: 5433 (no estándar 5432, revisar docker-compose.yml)
5. **TypeScript estricto**: Versión 4.9.5 en ambos proyectos

## Stack Tecnológico (ver techContext.md para detalles)
- **Backend**: Node.js + Express + TypeScript + Prisma
- **Frontend**: React 18 + TypeScript + Bootstrap 5
- **Base de Datos**: PostgreSQL 
- **Infraestructura**: Docker Compose
- **Testing**: Jest + ts-jest

## Próximos Hitos
1. Implementar sistema de Applications y flujo de entrevistas
2. Crear UI para gestión de Positions
3. Desarrollar dashboard de estado de candidatos
4. Implementar autenticación con JWT
5. Completar suite de tests E2E
