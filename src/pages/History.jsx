// TODO: Needs Refactoring
import { useState, useEffect } from "react";
import {
  Clock,
  FileText,
  Trash2,
  ChevronRight,
  User,
  Upload,
  Home,
  RefreshCw,
} from "lucide-react";
import HomeHeader from "../components/HomeHeader";

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

      // Mock API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response data
      const mockData = [
        {
          id: "1",
          role: "Senior Frontend Developer",
          experience: "5+ years",
          skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"],
          type: "manual",
          questionCount: 15,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        {
          id: "2",
          role: "Full Stack Engineer",
          experience: "3-5 years",
          skills: [
            "JavaScript",
            "Python",
            "Django",
            "PostgreSQL",
            "AWS",
            "Docker",
            "Redis",
          ],
          type: "resume",
          questionCount: 20,
          timestamp: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000
          ).toISOString(), // 1 day ago
        },
        {
          id: "3",
          role: "Backend Developer",
          experience: "2-3 years",
          skills: ["Java", "Spring Boot", "MongoDB", "Kubernetes"],
          type: "manual",
          questionCount: 12,
          timestamp: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000
          ).toISOString(), // 3 days ago
        },
        {
          id: "4",
          role: "DevOps Engineer",
          experience: "5+ years",
          skills: ["AWS", "Terraform", "Jenkins", "Kubernetes", "Docker"],
          type: "resume",
          questionCount: 18,
          timestamp: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 1 week ago
        },
        {
          id: "5",
          role: "UI/UX Developer",
          experience: "1-2 years",
          skills: ["HTML", "CSS", "JavaScript", "Figma"],
          type: "manual",
          questionCount: 10,
          timestamp: new Date(
            Date.now() - 14 * 24 * 60 * 60 * 1000
          ).toISOString(), // 2 weeks ago
        },
      ];

      setHistory(mockData);
    } catch (err) {
      console.error("Error loading history:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/history/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add your auth token if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item. Please try again.");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
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
  }

  if (error) {
    return (
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
  }

  return (
    <div className="min-h-screen text-fg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <HomeHeader />
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
              className="inline-flex items-center px-6 py-3 bg-accent text-onaccent rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl p-6 bg-surface border border-border hover:border-accent transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 flex-shrink-0">
                        {item.type === "resume" ? (
                          <Upload className="w-5 h-5 text-accent" />
                        ) : (
                          <User className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-fg truncate">
                          {item.role || "Interview Questions"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatDate(
                              item.timestamp ||
                                item.createdAt ||
                                item.created_at
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {item.experience && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-muted">
                          Experience:{" "}
                        </span>
                        <span className="text-sm text-fg">
                          {item.experience}
                        </span>
                      </div>
                    )}

                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.skills.slice(0, 5).map((skill, idx) => (
                          <span
                            key={idx}
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
                    )}

                    <div className="text-sm text-muted">
                      {item.questionCount || item.question_count || 0} questions
                      generated
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        (window.location.href = `/results/${item.id}`)
                      }
                      className="p-2 hover:bg-elevated rounded-lg transition-colors group-hover:text-accent"
                      title="View questions"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this item?")
                        ) {
                          deleteItem(item.id);
                        }
                      }}
                      className="p-2 hover:bg-error-bg rounded-lg transition-colors text-muted hover:text-error-icon"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
