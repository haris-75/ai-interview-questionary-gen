import { useState, useEffect } from "react";
import {
  Clock,
  FileText,
  Trash2,
  ChevronRight,
  User,
  Upload,
  RefreshCw,
} from "lucide-react";
import HomeHeader from "../components/HomeHeader";
import { sampleHistory } from "../constants";
import { formatTimeStamp } from "../utils";

const HistoryLoader = () => (
  <div className="min-h-screen text-fg p-6">
    <div className="max-w-4xl mx-auto">
      <HomeHeader />

      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-muted">Loading history...</p>
      </div>
    </div>
  </div>
);
const HistoryEmpty = ({ error, loadHistory }) => (
  <div className="min-h-screen text-fg p-6">
    <div className="max-w-4xl mx-auto">
      <HomeHeader />

      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-error-bg flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-error-icon" />
        </div>
        <h3 className="text-xl font-semibold text-fg mb-2">
          Failed to Load History
        </h3>
        <p className="text-error-text mb-6">{error}</p>
        <button
          onClick={loadHistory}
          className="inline-flex items-center px-6 py-3 bg-accent text-onaccent rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  </div>
);

const HistoryCard = ({ item, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const viewQuestions = () => {
    // Navigate to questions page with item ID
  };

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => {
    onDelete(item.id);
    setShowConfirm(false);
  };
  const cancelDelete = () => setShowConfirm(false);

  const timeStamp = formatTimeStamp(
    item.timestamp || item.createdAt || item.created_at
  );

  return (
    <>
      <article className="rounded-xl p-6 bg-surface border border-border hover:border-accent transition-all group">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 flex-shrink-0">
                {item.type === "resume" ? (
                  <Upload className="w-5 h-5 text-accent" />
                ) : (
                  <User className="w-5 h-5 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-fg break-words">
                  {item.role || "Interview Questions"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="w-4 h-4" />
                  <span>{timeStamp}</span>
                </div>
              </div>
            </div>

            {item.experience ? (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-muted">Experience:</span>
                <span className="text-fg">{item.experience}</span>
              </div>
            ) : null}

            {item.skills && item.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.skills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="px-3 py-1 bg-elevated text-fg text-sm rounded-full border border-border"
                  >
                    {skill}
                  </span>
                ))}
                {item.skills.length > 5 && (
                  <span className="px-3 py-1 text-muted text-sm">
                    +{item.skills.length - 5} more
                  </span>
                )}
              </div>
            ) : null}

            <div className="text-sm text-muted">
              {item.questionCount || item.question_count || 0} questions
              generated
            </div>
          </div>

          <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-3">
            <button
              onClick={viewQuestions}
              className="p-2 hover:bg-elevated rounded-lg transition-colors group-hover:text-accent flex items-center justify-center w-10 h-10 cursor-pointer"
              title="View questions"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-muted flex items-center justify-center w-10 h-10 cursor-pointer transition-colors transition-transform duration-200 hover:bg-error-bg hover:text-error-icon hover:scale-105"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </article>

      {showConfirm ? (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={cancelDelete}
        >
          <div
            className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-fg mb-2">
              Delete this history item?
            </h4>
            <p className="text-muted text-sm mb-5">
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-border text-muted hover:bg-elevated transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-error-bg text-error-text font-semibold transition-colors transition-transform duration-200 hover:bg-error-bg/80 hover:text-error-icon hover:scale-105 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setHistory(sampleHistory);
    } catch (err) {
      console.error("Error loading history:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return <HistoryLoader />;
  }

  if (error) {
    return <HistoryEmpty error={error} loadHistory={loadHistory} />;
  }

  return (
    <div className="min-h-screen text-fg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <HomeHeader />
          {/* Todo we might need it when history module is integrated */}
          {/* <div className="flex gap-3">
            <button
              onClick={loadHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-accent transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-accent transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>
          </div> */}
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-fg mb-2">Interview History</h2>
          <p className="text-muted">
            View your previously generated interview questions
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl p-12 border-2 border-dashed border-border bg-surface text-center">
            <FileText className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-fg mb-2">
              No History Yet
            </h3>
            <p className="text-muted mb-6">
              Generate your first set of interview questions to see them here
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center px-6 py-3 bg-accent text-onaccent rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get Started <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <HistoryCard key={item.id} item={item} onDelete={deleteItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
