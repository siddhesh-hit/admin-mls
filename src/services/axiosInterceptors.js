import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8484/api/v1/",
  // baseURL: "https://mlsapi.handsintechnology.in/api/v1/",
  // baseURL: "https://mlsapi.sblcorp.com/api/v1/",
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (req) => req,
  // getToken, return "Role"
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios
          .post(
            "http://localhost:8484/api/v1/user/accessToken",
            // "https://mlsapi.handsintechnology.in/api/v1/accessToken",
            // "https://mlsapi.sblcorp.com/api/v1/user/accessToken",
            {},
            { withCredentials: true }
          )
          .then((res) => axiosInstance.request(originalRequest))
          .catch((err) => {
            window.location.href = "/";
            alert("Please login first");
          });

        return res;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  }
);

const getApi = (url) => {
  return axiosInstance.get(url);
};

const getApiById = (url, id) => {
  return axiosInstance.get(`${url}/${id}`);
};

const postApi = (url, data) => {
  return axiosInstance.post(url, data);
};

const putApi = (url, id, data) => {
  return axiosInstance.put(`${url}/${id}`, data);
};

const deleteApi = (url, id) => {
  return axiosInstance.delete(`${url}/${id}`);
};

export { getApi, getApiById, postApi, putApi, deleteApi };
