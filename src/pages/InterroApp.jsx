import { Upload, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import HomeHeader from "../components/HomeHeader";

export default function InterroApp() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl w-full h-full flex justify-center flex-col xsmd:gap-8 gap-6 items-center">
      <HomeHeader />

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate(ROUTES.SHARE_DETAILS)}
          className="rounded-2xl xsmd:p-8 p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 bg-surface border-border hover:border-accent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="xsmd:w-20 xsmd:h-20 w-16 h-16 rounded-full flex items-center justify-center xsmd:mb-4 mb-3 bg-accent/10">
              <User className="xsmd:w-10 xsmd:h-10 w-8 h-8 text-accent" />
            </div>
            <h2 className="xsmd:text-2xl text-xl font-bold xsmd:mb-3 mb-2 text-fg">
              Share Your Details
            </h2>
            <p className="xsmd:mb-4 mb-3 xsmd:text-base text-sm text-muted">
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
          className="rounded-2xl xsmd:p-8 p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 bg-surface border-border hover:border-accent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="xsmd:w-20 xsmd:h-20 w-16 h-16 rounded-full flex items-center justify-center xsmd:mb-4 mb-3 bg-accent/10">
              <Upload className="xsmd:w-10 xsmd:h-10 w-8 h-8 text-accent" />
            </div>
            <h2 className="xsmd:text-2xl text-xl font-bold xsmd:mb-3 mb-2 text-fg">
              Upload Resume
            </h2>
            <p className="xsmd:mb-4 mb-3 xsmd:text-base text-sm text-muted">
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
