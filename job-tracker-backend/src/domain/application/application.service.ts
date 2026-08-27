import { ApplicationRepository } from "./application.repository.js";
import { AppErrors } from "../../errors/app.errors.js";
import { decrypt } from "../../utils/encryption.js";
import type {
  CreateJobApplicationInput,
  UpdateJobApplicationInput,
} from "./application.types.js";
import { AuthRepository } from "../authentication/auth.repository.js";
import { GoogleGenAI, Type } from "@google/genai";

export function ApplicationService() {
  const {
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
  } = ApplicationRepository();

  const { getUserById } = AuthRepository();

  const createJobApplicationService = async (
    userId: string,
    data: CreateJobApplicationInput,
  ) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    return createApplication(userId, data);
  };

  const getAllJobApplicationsService = async (
    userId: string,
    limit: number,
    page: number,
    status?: string,
    searchText?: string,
    whatFor?: string,
  ) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    const skip = (page - 1) * limit;

    if (status && status !== "All") {
      const normalizedStatus = status.toLowerCase();
      const result = await getApplicationsByStatus(
        normalizedStatus,
        userId,
        skip,
        limit,
      );
      const total = Number(result.totalApplications);
      const perPage = Number(limit);
      const totalPages = Math.ceil(total / perPage);
      return {
        applications: result.applications,
        meta: {
          totalApplications: result.totalApplications,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } else if (searchText) {
      const result = await getApplicationBySearchText(
        searchText,
        userId,
        skip,
        limit,
      );
      const totalPages = result.totalApplications / limit;
      return {
        applications: result.applications,
        meta: {
          totalApplications: result.totalApplications,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } else if (whatFor && whatFor === "analysis") {
      const applications = await getAllApplications();
      return {
        applications: applications,
      };
    }
    console.log("all if else failed");
    const result = await getApplications(userId, skip, limit);
    const totalPages = result.totalApplications / limit;
    console.log("getAllApplications:", result);
    return {
      applications: result.applications,
      meta: {
        totalApplications: result.totalApplications,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };

  const getJobApplicationService = async (id: string, userId: string) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    const application = await getApplicationById(id, userId);
    if (!application) {
      throw AppErrors.notFound(
        `Job application with ID ${id} not found`,
        "JOB_APPLICATION_NOT_FOUND",
      );
    }
    return application;
  };

  const updateJobApplicationService = async (
    id: string,
    userId: string,
    data: UpdateJobApplicationInput,
  ) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    await getJobApplicationService(id, userId);
    return updateApplication(id, data, userId);
  };

  const deleteJobApplicationService = async (id: string, userId: string) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    await getJobApplicationService(id, userId);
    await deleteApplication(id, userId);

    return {
      message: "deleted successfully",
    };
  };

  const getJobApplicationsMetricsService = async (userId: string) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    const interviews = await getInterviewMetrics(userId);
    const tests = await getTestMetrics(userId);
    const assignments = await getAssignmentMetrics(userId);

    return [
      {
        test: {
          pending: tests.testsPending,
          shortlisted: tests.testsShortlisted,
          completed: tests.testsCompleted,
          rejected: tests.testsRejected,
        },
      },
      {
        interview: {
          pending: interviews.interviewsPending,
          shortlisted: interviews.interviewsShortlisted,
          completed: interviews.interviewsCompleted,
          rejected: interviews.interviewsRejected,
        },
      },
      {
        assignment: {
          pending: assignments.assignmentsPending,
          shortlisted: assignments.assignmentsShortlisted,
          completed: assignments.assignmentsCompleted,
          rejected: assignments.assignmentsRejected,
        },
      },
    ];
  };

  const callGeminiService = async (
    userId: string,
    prompt: string,
    resume: string,
    jobDescription: string,
  ) => {
    const user = await getUserById(userId);

    if (!user) {
      throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const encryptedApiKey = user.geminiApiKey;

    if (!encryptedApiKey) {
      throw AppErrors.notFound(
        "gemini api key required. please add in the profile setting",
        "GEMINI_API_KEY_NOT_FOUND",
      );
    }

    let geminiApiKey = encryptedApiKey;
    if (encryptedApiKey.includes(":")) {
      try {
        geminiApiKey = decrypt(encryptedApiKey);
      } catch (err) {
        throw AppErrors.internal(
          "Failed to decrypt Gemini API key",
          "DECRYPTION_FAILED",
        );
      }
    }

    const ai = new GoogleGenAI({
      apiKey: geminiApiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: {
        role: "user",
        parts: [
          { text: prompt },
          { text: `Resume Content:\n${resume}` },
          { text: `Job Description:\n${jobDescription}` },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  importance_rank: { type: Type.INTEGER },
                  match_status: { type: Type.STRING },
                },
                required: ["keyword", "importance_rank", "match_status"],
              },
            },
            jd_specificity: {
              type: Type.STRING,
              description: "Assess whether the job description is 'specific' or 'vague' based on its tech requirements.",
            },
            tailored_bullets: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bullet_line: { type: Type.STRING },
                  source_line: { type: Type.STRING },
                },
                required: ["bullet_line", "source_line"],
              },
            },
            advisory_note: {
              type: Type.STRING,
            },
          },
          required: ["keywords", "tailored_bullets", "advisory_note", "jd_specificity"],
          propertyOrdering: ["keywords", "tailored_bullets", "advisory_note", "jd_specificity"],
        },
      },
    });

    console.log("gemini response:", response.text);

    const parsedResponse = JSON.parse(response.text!);

    console.log("parsed response", parsedResponse);

    const matchedCount = parsedResponse.keywords.filter(
      (k: { match_status: string }) =>
        k.match_status === "Present" || k.match_status === "Partial",
    ).length;

    const totalCount = parsedResponse.keywords.length;

    const matchScore = Math.round((matchedCount / totalCount) * 100);

    const matchBreakdown = `${matchedCount} of ${totalCount} key requirements matched or partially matched`;

    return {
      matchScore: matchScore,
      matchBreakdown: matchBreakdown,
      keywords: parsedResponse.keywords,
      tailored_bullets: parsedResponse.tailored_bullets,
      advisory_note: parsedResponse.advisory_note,
    };
  };

  // const callGeminiService = async (userId: string, prompt: string) => {
  //   const user = await getUserById(userId);

  //   if (!user) {
  //     throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
  //   }

  //   if (!process.env.GEMINI_API_KEY) {
  //     throw new Error("Gemini API key is not configured");
  //   }
  //   const ai = new GoogleGenAI({
  //     apiKey: process.env.GEMINI_API_KEY,
  //   });

  //   const response = await ai.models.generateContent({
  //     model: "gemini-3.1-flash-lite",
  //     contents: prompt,
  //   });

  //   return response.text;
  // };

  return {
    createJobApplicationService,
    getAllJobApplicationsService,
    getJobApplicationService,
    updateJobApplicationService,
    deleteJobApplicationService,
    getJobApplicationsMetricsService,
    callGeminiService,
  };
}
