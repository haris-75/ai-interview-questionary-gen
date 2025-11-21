// TODO: Needs Refactoring
import { useState } from "react";
import { User, ChevronRight, Shield, Zap } from "lucide-react";
import HomeHeader from "../components/HomeHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import { useAuth } from "../auth/AuthContext";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 533.5 544.3" className="w-5 h-5" aria-hidden>
      <path
        d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.5h146.9c-6.3 34-25.1 62.8-53.5 82.1v68.2h86.4c50.6-46.6 81.7-115.4 81.7-195.4z"
        fill="#4285F4"
      />
      <path
        d="M272 544.3c72.6 0 133.6-24 178.2-65.4l-86.4-68.2c-24 16.2-54.8 25.7-91.8 25.7-70.6 0-130.5-47.6-152-111.6H32v70.6C76 487.8 167.2 544.3 272 544.3z"
        fill="#34A853"
      />
      <path
        d="M120 324.8c-10.9-32.3-10.9-67.6 0-99.9V154.3H32C-10.7 214.9-10.7 329.4 32 389.9l88-65.1z"
        fill="#FBBC05"
      />
      <path
        d="M272 107.7c39.6 0 75.2 13.6 103.3 40.3l77-77C405.6 24.9 345.6 0 272 0 167.2 0 76 56.5 32 154.3l88 70.6C141.5 155.3 201.4 107.7 272 107.7z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const demoToken = "google-demo-token";
      login(demoToken);
      await new Promise((r) => setTimeout(r, 1500));
      navigate(`/${ROUTES.APP}`);
    } catch (err) {
      setError(err?.message ?? "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-elevated flex items-center justify-center p-4 transition-colors duration-300 font-sans">
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="max-w-md w-full relative z-10">
          <HomeHeader />

          <div
            className="bg-surface rounded-3xl p-8 shadow-2xl border-2 border-border transform transition-all duration-500 hover:shadow-3xl hover:border-accent/30"
            style={{ animation: "slideUp 0.6s ease-out" }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-40 animate-pulse" />
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-0 bg-accent/10">
                  <User className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-fg">Welcome back</h2>
              <p className="text-sm text-muted mb-1">
                Sign in with your Google account to continue
              </p>
              <p className="text-xs text-muted/70">
                We only request the minimum scopes needed
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className="w-full group relative overflow-hidden rounded-xl p-4 font-semibold transition-all duration-300 shadow-md hover:shadow-xl border-2 border-border bg-main hover:border-accent disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-border focus:outline-none focus:ring-4 focus:ring-accent/20"
              aria-label="Sign in with Google"
            >
              <div
                className={`absolute inset-0 bg-accent/5 transition-opacity duration-300 ${
                  buttonHovered && !loading ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative flex items-center justify-center gap-3">
                <span
                  className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                    loading ? "animate-spin" : ""
                  } ${buttonHovered ? "scale-110" : ""}`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-accent border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <GoogleLogo />
                  )}
                </span>

                <span className="text-base text-fg font-semibold">
                  {loading ? "Signing you in..." : "Continue with Google"}
                </span>

                <ChevronRight
                  className={`w-5 h-5 text-muted transition-all duration-300 ${
                    buttonHovered && !loading ? "translate-x-1 text-accent" : ""
                  }`}
                />
              </div>

              {loading && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-elevated overflow-hidden rounded-b-xl">
                  <div className="h-full bg-accent animate-loading-bar" />
                </div>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-error-bg border-2 border-error-border rounded-lg animate-shake">
                <p className="text-sm text-error-text text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
              <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
                <Zap className="w-4 h-4" />
                <span>Fast</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-center text-muted/70 leading-relaxed px-2">
              By continuing you agree to our Terms of Service. We respect your
              privacy and will not share your information.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              New to interro-ai?{" "}
              <span className="text-accent font-semibold cursor-pointer hover:underline transition-colors">
                Learn more
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
