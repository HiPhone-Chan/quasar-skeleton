import { api } from "@/boot/axios";
import { useUserStore } from "@/stores/user-store";
import { useEventStore } from "@/stores/event-store";

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useUserStore().token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + useUserStore().token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.warn("request err :" + JSON.stringify(error)); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response

   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const status = response.status;
    if (status / 100 === 5) {
      console.warn("server err :" + response.data);
    }
    return response;
  },
  (error) => {
    console.warn("resp err :" + JSON.stringify(error)); // for debug
    useEventStore().emit("notification", {
      message: error.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);
export default api;
