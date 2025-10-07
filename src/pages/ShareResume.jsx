import { useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";

export default function ShareResume() {
  const [candidateName, setCandidateName] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTimeout(() => {
        console.log("Form Submitted");
        navigate(`/${ROUTES.INTERVIEW_QUESTIONS}`);
      }, 1000);
    }
  };

  return (
    <div className="lg:min-w-2xl md:min-w-xl max-w-6xl mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold flex items-center text-accent hover:opacity-90"
      >
        ← Back
      </button>

      <div className="rounded-2xl shadow-xl p-8 bg-surface border border-border">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2 text-fg">Upload Resume</h2>
          <p className="text-muted">
            We'll analyze the resume and generate relevant questions
          </p>
        </div>

        <div className="border-4 border-dashed rounded-xl p-12 text-center transition-colors border-border hover:border-accent/70">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent/10">
              <FileText className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-fg">
              Drop your resume here
            </h3>
            <p className="mb-4 text-muted">or click to browse</p>
            <p className="text-sm text-muted">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2 text-fg">
            Candidate Name (Optional)
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter candidate name"
            className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
