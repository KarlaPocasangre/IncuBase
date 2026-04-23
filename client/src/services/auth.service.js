import { httpPost } from "./http";

export function loginRequest(data) {
  return httpPost("/api/auth/login", data);
}

export function forgotPasswordRequest(data) {
  return httpPost("/api/auth/forgot-password", data);
}

export function verifyCodeRequest(data) {
  return httpPost("/api/auth/verify-code", data);
}

export function resetPasswordRequest(data) {
  return httpPost("/api/auth/reset-password", data);
}