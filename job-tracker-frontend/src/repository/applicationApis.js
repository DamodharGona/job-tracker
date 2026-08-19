import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api")
    .replace(/\/api\/?$/, "") + "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    return Promise.reject(err);
  },
);

export const logoutUser = async () => {
  try {
    console.log("logout user api is called");
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllApplications = async (
  searchText,
  status,
  page,
  limit,
  whatFor,
) => {
  try {
    console.log(
      "getAllApplications is triggered:",
      searchText,
      status,
      page,
      limit,
    );
    const res = await api.get("/applications/", {
      params: {
        ...(searchText && { searchText }),
        ...(status && { status }),
        ...(page && { page }),
        ...(limit && { limit }),
        ...(whatFor && { whatFor }),
      },
    });
    console.log("getAllApplications", res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createApplication = async ({
  companyName,
  dueDate,
  jobTitle,
  location,
  mode,
  salaryRange,
  stage,
  status,
}) => {
  try {
    const res = await api.post("/applications/", {
      companyName,
      jobTitle,
      location,
      salaryRange,
      stage,
      mode,
      dueDate,
      status,
    });
    console.log("after update: ", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateApplication = async ({
  id,
  companyName,
  dueDate,
  jobTitle,
  location,
  mode,
  salaryRange,
  stage,
  status,
}) => {
  try {
    const res = await api.patch(`/applications/${id}`, {
      companyName,
      jobTitle,
      location,
      salaryRange,
      stage,
      mode,
      dueDate,
      status,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteApplication = async ({ id }) => {
  try {
    const res = await api.delete(`/applications/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getApplicationsMetrics = async () => {
  try {
    console.log("api is called");
    const res = await api.get("/applications/dashboard");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getJdKeyWordsMatcher = async (formData) => {
  try {
    console.log("api is called");
    const res = await api.post("/applications/jd-keyword-matcher", formData);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
