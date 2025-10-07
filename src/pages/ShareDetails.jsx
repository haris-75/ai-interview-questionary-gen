import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";

export default function ShareDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    level: "",
    yearsExp: "",
    skills: "",
  });

  return (
    <div className="lg:min-w-2xl md:min-w-xl max-w-6xl mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold flex items-center text-accent hover:opacity-90"
      >
        ← Back
      </button>

      <div className="rounded-2xl shadow-xl p-8 bg-surface border border-border">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-fg">
            Tell us about the role
          </h2>
          <p className="text-muted">
            Provide details to generate relevant interview questions
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-fg">
              Job Role *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="e.g., Frontend Developer, Data Scientist"
              className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-fg">
              Experience Level *
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select level</option>
              <option value="Junior">Junior (0-2 years)</option>
              <option value="Mid-Level">Mid-Level (2-5 years)</option>
              <option value="Senior">Senior (5+ years)</option>
              <option value="Lead">Lead/Principal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-fg">
              Years of Experience
            </label>
            <input
              type="text"
              value={formData.yearsExp}
              onChange={(e) =>
                setFormData({ ...formData, yearsExp: e.target.value })
              }
              placeholder="e.g., 3-5 years"
              className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-fg">
              Key Skills (comma separated)
            </label>
            <textarea
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              placeholder="e.g., React, TypeScript, Node.js, AWS"
              rows="3"
              className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={() => navigate(`/${ROUTES.INTERVIEW_QUESTIONS}`)}
            className="w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center bg-accent text-onaccent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Generate Questions <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
