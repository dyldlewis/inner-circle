export function logout() {
  localStorage.clear();
  window.location.replace("/");
}

export function getJwt() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("jwt");
    const jwt = token ? `Bearer ${token}` : null;
    return jwt;
  }
}

