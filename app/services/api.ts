export const createApiMethods = ($api: any) => ({
  // AUTH
  login: (data: any) => $api.post("/auth/login", data),
  logout: () => $api.post("/auth/logout"),

  // USERS
  getUsers: () => $api.get("/users"),

  updateProfile: (data: any) => $api.post("/auth/update", data),
  getAnalytics: () => $api.get("/analytics"),
  getImports: () => $api.get('/imports'),
  getImportById: (id: number | string) => $api.get(`/imports/${id}`),



})
