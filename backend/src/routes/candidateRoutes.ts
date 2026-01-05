import { Router } from 'express';
import { addCandidate, getCandidateById } from '../presentation/controllers/candidateController';
import { getCandidatesByPosition, updateCandidateStage } from '../application/services/candidateService';

const router = Router();

router.post('/', async (req, res) =>
{
  try
  {
    // console.log(req.body); //Just in case you want to inspect the request body
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error)
  {
    if (error instanceof Error)
    {
      res.status(400).send({ message: error.message });
    } else
    {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

router.get('/:id', getCandidateById);

// ============================================================================
// KANBAN ENDPOINTS
// ============================================================================

/**
 * GET /positions/:id/candidates
 * Lista candidatos aplicados a una posición con score promedio de entrevistas
 */
router.get('/positions/:id/candidates', async (req, res) =>
{
  const positionId = parseInt(req.params.id);

  // Validación del parámetro
  if (isNaN(positionId) || positionId <= 0)
  {
    return res.status(400).json({ error: 'Invalid positionId. Must be a positive integer.' });
  }

  try
  {
    const candidates = await getCandidatesByPosition(req.prisma, positionId);
    res.json({
      positionId,
      candidates
    });
  } catch (error)
  {
    console.error('Error fetching candidates by position:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /candidates/:id/stage
 * Actualiza la fase (interviewStep) de un candidato en una posición
 */
router.put('/:id/stage', async (req, res) =>
{
  const candidateId = parseInt(req.params.id);
  const { positionId, newInterviewStepId } = req.body;

  // Validación de parámetros
  if (isNaN(candidateId) || candidateId <= 0)
  {
    return res.status(400).json({ error: 'Invalid candidateId. Must be a positive integer.' });
  }

  if (!positionId || !newInterviewStepId)
  {
    return res.status(400).json({
      error: 'Missing required fields: positionId and newInterviewStepId are required.'
    });
  }

  try
  {
    const updatedApplication = await updateCandidateStage(
      req.prisma,
      candidateId,
      positionId,
      newInterviewStepId
    );

    res.json({
      message: 'Candidate stage updated successfully',
      data: updatedApplication
    });
  } catch (error)
  {
    if (error instanceof Error)
    {
      // Manejo específico de errores de negocio
      if (error.message === 'Application not found')
      {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Invalid interviewStepId for this position')
      {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Missing required parameters')
      {
        return res.status(400).json({ error: error.message });
      }
    }

    // Error genérico
    console.error('Error updating candidate stage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

