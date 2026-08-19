import type { CreateJobApplicationInput, UpdateJobApplicationInput } from "./application.types.js";
export declare function ApplicationService(): {
    createJobApplicationService: (userId: string, data: CreateJobApplicationInput) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
        userId: string;
    }>;
    getAllJobApplicationsService: (userId: string, limit: number, page: number, status?: string, searchText?: string, whatFor?: string) => Promise<{
        applications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            jobTitle: string;
            salaryRange: string;
            location: string;
            status: string | null;
            dueDate: string | null;
            stage: string | null;
            mode: string | null;
            userId: string;
        }[];
        meta: {
            totalApplications: number;
            totalPages: number;
            currentPage: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    } | {
        applications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            jobTitle: string;
            salaryRange: string;
            location: string;
            status: string | null;
            dueDate: string | null;
            stage: string | null;
            mode: string | null;
            userId: string;
        }[];
        meta?: never;
    }>;
    getJobApplicationService: (id: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
        userId: string;
    }>;
    updateJobApplicationService: (id: string, userId: string, data: UpdateJobApplicationInput) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
        userId: string;
    }>;
    deleteJobApplicationService: (id: string, userId: string) => Promise<{
        message: string;
    }>;
    getJobApplicationsMetricsService: (userId: string) => Promise<({
        test: {
            pending: number;
            shortlisted: number;
            completed: number;
            rejected: number;
        };
        interview?: never;
        assignment?: never;
    } | {
        interview: {
            pending: number;
            shortlisted: number;
            completed: number;
            rejected: number;
        };
        test?: never;
        assignment?: never;
    } | {
        assignment: {
            pending: number;
            shortlisted: number;
            completed: number;
            rejected: number;
        };
        test?: never;
        interview?: never;
    })[]>;
    callGeminiService: (userId: string, prompt: string, resume: string, jobDescription: string) => Promise<{
        matchScore: number;
        matchBreakdown: string;
        keywords: any;
        tailored_bullets: any;
        advisory_note: any;
    }>;
};
//# sourceMappingURL=application.service.d.ts.map