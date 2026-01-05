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

## 002 - Implementación Endpoints Kanban (Backend)
**Fecha:** 2026-01-05 09:42
**Prompt Original:**
# Contexto / Rol
Eres una instancia experta de **Gemini 3** operando como "Agente Arquitecto" en **Google Antigravity**.
Tu responsabilidad es orquestar el desarrollo de funcionalidades complejas manteniendo la integridad del **"Banco de Memoria" (Memory Bank)** y el registro de actividad.

# Misión: Funcionalidad Kanban (Backend)
Debemos implementar el backend para una interfaz tipo Kanban. El ejercicio consiste en crear dos endpoints específicos:

1.  **GET `/positions/:id/candidates`**
    * Objetivo: Listar candidatos en proceso para una `positionID`.
    * Datos requeridos:
        * Nombre completo (tabla `candidate`).
        * `current_interview_step` (tabla `application`).
        * **Puntuación media**: Calcular el promedio de los `score` de todas las entrevistas (`interview`) asociadas al candidato.

2.  **PUT `/candidates/:id/stage`**
    * Objetivo: Mover la tarjeta del Kanban.
    * Acción: Actualizar la fase actual (`current_interview_step`) en la tabla `application` para un candidato específico.

# Instrucciones de Ejecución

## 0. Prerrequisito: Protocolo (AGENTS.md)
**CRÍTICO: ANTES DE NADA.**
1.  Lee el archivo `AGENTS.md`.
2.  Inicializa el protocolo descrito en él.

## 1. Registro de Actividad (Prompts Log)
Antes de planificar, actualiza el archivo `prompts-log.md` (o créalo si no existe):
- Registra esta nueva solicitud como "Implementación Endpoints Kanban".
- Añade la fecha/hora actual y un breve resumen de los requisitos.

## 2. Planificación en Memory Bank
Analiza el esquema de base de datos actual y el código existente. Luego, **ACTUALIZA** los siguientes archivos (no los sobrescribas, edítalos):

* **`memory-bank/projectbrief.md`**: Añade este ejercicio a los objetivos actuales.
* **`memory-bank/systemPatterns.md`**: Define la firma de los nuevos endpoints y la lógica de datos necesaria (especialmente el cálculo del promedio de scores).
* **`memory-bank/progress.md`**: Crea una nueva sección "Kanban Backend". Desglosa el trabajo en pasos atómicos y verificables.
    * *Ejemplo:* "Query SQL promedio scores", "Endpoint GET", "Endpoint PUT", "Validaciones", "Tests de integración".
* **`memory-bank/activeContext.md`**:
    * Actualiza el foco actual: "Planificación Endpoints Kanban".
    * Define el primer paso técnico a realizar.

# Salida Esperada
1.  Confirmación de lectura de `AGENTS.md`.
2.  Muestra el contenido que has añadido a `prompts-log.md`.
3.  **Preséntame el Plan Granular (Roadmap)** que has diseñado en `progress.md`.

**IMPORTANTE:** No escribas el código de los controladores todavía. Espera a que apruebe el plan.

**Resumen de la Respuesta/Acción:**
Análisis del schema Prisma, actualización del Memory Bank con planificación detallada de endpoints Kanban (GET /positions/:id/candidates con cálculo de score promedio, PUT /candidates/:id/stage), y presentación del roadmap granular para aprobación.
---
