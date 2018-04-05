export const authService = {
  login,
  logout,
};

function login(email, password) {
  const resOk = true;
  return resOk ? { email } : null;
}

function logout() {
  // nothing
}
