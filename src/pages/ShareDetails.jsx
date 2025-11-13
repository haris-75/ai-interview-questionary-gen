import { useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
// TODO: Uncomment when we will use API
// import { generateFromDetails } from "../api";
import {
  FORM_FIELDS,
  sampleResponseGenerateFormDetails,
  validators,
} from "../constants";
import ErrorAlert from "../components/ErrorAlert";
import FormField from "../components/FormField";
import toast from "react-hot-toast";

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

  const validateForm = () => {
    const newErrors = {};

    Object.keys(validators).forEach((field) => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      if (apiError) setApiError(null);
    },
    [errors, apiError]
  );

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

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    // TODO: Remove this mock implementation and uncomment when we will use API
    try {
      const data = sampleResponseGenerateFormDetails;

      setTimeout(() => {
        toast.success("Questions generated successfully!");
        navigate(`/${ROUTES.INTERVIEW_QUESTIONS}`, {
          state: {
            questions: data?.questions,
            candidateName: formData.candidateName,
            role: formData.role,
            level: formData.level,
          },
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setApiError(
        err.message || "Failed to generate questions. Please try again."
      );
    }

    // TODO: Uncomment when we will use API
    // try {
    //   const payload = buildPayload();
    //   const data = await generateFromDetails(payload);
    // toast.success("Questions generated successfully!");
    //   navigate(`/${ROUTES.INTERVIEW_QUESTIONS}`, {
    //     state: {
    //       questions: data?.questions,
    //       candidateName: formData.candidateName,
    //       role: formData.role,
    //       level: formData.level,
    //     },
    //   });
    // } catch (err) {
    //   console.error("Failed to generate questions:", err);
    //   setApiError(
    //     err.message || "Failed to generate questions. Please try again."
    //   );
    // } finally {
    //   setLoading(false);
    // }
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
