import { Upload, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import HomeHeader from "../components/HomeHeader";

export default function InterroApp() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl w-full h-full flex justify-center flex-col gap-8 items-center">
      <HomeHeader />

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate(ROUTES.SHARE_DETAILS)}
          className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 bg-surface border-border hover:border-accent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-accent/10">
              <User className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-fg">
              Share Your Details
            </h2>
            <p className="mb-4 text-muted">
              Enter role, level, and skills manually to generate customized
              interview questions
            </p>
            <div className="flex items-center font-semibold text-accent">
              Get Started <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate(ROUTES.SHARE_RESUME)}
          className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 bg-surface border-border hover:border-accent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-accent/10">
              <Upload className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-fg">Upload Resume</h2>
            <p className="mb-4 text-muted">
              Upload a resume PDF and we'll automatically extract relevant
              information
            </p>
            <div className="flex items-center font-semibold text-accent">
              Upload File <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
