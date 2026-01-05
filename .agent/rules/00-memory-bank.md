---
description: "Flujo de Trabajo Obligatorio del Banco de Memoria"
globs: ["**/*"]
alwaysApply: true
priority: critical
---

# MANDATO DEL AGENTE: Acceso a Memoria Compartida

Estás trabajando en un entorno **multi-agente (Antigravity)**. Debes confiar en el **"Memory Bank"** como la única fuente de la verdad.

## 1. Carga de Contexto (LEER PRIMERO)

Antes de planificar o ejecutar CUALQUIER tarea, DEBES leer:

1. **`memory-bank/activeContext.md`** → Para entender el enfoque actual y tareas en progreso
2. **`memory-bank/systemPatterns.md`** → Para respetar la arquitectura y relaciones entre módulos
3. **`memory-bank/techContext.md`** → Para usar las herramientas/comandos correctos

## 2. Actualizaciones Atómicas (ESCRIBIR AL FINALIZAR)

Después de completar una tarea:

### A. Actualizar `activeContext.md`
- Elimina tu tarea de "Lista de Tareas Inmediatas"
- Añade el resultado en "Estado de Módulos"
- Actualiza "¿En qué estamos trabajando AHORA MISMO?" si cambió el enfoque

### B. Actualizar `progress.md`
- Marca funcionalidades como completadas en "Hitos Completados"
- Añade nueva deuda técnica si la introduces
- Actualiza métricas de cobertura

### C. Autocorrección de Documentos
Si encuentras que otros archivos del Memory Bank están **desactualizados**, actualízalos inmediatamente.

## 3. Acciones Prohibidas

### ❌ NO hagas esto:

1. **No inventes comandos** que no aparezcan en `techContext.md`
2. **No modifiques la arquitectura central** sin actualizar primero `systemPatterns.md`
3. **No ejecutes código sin plan aprobado** (ver AGENTS.md sección 2)
4. **No uses librerías no instaladas** - Verifica `techContext.md` primero

## 4. Protocolo Obligatorio

```
Usuario solicita tarea
    ↓
1. Lee AGENTS.md (protocolo maestro)
    ↓
2. Lee activeContext.md (¿Qué está pasando AHORA?)
    ↓
3. Lee systemPatterns.md (¿Cómo está organizado?)
    ↓
4. Lee techContext.md (¿Qué herramientas usar?)
    ↓
5. Registra en prompts-log.md
    ↓
6. Crea plan y pregunta "¿Procedo?"
    ↓
7. EJECUTA tras aprobación
    ↓
8. Actualiza Memory Bank
```

## 5. Verificación de Integridad

Antes de marcar tarea como completa:

- [ ] ¿Leí activeContext.md antes de empezar?
- [ ] ¿Registré el prompt en prompts-log.md?
- [ ] ¿Actualicé activeContext.md tras completar?
- [ ] ¿Actualicé progress.md si fue un hito mayor?
- [ ] ¿Actualicé systemPatterns.md si cambié arquitectura?
- [ ] ¿Actualicé techContext.md si añadí dependencias?

> **Regla de Oro:** El código es volátil, el Memory Bank es permanente.

**Versión:** 1.0 | **Fecha:** 2026-01-05
