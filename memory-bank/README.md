# Memory Bank - Índice y Guía de Uso

> **Sistema de Memoria Compartida para Colaboración Multi-Agente**  
> **Versión:** 1.0 | **Created:** 2026-01-05

## 📚 Estructura del Memory Bank

```
memory-bank/
├── README.md                          [ESTE ARCHIVO - Índice]
├── projectbrief.md                    [Visión y objetivos]
├── productContext.md                  [Contexto de negocio y usuarios]
├── systemPatterns.md                  [Arquitectura y diseño]
├── techContext.md                     [Stack y comandos]
├── activeContext.md                   [Estado EN VIVO]
├── progress.md                        [Historial y deuda técnica]
└── agent-rules-00-memory-bank.md      [Reglas para agentes]
```

## 🎯 Propósito

El Memory Bank actúa como **estado compartido** entre múltiples instancias de agentes AI trabajando en paralelo en Antigravity. Esto previene:

- ❌ Duplicación de trabajo
- ❌ Conflictos de código
- ❌ Pérdida de contexto
- ❌ Decisiones técnicas contradictorias

## 📖 Guía de Lectura Rápida

### Para Agentes AI (Lectura Obligatoria)
1. **`activeContext.md`** → ¿Qué está pasando AHORA?
2. **`systemPatterns.md`** → ¿Cómo está organizado el código?
3. **`techContext.md`** → ¿Qué comandos usar?
4. **`agent-rules-00-memory-bank.md`** → Protocolo obligatorio

### Para Desarrolladores Humanos
1. **`projectbrief.md`** → Entender el proyecto
2. **`productContext.md`** → Conocer usuarios y casos de uso
3. **`progress.md`** → Ver qué se ha hecho y qué falta
4. **`techContext.md`** → Comandos y configuración

## 🔄 Flujo de Trabajo con Memory Bank

### Antes de Trabajar
```bash
# 1. Lee el contexto activo
cat memory-bank/activeContext.md

# 2. Verifica arquitectura
cat memory-bank/systemPatterns.md

# 3. Consulta comandos
cat memory-bank/techContext.md
```

### Durante el Trabajo
- Sigue el protocolo en `agent-rules-00-memory-bank.md`
- Registra prompts en `prompts-log.md` (raíz del proyecto)

### Después de Completar
1. Actualiza `activeContext.md` (marca tarea como completada)
2. Actualiza `progress.md` (si fue un hito mayor)
3. Actualiza otros archivos si cambiaste arquitectura/stack

## 📝 Descripción de Cada Archivo

### [projectbrief.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/projectbrief.md)
**Resumen ejecutivo del proyecto**
- Objetivos clave
- Alcance del MVP
- Restricciones y decisiones técnicas
- Próximos hitos

**Actualizar cuando:** Cambie el alcance o los objetivos del proyecto.

---

### [productContext.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/productContext.md)
**Contexto de negocio y usuarios**
- Problema que resuelve el sistema
- Personas (HR Manager, Recruiter, Interviewer)
- Casos de uso principales
- Flujo de datos crítico

**Actualizar cuando:** Cambien los requisitos de usuario o casos de uso.

---

### [systemPatterns.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/systemPatterns.md)
**Arquitectura y patrones de diseño**
- Visión de alto nivel (frontend ↔ backend ↔ DB)
- Clean Architecture (Domain, Application, Infrastructure, Presentation)
- Modelo de datos Prisma (relaciones entre entidades)
- Dependencias entre módulos
- Mapeo de carpetas clave

**Actualizar cuando:** Cambies la arquitectura, añadas módulos, o modifiques relaciones.

---

### [techContext.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/techContext.md)
**Stack tecnológico y comandos**
- Tabla completa de dependencias (backend + frontend)
- Comandos críticos (dev, build, test, prisma)
- Configuración de entornos (.env, docker-compose)
- Endpoints API actual
- Troubleshooting común

**Actualizar cuando:** Añadas dependencias, cambies comandos, o modifiques configuración.

---

### [activeContext.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/activeContext.md) ⚡
**Estado EN VIVO del desarrollo**
- Tarea activa en este momento
- Bloqueos actuales
- Lista de tareas inmediatas
- Estado de módulos (tabla de completitud)
- Decisiones pendientes

**Actualizar cuando:** Completes una tarea o inicies una nueva (SIEMPRE).

---

### [progress.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/progress.md)
**Historial y deuda técnica**
- Hitos completados (cronología)
- Deuda técnica (🔴 Crítica, 🟡 Moderada, 🟢 Baja)
- Funcionalidades pendientes (roadmap)
- Decisiones técnicas registradas
- Métricas de cobertura

**Actualizar cuando:** Completes un sprint, añadas deuda técnica, o tomes decisiones.

---

### [agent-rules-00-memory-bank.md](file:///c:/Users/pedro.cortes/source/ai4devs/09-backend/memory-bank/agent-rules-00-memory-bank.md)
**Reglas obligatorias para agentes AI**
- Protocolo de lectura antes de trabajar
- Protocolo de actualización después de trabajar
- Acciones prohibidas
- Verificación de integridad

**Actualizar cuando:** Cambien las reglas de colaboración multi-agente.

---

## ⚠️ Nota Importante sobre `.agent/rules/`

La carpeta `.agent/rules/` está protegida por Antigravity y no permite escritura directa. 

**Solución alternativa:**
- Las reglas del agente se han creado en `memory-bank/agent-rules-00-memory-bank.md`
- Los agentes deben leer este archivo manualmente antes de trabajar
- Alternativamente, el usuario puede copiar manualmente el contenido a `.agent/rules/00-memory-bank.md`

## 🚀 Inicialización Completada

✅ **Memory Bank está activo y listo para usar.**

### Archivos Creados
- [x] `prompts-log.md` (raíz del proyecto)
- [x] `memory-bank/projectbrief.md`
- [x] `memory-bank/productContext.md`
- [x] `memory-bank/systemPatterns.md`
- [x] `memory-bank/techContext.md`
- [x] `memory-bank/activeContext.md`
- [x] `memory-bank/progress.md`
- [x] `memory-bank/agent-rules-00-memory-bank.md`
- [x] `memory-bank/README.md` (este archivo)

### Próximos Pasos
1. Revisar contenido de cada archivo
2. Corregir cualquier imprecisión detectada
3. Comenzar a usar el Memory Bank en el desarrollo diario
4. Opcionalmente: Copiar `agent-rules-00-memory-bank.md` a `.agent/rules/` manualmente

---

**Creado por:** Agente Arquitecto (Gemini 3)  
**Fecha:** 2026-01-05 09:00 CET  
**Versión del Protocolo:** 1.0
