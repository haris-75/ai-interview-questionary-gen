import { useState } from "react";
import { ChevronRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import { generateFromDetails } from "../api";

// Form configuration
const EXPERIENCE_LEVELS = [
  { value: "", label: "Select level" },
  { value: "Junior", label: "Junior (0-2 years)" },
  { value: "Mid-Level", label: "Mid-Level (2-5 years)" },
  { value: "Senior", label: "Senior (5+ years)" },
  { value: "Lead", label: "Lead/Principal" },
];

// Validation rules
const validators = {
  role: (value) => {
    if (!value?.trim()) return "Job role is required.";
    return null;
  },

  level: (value) => {
    if (!value?.trim()) return "Experience level is required.";
    return null;
  },

  yearsExp: (value) => {
    if (!value) return null;
    if (!/^\d+(\+|\-\d+)?$/.test(value.trim())) {
      return "Please enter a valid number or range (e.g., 3, 3-5, 5+).";
    }
    return null;
  },

  skills: (value) => {
    if (!value) return null;
    const hasEmptySkill = value.split(",").some((s) => s.trim().length === 0);
    if (hasEmptySkill) {
      return "Please separate skills by commas (no trailing commas).";
    }
    return null;
  },

  candidateName: (value) => {
    if (!value) return null;
    if (/[0-9]/.test(value.trim())) {
      return "Candidate name cannot contain numbers.";
    }
    return null;
  },
};

// Form field configuration
const FORM_FIELDS = [
  {
    name: "role",
    label: "Job Role",
    type: "text",
    placeholder: "e.g., Frontend Developer, Data Scientist",
    required: true,
  },
  {
    name: "level",
    label: "Experience Level",
    type: "select",
    options: EXPERIENCE_LEVELS,
    required: true,
  },
  {
    name: "yearsExp",
    label: "Years of Experience",
    type: "text",
    placeholder: "e.g., 3-5 years",
  },
  {
    name: "skills",
    label: "Key Skills (comma separated)",
    type: "textarea",
    placeholder: "e.g., React, TypeScript, Node.js, AWS",
    rows: 3,
  },
  {
    name: "candidateName",
    label: "Candidate Name",
    type: "text",
    placeholder: "e.g., John Doe",
  },
];

// Reusable Input Component
const FormField = ({ field, value, error, onChange }) => {
  const baseClasses = `w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-ring ${
    error ? "border-red-500" : "focus:border-accent"
  }`;

  const renderInput = () => {
    switch (field.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseClasses}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows}
            className={baseClasses}
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-fg">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p
          className="text-sm mt-1 flex items-center gap-1"
          style={{ color: "var(--color-error-text)" }}
        >
          <AlertCircle
            className="w-4 h-4"
            style={{ color: "var(--color-error-icon)" }}
          />
          {error}
        </p>
      )}
    </div>
  );
};

// Error Alert Component
const ErrorAlert = ({ message }) => (
  <div
    className="p-4 rounded-lg flex items-start gap-3 border"
    style={{
      backgroundColor: "var(--color-error-bg)",
      borderColor: "var(--color-error-border)",
    }}
  >
    <AlertCircle
      className="w-5 h-5 flex-shrink-0 mt-0.5"
      style={{ color: "var(--color-error-icon)" }}
    />
    <p
      className="text-sm font-medium"
      style={{ color: "var(--color-error-text)" }}
    >
      {message}
    </p>
  </div>
);

// Main Component
export default function ShareDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    level: "",
    yearsExp: "",
    skills: "",
    candidateName: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    Object.keys(validators).forEach((field) => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change with real-time validation clearing
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Clear API error when user makes changes
    if (apiError) setApiError(null);
  };

  // Transform form data to API payload
  const buildPayload = () => ({
    role: formData.role.trim(),
    level: formData.level,
    years_exp: formData.yearsExp.trim() || null,
    skills: formData.skills
      ? formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    candidate_name: formData.candidateName.trim() || null,
    use_llm: true,
  });

  // Handle form submission
  const handleGenerate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    try {
      const payload = buildPayload();
      const data = await generateFromDetails(payload);

      navigate(`/${ROUTES.INTERVIEW_QUESTIONS}`, {
        state: { questions: data },
      });
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setApiError(
        err.message || "Failed to generate questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:min-w-2xl md:min-w-xl max-w-6xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold flex items-center text-accent hover:opacity-90 transition-opacity"
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="rounded-2xl shadow-xl p-8 bg-surface border border-border">
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-fg">
            Tell us about the role
          </h2>
          <p className="text-muted">
            Provide details to generate relevant interview questions
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
          className="space-y-6"
        >
          {FORM_FIELDS.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
            />
          ))}

          {apiError && <ErrorAlert message={apiError} />}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center bg-accent text-onaccent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                Generate Questions
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
