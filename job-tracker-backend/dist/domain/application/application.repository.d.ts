import type { CreateJobApplicationInput, UpdateJobApplicationInput } from "./application.types.js";
export declare function ApplicationRepository(): {
    createApplication: (userId: string, data: CreateJobApplicationInput) => import("../../generated/prisma/models.js").Prisma__JobApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getApplications: (userId: string, skip: number, limit: number) => Promise<{
        applications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            companyName: string;
            jobTitle: string;
            salaryRange: string;
            location: string;
            status: string | null;
            dueDate: string | null;
            stage: string | null;
            mode: string | null;
        }[];
        totalApplications: number;
    }>;
    getApplicationById: (id: string, userId: string) => import("../../generated/prisma/models.js").Prisma__JobApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateApplication: (id: string, data: UpdateJobApplicationInput, userId: string) => import("../../generated/prisma/models.js").Prisma__JobApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteApplication: (id: string, userId: string) => import("../../generated/prisma/models.js").Prisma__JobApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getApplicationsByStatus: (status: string, userId: string, skip: number, limit: number) => Promise<{
        applications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            companyName: string;
            jobTitle: string;
            salaryRange: string;
            location: string;
            status: string | null;
            dueDate: string | null;
            stage: string | null;
            mode: string | null;
        }[];
        totalApplications: number;
    }>;
    getApplicationBySearchText: (searchText: string, userId: string, skip: number, limit: number) => Promise<{
        applications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            companyName: string;
            jobTitle: string;
            salaryRange: string;
            location: string;
            status: string | null;
            dueDate: string | null;
            stage: string | null;
            mode: string | null;
        }[];
        totalApplications: number;
    }>;
    getInterviewMetrics: (userId: string) => Promise<{
        interviewsPending: number;
        interviewsShortlisted: number;
        interviewsCompleted: number;
        interviewsRejected: number;
    }>;
    getTestMetrics: (userId: string) => Promise<{
        testsPending: number;
        testsShortlisted: number;
        testsCompleted: number;
        testsRejected: number;
    }>;
    getAssignmentMetrics: (userId: string) => Promise<{
        assignmentsPending: number;
        assignmentsShortlisted: number;
        assignmentsCompleted: number;
        assignmentsRejected: number;
    }>;
    getAllApplications: () => import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        companyName: string;
        jobTitle: string;
        salaryRange: string;
        location: string;
        status: string | null;
        dueDate: string | null;
        stage: string | null;
        mode: string | null;
    }[]>;
};
//# sourceMappingURL=application.repository.d.ts.map