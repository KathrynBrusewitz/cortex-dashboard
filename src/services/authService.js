export const authService = {
  login,
  logout,
};

function login(email, password) {
  const resOk = true;
  return resOk ? { email, password } : null;
}

function logout() {
  // nothing
}
