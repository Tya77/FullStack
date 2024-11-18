import { client } from "./client.js";

export const requestRefresh = (refreshToken) => {
  return client.post("/auth/refresh-token", refreshToken);
};
