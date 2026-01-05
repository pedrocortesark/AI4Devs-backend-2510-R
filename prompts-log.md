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

## 003 - Ajuste de Arquitectura: Simplificación
**Fecha:** 2026-01-05 09:42
**Prompt Original:**
# Ajuste de Arquitectura: Simplificación y Reutilización

He revisado tu propuesta inicial de crear nuevos archivos (`applicationService.ts`, `positionRoutes.ts`), pero vamos a **rechazar esa aproximación** en favor de una solución más simple y contenida.

## Directriz de Simplicidad
**Regla de Oro:** En caso de duda, SIEMPRE prioriza extender los archivos existentes antes que crear nuevos módulos. Queremos completar el ejercicio con la mínima fricción estructural posible.

## Instrucciones Técnicas Específicas
Reestructura tu plan utilizando EXCLUSIVAMENTE los siguientes archivos ya existentes en el repositorio:

1.  **`src/services/candidateService.ts`**
    * Aquí debes implementar la lógica para buscar candidatos por `positionId` (incluyendo el cálculo del score medio).
    * Aquí debes implementar la lógica para actualizar el `stage` del candidato.
    * **NO** crees `applicationService.ts`.

2.  **`src/routes/candidateRoutes.ts`**
    * Aquí definirás el endpoint `GET /positions/:id/candidates`. Aunque la URL empiece por "positions", al devolver candidatos, lo gestionaremos en este router.
    * Aquí definirás el endpoint `PUT /candidates/:id/stage`.
    * **NO** crees `positionRoutes.ts`.

## Acción Requerida
1.  **Corrige `memory-bank/systemPatterns.md`**: Actualiza la arquitectura para reflejar que modificaremos `candidateService` y `candidateRoutes` en lugar de expandir el sistema de archivos.
2.  **Corrige `memory-bank/progress.md`**: Ajusta los pasos del plan para que apunten a la edición de estos archivos específicos.
3.  **Confirma**: Muéstrame el plan actualizado confirmando que has entendido que **no se crearán archivos nuevos**.

**Resumen de la Respuesta/Acción:**
Reestructuración del plan para usar exclusivamente archivos existentes. Actualización de `progress.md` y `systemPatterns.md` para reflejar la extensión de servicios en lugar de creación de nuevos módulos.

---

## 004 - Directriz de Calidad: SOLID y DRY
**Fecha:** 2026-01-05 10:06
**Prompt Original:**
# Directriz de Calidad: Principios SOLID y DRY en Arquitectura Existente

Aunque hemos decidido centralizar la lógica en `candidateService.ts` y `candidateRoutes.ts`, esto **NO** es excusa para escribir "Spaghetti Code" o funciones monolíticas.

## 1. Estándar de Referencia (Lectura Obligatoria)
Para alinear el estilo de código con las expectativas del equipo, revisa y aplica los conceptos detallados en este documento de referencia:
> [Buenas Prácticas Aplicadas con AI (LIDR)](https://training.lidr.co/posts/ai4devs-202510-rookies-%F0%9F%93%84-buenas-practicas-aplicadas-con-ai-caso-lti-%F0%9F%94%B4-33-min)

## 2. Requisitos Técnicos de Implementación
Al modificar los archivos existentes, debes aplicar estrictamente:

* **Principio de Responsabilidad Única (SRP):** Aunque el código viva en `candidateService.ts`, cada método debe hacer una sola cosa. Si el cálculo del promedio de scores es complejo, extráelo a una función privada o un helper dentro del mismo archivo, no lo mezcles con la lógica de base de datos.
* **DRY (Don't Repeat Yourself):** Si ya existe lógica de consulta o mapeo de candidatos, reutilízala. No dupliques consultas SQL si puedes parametrizar una existente.
* **Legibilidad:** El código debe ser auto-explicativo. Nombres de variables semánticos y tipado estricto en TypeScript.

## 3. Actualización del Memory Bank
Antes de codificar:
1.  Actualiza **`memory-bank/systemPatterns.md`**: Añade una sección de "Coding Standards" citando explícitamente el cumplimiento de SOLID/DRY y el documento proporcionado.
2.  Actualiza **`memory-bank/progress.md`**: Asegúrate de que en la fase de implementación haya un paso de "Refactorización/Limpieza" para garantizar que no estamos introduciendo deuda técnica al añadir estas nuevas funciones.

Confírmame que has integrado estas directrices de calidad en el plan.
**Resumen de la Respuesta/Acción:**
Actualización de `systemPatterns.md` con guía detallada de Coding Standards (SRP, DRY, Separation of Concerns). Inclusión de fase de refactorización en `progress.md`. Implementación de endpoints siguiendo estos estándares en `candidateService.ts`.

---
## 005 - Integración Frontend (Senior Frontend Engineer)
**Fecha:** 2026-01-05 10:30
**Prompt Original:**
# Ejecución: Integración Frontend (Expert Engineer)

Hemos completado el backend. Ahora asume el rol de un **Senior Frontend Engineer**.
Tu objetivo es conectar la nueva lógica de negocio a la interfaz de usuario, garantizando que el código sea limpio, mantenible y respete la arquitectura existente.

Naturalmente, debes seguir el protocolo que encuentras en `AGENTS.md` para mantener actualizado el memory bank y el archivo `prompts-log.md`

## 1. Actualización del Estado (Memory Bank)
Antes de tocar el código:
1.  **`memory-bank/progress.md`**: Marca la fase de Backend (Rutas) como **[x] Completada**.
2.  **`memory-bank/activeContext.md`**:
    * Cambia el foco a: "Integración Frontend: Servicios y Tipado".
    * Objetivo inmediato: Reflejar los nuevos datos en la UI tipo Kanban.

## 2. Análisis y Estrategia (SOLID & DRY)
Analiza la estructura actual del frontend.
 Identifica los archivos exactos que necesitan modificaciones. **NO crees archivos nuevos si puedes extender lógicamente los existentes.**

Debes proponer cambios para:
1.  **Interfaces/Tipos:** Actualizar la definición de `Candidate` (o equivalente) para incluir `current_interview_step` y `average_score`.
2.  **Capa de Servicio (API):** Añadir los métodos para consumir:
    * `GET /positions/:id/candidates`
    * `PUT /candidates/:id/stage`
    * *Constraint DRY:* Reutiliza el cliente HTTP existente (axios, fetch wrapper, etc.). No escribas llamadas `fetch` crudas si ya hay un patrón establecido.
3.  **Componentes UI:** Identifica qué componente renderiza el tablero o la lista de candidatos y explica cómo inyectarás los nuevos datos.

## 3. Instrucciones de Entrega
1.  Enumera los archivos existentes que vas a modificar.
2.  Explica brevemente la estrategia para aplicar **SOLID** en el frontend (ej: separar la lógica de llamada a la API de la lógica de renderizado del componente).
3.  **Genera el código propuesto** para los tipos y la capa de servicio (API) primero.
4.  **DETENTE**. Espera mi aprobación antes de pasar a modificar los componentes visuales

**Resumen de la Respuesta/Acción:**
Análisis de arquitectura frontend existente, actualización del Memory Bank (progress.md y activeContext.md), y propuesta de implementación para integración Kanban siguiendo principios SOLID y DRY. Incluye actualización de tipos TypeScript y servicios de API, con plan pendiente de aprobación antes de modificar componentes visuales.
---

## 006 - Implementación Componentes Visuales Kanban
**Fecha:** 2026-01-05 11:00
**Prompt Original:**
Acompaño las respuestas a preguntas solicitadas para confirmar el plan propuesto y comenzar su desarrollo. 
1. Extender RecruiterDashboard.js
2. Comienza generando botones simples para mover entre fases.
3. Comienza con hardcoded
Naturalmente, continua con el protocolo AGENTS.md añadiendo este prompt y manteniendo actualizado el memory bank.

**Resumen de la Respuesta/Acción:**
Implementación de componentes visuales para el tablero Kanban. Conversión de RecruiterDashboard.js a TypeScript, integración de getCandidatesByPosition() y updateCandidateStage(), implementación de columnas por fase con botones de movimiento. Configuración de routing en App.tsx.
---
