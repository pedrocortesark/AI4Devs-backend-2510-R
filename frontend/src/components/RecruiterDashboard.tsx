import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/lti-logo.png';
import { getCandidatesByPosition, updateCandidateStage } from '../services/candidateService';
import { CandidateKanbanDTO } from '../types';

/**
 * Dashboard principal del reclutador con vista Kanban de candidatos
 * Muestra candidatos agrupados por fase del proceso de entrevistas
 */
const RecruiterDashboard: React.FC = () =>
{
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================
    const [candidates, setCandidates] = useState<CandidateKanbanDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [movingCandidate, setMovingCandidate] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // TODO: Hacer dinámico - por ahora hardcoded para testing
    const POSITION_ID = 1;

    // ============================================================================
    // DATA FETCHING
    // ============================================================================

    /**
     * Carga inicial de candidatos desde el backend
     */
    const loadCandidates = async () =>
    {
        try
        {
            setLoading(true);
            setError(null);
            const data = await getCandidatesByPosition(POSITION_ID);
            setCandidates(data);
        } catch (err: any)
        {
            setError(err.message || 'Error al cargar candidatos');
            console.error('Error loading candidates:', err);
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        loadCandidates();
    }, []);

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    /**
     * Maneja el movimiento de un candidato a una nueva fase
     * Principio SRP: Solo coordina la actualización, la lógica HTTP está en el servicio
     */
    const handleMoveCandidate = async (candidateId: number, newStepId: number, newStageName: string) =>
    {
        try
        {
            setMovingCandidate(candidateId);
            setError(null);
            setSuccessMessage(null);

            await updateCandidateStage(candidateId, {
                positionId: POSITION_ID,
                newInterviewStepId: newStepId,
            });

            // Actualizar estado local
            setCandidates((prev) =>
                prev.map((candidate) =>
                    candidate.candidateId === candidateId
                        ? { ...candidate, currentStage: newStageName }
                        : candidate
                )
            );

            setSuccessMessage(`Candidato movido a "${newStageName}" exitosamente`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any)
        {
            setError(err.message || 'Error al mover candidato');
            console.error('Error moving candidate:', err);
        } finally
        {
            setMovingCandidate(null);
        }
    };

    // ============================================================================
    // DATA TRANSFORMATION (Business Logic)
    // ============================================================================

    /**
     * Agrupa candidatos por fase del proceso
     * Retorna un objeto { stageName: CandidateKanbanDTO[] }
     */
    const groupCandidatesByStage = (): Record<string, CandidateKanbanDTO[]> =>
    {
        return candidates.reduce((acc, candidate) =>
        {
            const stage = candidate.currentStage || 'Sin asignar';
            if (!acc[stage])
            {
                acc[stage] = [];
            }
            acc[stage].push(candidate);
            return acc;
        }, {} as Record<string, CandidateKanbanDTO[]>);
    };

    const groupedCandidates = groupCandidatesByStage();
    const stages = Object.keys(groupedCandidates);

    // ============================================================================
    // MOCK DATA - Interview Steps disponibles (TODO: Obtener dinámicamente del backend)
    // ============================================================================
    const availableSteps = [
        { id: 1, name: 'Screening Inicial' },
        { id: 2, name: 'Entrevista Técnica' },
        { id: 3, name: 'Entrevista con Manager' },
        { id: 4, name: 'Oferta' },
    ];

    // ============================================================================
    // RENDER
    // ============================================================================

    if (loading)
    {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando candidatos...</span>
                </Spinner>
                <p className="mt-3">Cargando candidatos...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            {/* Logo */}
            <div className="text-center mb-4">
                <img src={logo} alt="LTI Logo" style={{ width: '150px' }} />
            </div>

            <h1 className="mb-4 text-center">Dashboard del Reclutador</h1>

            {/* Mensajes de error y éxito */}
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            )}

            {/* Botón para añadir candidato */}
            <Row className="mb-4">
                <Col>
                    <Link to="/add-candidate">
                        <Button variant="primary" size="lg">
                            + Añadir Nuevo Candidato
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Tablero Kanban */}
            <h2 className="mb-3">Pipeline de Candidatos - Posición #{POSITION_ID}</h2>

            {candidates.length === 0 ? (
                <Alert variant="info">
                    No hay candidatos para esta posición. Añade candidatos y vincúlalos a esta posición.
                </Alert>
            ) : (
                <Row className="g-3">
                    {stages.map((stageName) => (
                        <Col key={stageName} md={6} lg={3}>
                            <Card className="shadow-sm h-100">
                                <Card.Header className="bg-primary text-white">
                                    <h5 className="mb-0">
                                        {stageName}
                                        <Badge bg="light" text="dark" className="ms-2">
                                            {groupedCandidates[stageName].length}
                                        </Badge>
                                    </h5>
                                </Card.Header>
                                <Card.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                    {groupedCandidates[stageName].map((candidate) => (
                                        <Card
                                            key={candidate.candidateId}
                                            className="mb-3 border"
                                            style={{
                                                opacity: movingCandidate === candidate.candidateId ? 0.6 : 1,
                                            }}
                                        >
                                            <Card.Body>
                                                <Card.Title className="h6">{candidate.fullName}</Card.Title>
                                                <Card.Text className="small text-muted">
                                                    {candidate.averageScore !== null ? (
                                                        <>
                                                            <strong>Score:</strong>{' '}
                                                            <Badge
                                                                bg={
                                                                    candidate.averageScore >= 8
                                                                        ? 'success'
                                                                        : candidate.averageScore >= 6
                                                                            ? 'warning'
                                                                            : 'danger'
                                                                }
                                                            >
                                                                {candidate.averageScore.toFixed(1)}/10
                                                            </Badge>
                                                        </>
                                                    ) : (
                                                        <em>Sin evaluación</em>
                                                    )}
                                                </Card.Text>

                                                {/* Botones de movimiento */}
                                                <div className="d-grid gap-2">
                                                    {availableSteps
                                                        .filter((step) => step.name !== stageName)
                                                        .map((step) => (
                                                            <Button
                                                                key={step.id}
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleMoveCandidate(
                                                                        candidate.candidateId,
                                                                        step.id,
                                                                        step.name
                                                                    )
                                                                }
                                                                disabled={movingCandidate === candidate.candidateId}
                                                            >
                                                                {movingCandidate === candidate.candidateId
                                                                    ? 'Moviendo...'
                                                                    : `→ ${step.name}`}
                                                            </Button>
                                                        ))}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default RecruiterDashboard;
