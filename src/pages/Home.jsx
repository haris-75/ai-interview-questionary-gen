// TODO: Needs Refactoring
import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Eye,
  Share2,
  ChevronRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: FileText,
      title: "Resume-Based Questions",
      description:
        "Upload a resume and instantly generate tailored interview questions based on the candidate's experience and skills.",
      color: "accent",
    },
    {
      icon: Sparkles,
      title: "Custom Criteria",
      description:
        "Generate questions using specific metrics: role, experience level, required skills, and years of experience.",
      color: "accent",
    },
    {
      icon: Download,
      title: "Export as PDF",
      description:
        "Save generated questions with scoring rubrics as professional PDFs for easy distribution and record-keeping.",
      color: "accent",
    },
    {
      icon: Eye,
      title: "View Answers",
      description:
        "Access sample answers and scoring guidelines to help evaluate candidate responses effectively.",
      color: "accent",
    },
    {
      icon: Share2,
      title: "Share Questions",
      description:
        "Generate shareable links to collaborate with your hiring team and streamline the interview process.",
      color: "accent",
    },
  ];

  const benefits = [
    "AI-powered question generation",
    "Role-specific scoring rubrics",
    "Save hours of prep time",
    "Standardized interview process",
  ];

  const navigate = useNavigate();

  const navigateToApp = () => {
    navigate(ROUTES.APP);
  };

  return (
    <div className="min-h-screen">
      {/* Animated background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div> */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="relative text-center">
          <div className="absolute inset-0 bg-accent/20 blur-xl opacity-50 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black relative text-fg">
            /interro-ai
          </h1>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            AI-Powered Interview Assistant
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-fg mb-6 leading-tight animate-slide-up">
            Generate Role-Specific Interview Questions in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Seconds</span>
              <div className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -rotate-1" />
            </span>
          </h2>

          <p
            className="text-xl text-muted mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Create comprehensive interview questions with scoring rubrics from
            resumes or custom criteria. Save time, standardize your process, and
            hire better.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <button
              className="group px-8 py-4 rounded-xl bg-accent text-onaccent font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              onClick={navigateToApp}
            >
              Start Generating Questions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-surface border-2 border-border text-fg font-bold text-lg hover:border-accent transition-all duration-300 flex items-center gap-2">
              Watch Demo
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <span>Team Collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-fg mb-4">
            Everything You Need to Ace Interviews
          </h3>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Powerful features designed to streamline your hiring process from
            start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative p-8 rounded-2xl bg-surface border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{
                animation: `slideUp 0.6s ease-out`,
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {/* Hover background effect */}
              <div
                className={`absolute inset-0 bg-accent/5 rounded-2xl transition-opacity duration-300 ${
                  hoveredFeature === index ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 transition-all duration-300 ${
                    hoveredFeature === index ? "scale-110 bg-accent" : ""
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredFeature === index ? "text-onaccent" : "text-accent"
                    }`}
                  />
                </div>

                <h4 className="text-xl font-bold text-fg mb-3">
                  {feature.title}
                </h4>

                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="bg-surface rounded-3xl border-2 border-border p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-fg mb-4">
              How It Works
            </h3>
            <p className="text-lg text-muted">
              Two simple ways to generate interview questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Method 1 */}
            <div className="p-8 rounded-2xl bg-elevated border-2 border-border hover:border-accent transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                  1
                </div>
                <h4 className="text-2xl font-bold text-fg">From Resume</h4>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">
                    Upload candidate's resume (PDF/DOCX)
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">
                    AI analyzes experience and skills
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">Get tailored questions instantly</p>
                </div>
              </div>
            </div>

            {/* Method 2 */}
            <div className="p-8 rounded-2xl bg-elevated border-2 border-border hover:border-accent transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                  2
                </div>
                <h4 className="text-2xl font-bold text-fg">Custom Criteria</h4>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">
                    Enter role, experience level, skills
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">
                    Specify years of experience needed
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted">Generate role-specific questions</p>
                </div>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="mt-12 p-8 rounded-2xl bg-accent/5 border-2 border-accent/20">
            <h4 className="text-xl font-bold text-fg mb-6 text-center">
              What You Can Do Next
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-fg">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-accent p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/80" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-onaccent mb-4">
              Ready to Transform Your Interview Process?
            </h3>
            <p className="text-lg text-onaccent/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of hiring managers who are saving time and making
              better hiring decisions with Interro-AI
            </p>
            <button className="px-10 py-4 rounded-xl bg-main text-fg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              Get Started Free
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
