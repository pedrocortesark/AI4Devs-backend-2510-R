export interface CandidateKanbanDTO
{
    candidateId: number;
    fullName: string;
    currentStage: string;
    averageScore: number | null;
}

export interface MoveCandidatePayload
{
    positionId: number;
    newInterviewStepId: number;
}

// Basic typing for existing features (to maintain compatibility during migration)
export interface CandidateData
{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    educations?: any[];
    workExperiences?: any[];
}

export interface UploadResponse
{
    filePath: string;
    fileType: string;
}
