import { useEffect, useState } from "react";
import { User, Briefcase, Download, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InterviewQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({});
  const [questions, setQuestions] = useState([]);

  const { state } = location;
  const { candidateName, role, level } = state;

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions || []);
    } else {
      console.warn("No questions found in location.state");
    }
  }, [location.state]);

  const updateFeedback = (id, key, value) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted mt-10">
        No questions available.
      </div>
    );
  }

  const exportToPDF = () => {
    alert(
      "PDF export feature - This would generate a downloadable PDF with all questions and feedback"
    );
  };

  const generateShareLink = () => {
    alert(
      "Share link generated! (This would create a collaborative link in production)"
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold flex items-center text-accent hover:opacity-90"
      >
        ← Back
      </button>
      <div className="rounded-2xl shadow-lg p-6 mb-6 bg-surface border border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-fg">
              Interview Questions
            </h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full font-semibold bg-accent/10 text-accent border border-accent/20">
                <Briefcase className="w-4 h-4 inline mr-1" />
                {role}
              </span>
              <span className="px-3 py-1 rounded-full font-semibold bg-elevated text-fg border border-border">
                {level}
              </span>

              {candidateName && (
                <span className="px-3 py-1 rounded-full font-semibold bg-elevated text-fg border border-border">
                  <User className="w-4 h-4 inline mr-1" />
                  {candidateName}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 rounded-lg transition-colors flex items-center font-semibold bg-elevated text-fg hover:opacity-90 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={generateShareLink}
              className="px-4 py-2 bg-accent text-onaccent rounded-lg hover:opacity-90 transition-colors flex items-center font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-xl shadow-lg p-6 bg-surface border border-border"
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold flex-1 text-fg">
                  <span className="text-accent">Q{idx + 1}.</span>
                  <span className="ml-2">{q.question}</span>
                </h3>
              </div>

              <div className="rounded-lg p-4 mb-4 bg-elevated">
                <h4 className="text-sm font-semibold mb-3 text-fg">
                  Scoring Rubric (1-5)
                </h4>
                <div className="space-y-2">
                  {q.rubric.map((r) => (
                    <label
                      key={r.score}
                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors border-2 ${
                        feedback[q.id]?.score === r.score
                          ? "bg-accent/10 border-accent"
                          : "bg-surface border-border hover:border-border/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`score-${q.id}`}
                        value={r.score}
                        checked={feedback[q.id]?.score === r.score}
                        onChange={(e) =>
                          updateFeedback(
                            q.id,
                            "score",
                            parseInt(e.target.value)
                          )
                        }
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-accent">
                            {r.score}
                          </span>
                          <span className="text-fg">{r.desc}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-fg">
                  Notes & Feedback
                </label>
                <textarea
                  value={feedback[q.id]?.notes || ""}
                  onChange={(e) =>
                    updateFeedback(q.id, "notes", e.target.value)
                  }
                  placeholder="Add your observations, strengths, areas for improvement..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {feedback[q.id]?.score && (
              <div className="mt-4 p-3 rounded-lg bg-accent/10">
                <span className="text-sm font-semibold text-accent">
                  Score: {feedback[q.id].score}/5
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl shadow-lg p-6 bg-surface border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 text-fg">
              Interview Complete?
            </h3>
            <p className="text-muted">
              Save feedback or export your evaluation
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert("Feedback saved successfully!")}
              className="px-6 py-3 bg-accent text-onaccent rounded-lg hover:opacity-90 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Save Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
