const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const API_URLS = {
  GENERATE_FROM_DETAILS: `${BASE_URL}/generate/from-details`,
  GENERATE_FROM_RESUME: `${BASE_URL}/generate/from-resume`,
  GOOGLE_SIGN_IN: `${BASE_URL}/auth/register/google`,
};

async function handleJsonResponse(response) {
  let data = null;
  try {
    data = await response.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const generateFromDetails = async (formData) => {
  const response = await fetch(API_URLS.GENERATE_FROM_DETAILS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleJsonResponse(response);
};

export const generateFromResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URLS.GENERATE_FROM_RESUME, {
    method: "POST",
    body: formData,
  });

  return handleJsonResponse(response);
};

export async function googleSignInHandler(idToken) {
  const res = await fetch(API_URLS.GOOGLE_SIGN_IN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: idToken }),
  });

  return handleJsonResponse(res);
}
