import axios from 'axios';
import { CandidateKanbanDTO, MoveCandidatePayload, CandidateData, UploadResponse } from '../types';

const API_URL = 'http://localhost:3010';

// ============================================================================
// KANBAN ENDPOINTS
// ============================================================================

/**
 * Obtiene la lista de candidatos para una posición específica con formato Kanban
 * @param positionId - ID de la posición
 * @returns Promesa con array de candidatos simplificados
 */
export const getCandidatesByPosition = async (positionId: number): Promise<CandidateKanbanDTO[]> =>
{
    try
    {
        const response = await axios.get<{ candidates: CandidateKanbanDTO[] }>(
            `${API_URL}/candidates/positions/${positionId}/candidates`
        );
        return response.data.candidates;
    } catch (error: any)
    {
        throw new Error('Error al obtener candidatos: ' + (error.response?.data?.message || error.message));
    }
};

/**
 * Mueve un candidato a una nueva fase del proceso
 * @param candidateId - ID del candidato a mover
 * @param payload - Datos del movimiento (positionId, newInterviewStepId)
 */
export const updateCandidateStage = async (candidateId: number, payload: MoveCandidatePayload): Promise<void> =>
{
    try
    {
        await axios.put(`${API_URL}/candidates/${candidateId}/stage`, payload);
    } catch (error: any)
    {
        throw new Error('Error al actualizar fase: ' + (error.response?.data?.message || error.message));
    }
};

// ============================================================================
// EXISTING ENDPOINTS (Migrated to TS)
// ============================================================================

export const uploadCV = async (file: File): Promise<UploadResponse> =>
{
    const formData = new FormData();
    formData.append('file', file);

    try
    {
        const response = await axios.post<UploadResponse>(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any)
    {
        throw new Error('Error al subir el archivo: ' + (error.response?.data || error.message));
    }
};

export const sendCandidateData = async (candidateData: CandidateData): Promise<any> =>
{
    try
    {
        const response = await axios.post(`${API_URL}/candidates`, candidateData);
        return response.data;
    } catch (error: any)
    {
        throw new Error('Error al enviar datos del candidato: ' + (error.response?.data || error.message));
    }
};
