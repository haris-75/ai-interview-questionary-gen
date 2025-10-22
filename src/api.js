const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const generateFromDetails = async (formData) => {
  const response = await fetch(`${BASE_URL}/generate-from-details`, {
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
