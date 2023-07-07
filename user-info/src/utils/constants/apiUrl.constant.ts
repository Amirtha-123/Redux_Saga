export const API_BASE_URL: string = "https://dummyapi.io/data/v1";
export const apiRoutes = {
  getUser: { apiPath: "/user", method: "GET" },
  createUser: { apiPath: "/user/create", method: "POST" },
  deleteUser: { apiPath: "/user/:id", method: "DELETE" },
  editUser: { apiPath: "/user/:id", method: "GET" },
};
