import { prisma } from "../../config/prisma.js";
export function ApplicationRepository() {
    const createApplication = (userId, data) => {
        return prisma.jobApplication.create({
            data: {
                userId,
                companyName: data.companyName,
                jobTitle: data.jobTitle,
                salaryRange: data.salaryRange,
                location: data.location,
                ...(data.status !== undefined && {
                    status: data.status,
                }),
                ...(data.dueDate !== undefined && {
                    dueDate: data.dueDate,
                }),
                ...(data.stage !== undefined && {
                    stage: data.stage,
                }),
                ...(data.mode !== undefined && {
                    mode: data.mode,
                }),
            },
        });
    };
    const getApplications = async (userId, skip, limit) => {
        const [applications, totalApplications] = await Promise.all([
            prisma.jobApplication.findMany({
                where: {
                    userId,
                },
                skip: skip,
                take: limit,
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                },
            }),
        ]);
        return {
            applications,
            totalApplications,
        };
    };
    const getApplicationsByStatus = async (status, userId, skip, limit) => {
        const [applications, totalApplications] = await Promise.all([
            prisma.jobApplication.findMany({
                where: {
                    status,
                    userId,
                },
                skip: skip,
                take: limit,
            }),
            prisma.jobApplication.count({
                where: {
                    status,
                    userId,
                },
            }),
        ]);
        return {
            applications,
            totalApplications,
        };
    };
    const getApplicationById = (id, userId) => {
        return prisma.jobApplication.findUnique({
            where: {
                id,
                userId,
            },
        });
    };
    const getAllApplications = () => {
        return prisma.jobApplication.findMany();
    };
    const updateApplication = (id, data, userId) => {
        return prisma.jobApplication.update({
            where: { id, userId },
            data: {
                ...(data.companyName !== undefined && {
                    companyName: data.companyName,
                }),
                ...(data.jobTitle !== undefined && {
                    jobTitle: data.jobTitle,
                }),
                ...(data.salaryRange !== undefined && {
                    salaryRange: data.salaryRange,
                }),
                ...(data.location !== undefined && {
                    location: data.location,
                }),
                ...(data.status !== undefined && {
                    status: data.status,
                }),
                ...(data.dueDate !== undefined && {
                    dueDate: data.dueDate,
                }),
                ...(data.stage !== undefined && {
                    stage: data.stage,
                }),
                ...(data.mode !== undefined && {
                    mode: data.mode,
                }),
            },
        });
    };
    const deleteApplication = (id, userId) => {
        return prisma.jobApplication.delete({
            where: { id, userId },
        });
    };
    const getApplicationBySearchText = async (searchText, userId, skip, limit) => {
        const [applications, totalApplications] = await Promise.all([
            prisma.jobApplication.findMany({
                where: {
                    userId,
                    OR: [
                        { companyName: { contains: searchText, mode: "insensitive" } },
                        { jobTitle: { contains: searchText, mode: "insensitive" } },
                    ],
                },
                skip: skip,
                take: limit,
                orderBy: { id: "asc" },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    OR: [
                        { companyName: { contains: searchText, mode: "insensitive" } },
                        { jobTitle: { contains: searchText, mode: "insensitive" } },
                    ],
                },
            }),
        ]);
        return {
            applications,
            totalApplications,
        };
    };
    const getInterviewMetrics = async (userId) => {
        const [interviewsPending, interviewsShortlisted, interviewsCompleted, interviewsRejected,] = await Promise.all([
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "interview",
                    status: {
                        in: ["pending"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "interview",
                    status: {
                        in: ["shortlisted"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "interview",
                    status: {
                        in: ["completed"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "interview",
                    status: {
                        in: ["rejected"],
                    },
                },
            }),
        ]);
        return {
            interviewsPending,
            interviewsShortlisted,
            interviewsCompleted,
            interviewsRejected,
        };
    };
    const getAssignmentMetrics = async (userId) => {
        const [assignmentsPending, assignmentsShortlisted, assignmentsCompleted, assignmentsRejected,] = await Promise.all([
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "assignment",
                    status: {
                        in: ["pending"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "assignment",
                    status: {
                        in: ["shortlisted"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "assignment",
                    status: {
                        in: ["completed"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "assignment",
                    status: {
                        in: ["rejected"],
                    },
                },
            }),
        ]);
        return {
            assignmentsPending,
            assignmentsShortlisted,
            assignmentsCompleted,
            assignmentsRejected,
        };
    };
    const getTestMetrics = async (userId) => {
        const [testsPending, testsShortlisted, testsCompleted, testsRejected] = await Promise.all([
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "test",
                    status: {
                        in: ["pending"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "test",
                    status: {
                        in: ["shortlisted"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "test",
                    status: {
                        in: ["completed"],
                    },
                },
            }),
            prisma.jobApplication.count({
                where: {
                    userId,
                    stage: "test",
                    status: {
                        in: ["rejected"],
                    },
                },
            }),
        ]);
        return {
            testsPending,
            testsShortlisted,
            testsCompleted,
            testsRejected,
        };
    };
    return {
        createApplication,
        getApplications,
        getApplicationById,
        updateApplication,
        deleteApplication,
        getApplicationsByStatus,
        getApplicationBySearchText,
        getInterviewMetrics,
        getTestMetrics,
        getAssignmentMetrics,
        getAllApplications,
    };
}
//# sourceMappingURL=application.repository.js.map