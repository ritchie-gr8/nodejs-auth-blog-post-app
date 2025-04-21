import axios from "axios";

function jwtInterceptor() {
  const api = axios.create();

  api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = jwtInterceptor();
