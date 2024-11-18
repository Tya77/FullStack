// Build Http Client

import { config } from "./config.js";
import { requestRefresh } from "./token.js";
const { SERVER_API } = config;

export const client = {
  serverApi: SERVER_API,
  token: null,

  setUrl: function (url) {
    this.serverApi = url;
  },

  setToken: function (token) {
    this.token = token;
  },

  send: async function (url, method = "GET", body = null) {
    // url = SERVER_API + url;
    url = `${this.serverApi}${url}`;
    const headers = {
      "Content-Type": "application/json",
    };
    console.log(url);

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    // if (this.token && response.status === 401) {
    //   const refreshToken = localStorage.getItem("refreshToken");
    //   const res = await requestRefresh({ refreshToken: refreshToken });
    //   console.log(res);
    //   if (res?.data?.code === 200) {
    //     localStorage.setItem(
    //       "accessToken",
    //       `${res?.data?.data?.token?.accessToken}`
    //     );
    //     localStorage.setItem(
    //       "refreshToken",
    //       `${res?.data?.data?.token?.refreshToken}`
    //     );
    //     return this.send(url, method, body);
    //   } else {
    //     localStorage.removeItem("refreshToken");
    //     localStorage.removeItem("accessToken");
    //     window.location.href="/"
    //   }
    // }

    const data = await response.json();

    return { response, data };
  },

  get: function (url) {
    return this.send(url);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
