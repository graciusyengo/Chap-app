export const LoginStart = (userCredential) => ({
  type: "LOGIN_START",
  payload: userCredential
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
