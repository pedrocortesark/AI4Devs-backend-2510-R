# REGISTRO DE PROMPTS UTILIZADOS
**Autor**: Pedro Cortés
**Proyecto**: LTI - Talent Tracking System (AI4Devs Backend)
**Descripción**: Bitácora de prompts para trazabilidad del proyecto multi-agente.
---

## 001 - Inicialización del Memory Bank y Protocolo Multi-Agente
**Fecha:** 2026-01-05 09:00
**Prompt Original:**
# Contexto / Rol
Eres una instancia experta de **Gemini 3** operando como "Agente Arquitecto" dentro de **Google Antigravity**.
Debido a la naturaleza asíncrona y multi-agente de este IDE, tu responsabilidad es crear y mantener un **"Banco de Memoria" (Memory Bank)** o Estado Compartido. Esto asegura que si un agente edita el frontend y otro los tests, ambos compartan el mismo contexto sin interferir entre sí.

# Objetivo
Generar la estructura de archivos de documentación y las **Reglas de Agente (.agent/rules)** para obligar a cualquier instancia de Gemini a leer el contexto antes de trabajar.

## 0. Prerrequisito: Inicialización de Protocolo (AGENTS.md)
**CRÍTICO: ANTES DE REALIZAR CUALQUIER OTRA OPERACIÓN O ESCANEO.**
1.  Busca y lee atentamente el archivo `AGENTS.md`.
2.  Inicializa y adopta estrictamente el protocolo que allí se explica.
3.  Solo procede con la creación del Memory Bank (pasos siguientes) una vez que hayas asimilado dicho protocolo maestro.

## 1. Estructura de Archivos a Generar
Analiza el repositorio (`@workspace`) y genera el contenido para estos archivos. Si no puedes crearlos directamente, dame el código Markdown de cada uno:

/memory-bank/
  projectbrief.md      (Visión general del proyecto y resumen ejecutivo)
  productContext.md    (Contexto de negocio, usuarios y casos de uso)
  systemPatterns.md    (Arquitectura, diseño técnico y patrones)
  techContext.md       (Stack tecnológico, herramientas y comandos)
  activeContext.md     (El estado actual "en vivo" del desarrollo)
  progress.md          (Historial de cambios, hitos y deuda técnica)

/.agent/rules/
  00-memory-bank.md    (Regla maestra de lectura obligatoria)

## 2. Definición del Contenido (Archivos Core)

### `memory-bank/projectbrief.md`
- Resumen ejecutivo.
- Objetivos clave del proyecto.

### `memory-bank/activeContext.md`
- **Crítico:** Este archivo actúa como un semáforo.
- Debe contener: "¿En qué estamos trabajando AHORA MISMO?"
- Lista de tareas activas.
- Próximos pasos inmediatos.

### `memory-bank/systemPatterns.md`
- Arquitectura del sistema.
- Mapa de carpetas clave.
- Relaciones entre módulos (quién depende de quién).

## 3. Configuración de la Regla (.agent/rules)

Genera el archivo **`.agent/rules/00-memory-bank.md`** con el siguiente contenido EXACTO. Esto es lo que forzará a los agentes a comportarse correctamente:

"""markdown
---
description: "Flujo de Trabajo Obligatorio del Banco de Memoria"
globs: ["**/*"]
alwaysApply: true
priority: critical
---

# MANDATO DEL AGENTE: Acceso a Memoria Compartida

Estás trabajando en un entorno multi-agente (Antigravity). Debes confiar en el "Memory Bank" como la única fuente de la verdad.

## 1. Carga de Contexto (LEER PRIMERO)
Antes de planificar o ejecutar CUALQUIER tarea, DEBES leer:
- `memory-bank/activeContext.md` -> Para entender el enfoque actual.
- `memory-bank/systemPatterns.md` -> Para respetar la arquitectura.
- `memory-bank/techContext.md` -> Para usar las herramientas/comandos correctos.

## 2. Actualizaciones Atómicas (ESCRIBIR AL FINALIZAR)
Después de completar una tarea:
1.  **Actualizar** `memory-bank/activeContext.md`: Elimina tu tarea finalizada, añade el resultado.
2.  **Actualizar** `memory-bank/progress.md`: Marca las funcionalidades como completadas.
3.  **Autocorrección**: Si encuentras que `projectbrief.md` o `systemPatterns.md` están desactualizados, actualízalos inmediatamente.

## 3. Acciones Prohibidas
- No inventes comandos que no aparezcan en `techContext.md`.
- No modifiques la arquitectura central sin actualizar primero `systemPatterns.md`.
"""

## 4. Procedimiento de Inicialización
1.  **Ejecuta la lectura de `AGENTS.md` e inicia el protocolo (Paso 0).**
2.  Ejecuta un escaneo profundo del repositorio actual.
3.  Redacta el contenido de todos los archivos de `/memory-bank/` basándote en el código existente.
4.  Crea la carpeta `.agent/rules/` y el archivo de reglas con el contenido especificado arriba.
5.  Confírmame cuando el "Cerebro del Proyecto" esté activo y listo para usar.

**Resumen de la Respuesta/Acción:**
Inicialización del protocolo AGENTS.md, escaneo profundo del repositorio y generación completa del Memory Bank con 6 archivos core + regla maestra de agente (.agent/rules/00-memory-bank.md).
---
