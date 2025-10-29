const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const API_URLS = {
  GENERATE_FROM_DETAILS: `${BASE_URL}/generate/from-details`,
  GENERATE_FROM_RESUME: `${BASE_URL}/generate/from-resume`,
};

export const generateFromDetails = async (formData) => {
  const response = await fetch(API_URLS.GENERATE_FROM_DETAILS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to generate questions.");
  }

  return response.json();
};

export const generateFromResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URLS.GENERATE_FROM_RESUME, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to generate questions from resume."
    );
  }

  return response.json();
};
