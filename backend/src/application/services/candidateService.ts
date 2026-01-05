import { Candidate } from '../../domain/models/Candidate';
import { validateCandidateData } from '../validator';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';
import { Resume } from '../../domain/models/Resume';

export const addCandidate = async (candidateData: any) =>
{
    try
    {
        validateCandidateData(candidateData); // Validar los datos del candidato
    } catch (error: any)
    {
        throw new Error(error);
    }

    const candidate = new Candidate(candidateData); // Crear una instancia del modelo Candidate
    try
    {
        const savedCandidate = await candidate.save(); // Guardar el candidato en la base de datos
        const candidateId = savedCandidate.id; // Obtener el ID del candidato guardado

        // Guardar la educación del candidato
        if (candidateData.educations)
        {
            for (const education of candidateData.educations)
            {
                const educationModel = new Education(education);
                educationModel.candidateId = candidateId;
                await educationModel.save();
                candidate.education.push(educationModel);
            }
        }

        // Guardar la experiencia laboral del candidato
        if (candidateData.workExperiences)
        {
            for (const experience of candidateData.workExperiences)
            {
                const experienceModel = new WorkExperience(experience);
                experienceModel.candidateId = candidateId;
                await experienceModel.save();
                candidate.workExperience.push(experienceModel);
            }
        }

        // Guardar los archivos de CV
        if (candidateData.cv && Object.keys(candidateData.cv).length > 0)
        {
            const resumeModel = new Resume(candidateData.cv);
            resumeModel.candidateId = candidateId;
            await resumeModel.save();
            candidate.resumes.push(resumeModel);
        }
        return savedCandidate;
    } catch (error: any)
    {
        if (error.code === 'P2002')
        {
            // Unique constraint failed on the fields: (`email`)
            throw new Error('The email already exists in the database');
        } else
        {
            throw error;
        }
    }
};

export const findCandidateById = async (id: number): Promise<Candidate | null> =>
{
    try
    {
        const candidate = await Candidate.findOne(id); // Cambio aquí: pasar directamente el id
        return candidate;
    } catch (error)
    {
        console.error('Error al buscar el candidato:', error);
        throw new Error('Error al recuperar el candidato');
    }
};

// ============================================================================
// KANBAN ENDPOINTS - Funcionalidad de seguimiento de candidatos
// ============================================================================

import { PrismaClient } from '@prisma/client';

/**
 * DTO para candidatos en vista Kanban
 */
interface CandidateKanbanDTO
{
    candidateId: number;
    fullName: string;
    currentStage: string;
    averageScore: number | null;
}

// === SECCIÓN 1: Queries a Base de Datos ===

/**
 * Obtiene applications por positionId con datos relacionados
 * @param prisma - Cliente de Prisma
 * @param positionId - ID de la posición
 */
const fetchApplicationsByPosition = async (prisma: PrismaClient, positionId: number) =>
{
    return await prisma.application.findMany({
        where: { positionId },
        include: {
            candidate: true,
            interviewStep: true,
            interviews: { select: { score: true } }
        }
    });
};

/**
 * Obtiene application para actualización con validación de datos relacionados
 * @param prisma - Cliente de Prisma
 * @param candidateId - ID del candidato
 * @param positionId - ID de la posición
 */
const fetchApplicationForUpdate = async (
    prisma: PrismaClient,
    candidateId: number,
    positionId: number
) =>
{
    return await prisma.application.findFirst({
        where: { candidateId, positionId },
        include: {
            position: {
                include: {
                    interviewFlow: {
                        include: { interviewSteps: true }
                    }
                }
            }
        }
    });
};

// === SECCIÓN 2: Transformaciones y Mapeo ===

/**
 * Construye nombre completo desde entidad Candidate
 * @param candidate - Entidad Candidate
 */
const buildFullName = (candidate: { firstName: string; lastName: string }): string =>
{
    return `${candidate.firstName} ${candidate.lastName}`;
};

/**
 * Mapea applications a DTOs de Kanban
 * @param applications - Applications con datos relacionados
 */
const mapApplicationsToCandidatesDTO = (applications: any[]): CandidateKanbanDTO[] =>
{
    return applications.map(app => ({
        candidateId: app.candidate.id,
        fullName: buildFullName(app.candidate),
        currentStage: app.interviewStep.name,
        averageScore: calculateAverageScore(app.interviews)
    }));
};

// === SECCIÓN 3: Lógica de Negocio ===

/**
 * Calcula el promedio de scores de entrevistas, filtrando valores null
 * @param interviews - Array de entrevistas con campo score
 * @returns Promedio de scores o null si no hay scores válidos
 */
const calculateAverageScore = (interviews: { score: number | null }[]): number | null =>
{
    const validScoresForAverage = interviews
        .map(interview => interview.score)
        .filter((score): score is number => score !== null);

    if (validScoresForAverage.length === 0)
    {
        return null;
    }

    const sum = validScoresForAverage.reduce((accumulator, score) => accumulator + score, 0);
    return sum / validScoresForAverage.length;
};

/**
 * Valida que un interviewStepId pertenece al flujo de una posición
 * @param interviewFlow - Flujo de entrevistas con sus pasos
 * @param stepId - ID del paso a validar
 */
const validateInterviewStepBelongsToFlow = (
    interviewFlow: { interviewSteps: { id: number }[] },
    stepId: number
): boolean =>
{
    const validStepIds = interviewFlow.interviewSteps.map(step => step.id);
    return validStepIds.includes(stepId);
};

// === SECCIÓN 4: Funciones Públicas (Exported) ===

/**
 * Obtiene candidatos aplicados a una posición con su score promedio de entrevistas
 * @param prisma - Cliente de Prisma para queries
 * @param positionId - ID de la posición
 * @returns Array de candidatos con datos del Kanban (id, nombre, fase actual, score promedio)
 * @throws Error si ocurre un error en la consulta
 */
export const getCandidatesByPosition = async (
    prisma: PrismaClient,
    positionId: number
): Promise<CandidateKanbanDTO[]> =>
{
    const applications = await fetchApplicationsByPosition(prisma, positionId);
    return mapApplicationsToCandidatesDTO(applications);
};

/**
 * Actualiza la fase (interviewStep) de un candidato en una posición específica
 * @param prisma - Cliente de Prisma
 * @param candidateId - ID del candidato
 * @param positionId - ID de la posición
 * @param newInterviewStepId - ID del nuevo paso de entrevista
 * @returns Application actualizada
 * @throws Error('Application not found') si no existe la application
 * @throws Error('Invalid interviewStepId for this position') si el stepId no pertenece al flujo
 */
export const updateCandidateStage = async (
    prisma: PrismaClient,
    candidateId: number,
    positionId: number,
    newInterviewStepId: number
) =>
{
    // 1. Validación de parámetros
    if (!positionId || !newInterviewStepId)
    {
        throw new Error('Missing required parameters');
    }

    // 2. Buscar Application con datos relacionados
    const application = await fetchApplicationForUpdate(prisma, candidateId, positionId);

    if (!application)
    {
        throw new Error('Application not found');
    }

    // 3. Validar que el nuevo step pertenece al flujo de la posición
    const isValidStep = validateInterviewStepBelongsToFlow(
        application.position.interviewFlow,
        newInterviewStepId
    );

    if (!isValidStep)
    {
        throw new Error('Invalid interviewStepId for this position');
    }

    // 4. Actualizar currentInterviewStep
    return await prisma.application.update({
        where: { id: application.id },
        data: { currentInterviewStep: newInterviewStepId }
    });
};
