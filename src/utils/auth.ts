export const isAuthenticated = () => {
  const token = localStorage.getItem("auth_token");
  return !!token; // true kalau token ada
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe");
};
