import { prisma } from "../../config/prisma.js";
import type {
  CreateJobApplicationInput,
  UpdateJobApplicationInput,
} from "./application.types.js";

export function ApplicationRepository() {
  const createApplication = (
    userId: string,
    data: CreateJobApplicationInput,
  ) => {
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

  const getApplications = async (
    userId: string,
    skip: number,
    limit: number,
  ) => {
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

  const getApplicationsByStatus = async (
    status: string,
    userId: string,
    skip: number,
    limit: number,
  ) => {
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

  const getApplicationById = (id: string, userId: string) => {
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

  const updateApplication = (
    id: string,
    data: UpdateJobApplicationInput,
    userId: string,
  ) => {
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

  const deleteApplication = (id: string, userId: string) => {
    return prisma.jobApplication.delete({
      where: { id, userId },
    });
  };

  const getApplicationBySearchText = async (
    searchText: string,
    userId: string,
    skip: number,
    limit: number,
  ) => {
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

  const getInterviewMetrics = async (userId: string) => {
    const [
      interviewsPending,
      interviewsShortlisted,
      interviewsCompleted,
      interviewsRejected,
    ] = await Promise.all([
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Interview",
          status: {
            in: ["pending"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Interview",
          status: {
            in: ["shortlisted"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Interview",
          status: {
            in: ["completed"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Interview",
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

  const getAssignmentMetrics = async (userId: string) => {
    const [
      assignmentsPending,
      assignmentsShortlisted,
      assignmentsCompleted,
      assignmentsRejected,
    ] = await Promise.all([
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Assignment",
          status: {
            in: ["pending"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Assignment",
          status: {
            in: ["shortlisted"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Assignment",
          status: {
            in: ["completed"],
          },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          stage: "Assignment",
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

  const getTestMetrics = async (userId: string) => {
    const [testsPending, testsShortlisted, testsCompleted, testsRejected] =
      await Promise.all([
        prisma.jobApplication.count({
          where: {
            userId,
            stage: "Test",
            status: {
              in: ["pending"],
            },
          },
        }),
        prisma.jobApplication.count({
          where: {
            userId,
            stage: "Test",
            status: {
              in: ["shortlisted"],
            },
          },
        }),
        prisma.jobApplication.count({
          where: {
            userId,
            stage: "Test",
            status: {
              in: ["completed"],
            },
          },
        }),
        prisma.jobApplication.count({
          where: {
            userId,
            stage: "Test",
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
