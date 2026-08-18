import { z } from "zod";
export declare const createJobApplicationBody: z.ZodObject<{
    companyName: z.ZodString;
    jobTitle: z.ZodString;
    salaryRange: z.ZodString;
    location: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    stage: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateJobApplicationBody: z.ZodObject<{
    companyName: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    salaryRange: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    dueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    stage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const jobApplicationParams: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const jobApplicationQuery: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    searchText: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    whatFor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createJobApplicationResponse: z.ZodObject<{
    companyName: z.ZodString;
    jobTitle: z.ZodString;
    salaryRange: z.ZodString;
    location: z.ZodString;
    status: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    stage: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createJobApplicationRequest: z.ZodObject<{
    body: z.ZodObject<{
        companyName: z.ZodString;
        jobTitle: z.ZodString;
        salaryRange: z.ZodString;
        location: z.ZodString;
        status: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodString>;
        stage: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateJobApplicationRequest: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        companyName: z.ZodOptional<z.ZodString>;
        jobTitle: z.ZodOptional<z.ZodString>;
        salaryRange: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        dueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        stage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        mode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getJobApplicationRequest: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteJobApplicationRequest: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllJobApplicationsRequest: z.ZodObject<{
    query: z.ZodObject<{
        status: z.ZodOptional<z.ZodString>;
        searchText: z.ZodOptional<z.ZodString>;
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        whatFor: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const callGeminiRequest: z.ZodObject<{
    body: z.ZodObject<{
        prompt: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getKeyWordMatcherRequest: z.ZodObject<{
    body: z.ZodObject<{
        resume: z.ZodCustom<File, File>;
        jobDescription: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createJobApplicationSchema: z.ZodObject<{
    request: z.ZodObject<{
        body: z.ZodObject<{
            companyName: z.ZodString;
            jobTitle: z.ZodString;
            salaryRange: z.ZodString;
            location: z.ZodString;
            status: z.ZodOptional<z.ZodString>;
            dueDate: z.ZodOptional<z.ZodString>;
            stage: z.ZodOptional<z.ZodString>;
            mode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        companyName: z.ZodString;
        jobTitle: z.ZodString;
        salaryRange: z.ZodString;
        location: z.ZodString;
        status: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodString>;
        stage: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateJobApplicationSchema: z.ZodObject<{
    request: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: z.ZodObject<{
            companyName: z.ZodOptional<z.ZodString>;
            jobTitle: z.ZodOptional<z.ZodString>;
            salaryRange: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            dueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            stage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            mode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        companyName: z.ZodString;
        jobTitle: z.ZodString;
        salaryRange: z.ZodString;
        location: z.ZodString;
        status: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodString>;
        stage: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getJobApplicationSchema: z.ZodObject<{
    request: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        companyName: z.ZodString;
        jobTitle: z.ZodString;
        salaryRange: z.ZodString;
        location: z.ZodString;
        status: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodString>;
        stage: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteJobApplicationSchema: z.ZodObject<{
    request: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        companyName: z.ZodString;
        jobTitle: z.ZodString;
        salaryRange: z.ZodString;
        location: z.ZodString;
        status: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodString>;
        stage: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllJobApplicationsSchema: z.ZodObject<{
    request: z.ZodObject<{
        query: z.ZodObject<{
            status: z.ZodOptional<z.ZodString>;
            searchText: z.ZodOptional<z.ZodString>;
            page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
            limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
            whatFor: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=application.schema.d.ts.map