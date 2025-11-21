// TODO: Needs Refactoring
import { useEffect, useState } from "react";
import { User, Briefcase, Download, Share2, Save, Eye } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
// TODO: needs a bit of refactoring to smaller components
export default function InterviewQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isSharedView, setIsSharedView] = useState(false);

  const { state } = location;
  const { candidateName, role, level } = state || {};

  // ✅ Detect shared link and decode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (encodedData) {
      try {
        const decoded = JSON.parse(atob(encodedData));
        setFeedback(decoded.feedback || {});
        setIsSharedView(true);

        // Optional: add mock questions if none provided
        if (decoded.questions) setQuestions(decoded.questions);
        else
          setQuestions([
            {
              id: 1,
              question:
                "Example shared question: Describe React lifecycle methods.",
              rubric: [
                { score: 1, desc: "Very weak understanding" },
                { score: 3, desc: "Basic but incomplete explanation" },
                { score: 5, desc: "Comprehensive and accurate" },
              ],
            },
          ]);

        toast.success("Loaded shared feedback view!");
      } catch (err) {
        console.error("Failed to parse shared link", err);
        toast.error("Invalid shared link.");
      }
    } else if (location.state?.questions) {
      // Regular navigation
      setQuestions(location.state.questions || []);
    } else {
      console.warn("No questions found in location.state");
    }
  }, [location.state]);

  const updateFeedback = (id, key, value) => {
    if (isSharedView) return; // prevent editing in shared mode
    setFeedback((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    let y = margin;

    doc.setFontSize(18);
    doc.text("Interview Evaluation Report", margin, y);
    y += 25;

    doc.setFontSize(12);
    if (candidateName) doc.text(`Candidate: ${candidateName}`, margin, y);
    y += 16;
    doc.text(`Role: ${role}`, margin, y);
    y += 16;
    doc.text(`Level: ${level}`, margin, y);
    y += 16;
    doc.text(`Date: ${new Date().toLocaleString()}`, margin, y);
    y += 20;

    questions.forEach((q, idx) => {
      doc.setFontSize(13);
      doc.setTextColor(30, 30, 30);
      doc.text(`Q${idx + 1}. ${q.question}`, margin, y);
      y += 18;

      // Rubric options (1–5)
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      q.rubric.forEach((r) => {
        const text = `${r.score}: ${r.desc}`;
        doc.text(`• ${text}`, margin + 15, y);
        y += 14;
      });

      // Score + notes
      const score = feedback[q.id]?.score
        ? `Score: ${feedback[q.id].score}/5`
        : "Score: Not given";
      const notes = feedback[q.id]?.notes?.trim() || "No notes provided.";

      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      y += 4;
      doc.text(score, margin, y);
      y += 14;

      // Notes wrapped nicely
      const noteLines = doc.splitTextToSize(`Notes: ${notes}`, 500);
      doc.text(noteLines, margin, y);
      y += noteLines.length * 14 + 10;

      // Separator line
      doc.setDrawColor(200);
      doc.line(margin, y, 550, y);
      y += 20;

      // Auto page-break if needed
      if (y > 750) {
        doc.addPage();
        y = margin;
      }
    });

    doc.save(`${candidateName || "interview"}_feedback.pdf`);
  };

  // ✅ Generate shareable link (mock)
  const generateShareLink = async () => {
    const shareData = {
      candidateName,
      role,
      level,
      feedback,
      questions,
      timestamp: Date.now(),
    };

    const encoded = btoa(JSON.stringify(shareData));
    const shareLink = `${window.location.origin}/interview-questions?data=${encoded}`;

    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Share link copied to clipboard!");
    } catch {
      toast(
        () => (
          <span>
            Couldn’t copy link.{" "}
            <a
              href={shareLink}
              className="underline text-blue-500 ml-1"
              target="_blank"
              rel="noreferrer"
            >
              Click to view
            </a>
          </span>
        ),
        { duration: 6000 }
      );
    }
  };

  // ✅ Save feedback locally
  const saveFeedback = () => {
    if (isSharedView) {
      toast.error("Cannot save feedback in shared view.");
      return;
    }

    if (Object.keys(feedback).length === 0) {
      toast.error("No feedback to save yet.");
      return;
    }

    const payload = {
      candidateName,
      role,
      level,
      feedback,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("interviewFeedback", JSON.stringify(payload));
    toast.success("Feedback saved successfully!");
  };

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted mt-10">
        No questions available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Back */}
      {!isSharedView && (
        <button
          onClick={() => navigate(-1)}
          className="mb-6 font-semibold flex items-center text-accent hover:opacity-90"
        >
          ← Back
        </button>
      )}

      {/* Header Card */}
      <div className="rounded-2xl shadow-lg p-6 mb-6 bg-surface border border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-fg">
              {isSharedView
                ? "Shared Interview Feedback"
                : "Interview Questions"}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm">
              {role && (
                <span className="px-3 py-1 rounded-full font-semibold bg-accent/10 text-accent border border-accent/20">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  {role}
                </span>
              )}
              {level && (
                <span className="px-3 py-1 rounded-full font-semibold bg-elevated text-fg border border-border">
                  {level}
                </span>
              )}
              {candidateName && (
                <span className="px-3 py-1 rounded-full font-semibold bg-elevated text-fg border border-border">
                  <User className="w-4 h-4 inline mr-1" />
                  {candidateName}
                </span>
              )}
              {isSharedView && (
                <span
                  className="
                  px-3 py-1 
                  rounded-full 
                  font-semibold 
                  bg-[var(--color-status-view-bg)] 
                  text-[var(--color-status-view-text)] 
                  border border-[var(--color-border)]
                  flex items-center gap-1
                  "
                >
                  <Eye className="w-4 h-4" />
                  Read-only View
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          {!isSharedView && (
            <div className="flex gap-3">
              <button
                onClick={exportToPDF}
                className="px-4 py-2 rounded-lg flex items-center font-semibold bg-elevated text-fg hover:opacity-90 border border-border focus:ring-2 focus:ring-ring"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <button
                onClick={generateShareLink}
                className="px-4 py-2 bg-accent text-onaccent rounded-lg flex items-center font-semibold hover:opacity-90 focus:ring-2 focus:ring-ring"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-xl shadow-lg p-6 bg-surface border border-border"
          >
            <h3 className="text-lg font-bold mb-3 text-fg">
              <span className="text-accent">Q{idx + 1}.</span>
              <span className="ml-2">{q.question}</span>
            </h3>

            <div className="rounded-lg p-4 mb-4 bg-elevated">
              <h4 className="text-sm font-semibold mb-3 text-fg">
                Scoring Rubric (1-5)
              </h4>
              <div className="space-y-2">
                {q.rubric.map((r) => (
                  <label
                    key={r.score}
                    className={`flex items-start p-3 rounded-lg border-2 transition-colors ${
                      feedback[q.id]?.score === r.score
                        ? "bg-accent/10 border-accent"
                        : "bg-surface border-border"
                    } ${
                      !isSharedView
                        ? "cursor-pointer hover:border-border/80"
                        : "opacity-70 cursor-not-allowed"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`score-${q.id}`}
                      value={r.score}
                      checked={feedback[q.id]?.score === r.score}
                      onChange={(e) =>
                        updateFeedback(q.id, "score", parseInt(e.target.value))
                      }
                      disabled={isSharedView}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-accent">{r.score}</span>
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
                onChange={(e) => updateFeedback(q.id, "notes", e.target.value)}
                disabled={isSharedView}
                placeholder="Add your observations, strengths, areas for improvement..."
                rows="3"
                className={`w-full px-4 py-3 border-2 rounded-lg bg-surface border-border text-fg placeholder-muted focus:outline-none ${
                  isSharedView
                    ? "opacity-70 cursor-not-allowed"
                    : "focus:border-accent focus:ring-2 focus:ring-ring"
                }`}
              />
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

      {/* Save Section */}
      {!isSharedView && (
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
            <button
              onClick={saveFeedback}
              className="px-6 py-3 bg-accent text-onaccent rounded-lg flex items-center font-semibold hover:opacity-90 focus:ring-2 focus:ring-ring"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
