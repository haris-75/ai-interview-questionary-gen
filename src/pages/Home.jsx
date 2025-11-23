import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ROUTES from "../routes";
import { HOME_BENEFITS, HOME_FEATURES, HOW_IT_WORKS_STEPS } from "../constants";

const HeroSection = ({ onNavigate }) => (
  <section className="relative z-10 max-w-6xl mx-auto xs:px-6 px-4 lg:py-16 md:py-14 xsmd:py-12 py-10 text-center">
    <div className="relative">
      <div className="absolute inset-0 bg-accent/20 blur-xl opacity-50 animate-pulse" />
      <h1 className="text-5xl xsmd:text-6xl md:text-8xl font-black relative text-fg">
        /interro-ai
      </h1>
    </div>
    <div className="text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold md:mb-8 xsmd:mb-6 mb-4 animate-fade-in">
        <Zap className="w-4 h-4" />
        AI-Powered Interview Assistant
      </div>

      <h2 className="text-3xl xsmd:text-5xl md:text-6xl font-black text-fg md:mb-6 xsmd:mb-5 mb-4 leading-tight animate-slide-up">
        Generate Role-Specific Interview Questions in{" "}
        <span className="relative inline-block">
          <span className="relative z-10">Seconds</span>
          <div className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -rotate-1" />
        </span>
      </h2>

      <p
        className="md:text-xl xsmd:text-lg text-sm text-muted md:mb-10 xsmd:mb-8 mb-6 max-w-2xl mx-auto animate-slide-up"
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
          className="group xsmd:px-8 px-6 xsmd:py-4 py-3 rounded-xl bg-accent text-onaccent font-bold xsmd:text-lg text-base hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          onClick={onNavigate}
        >
          Start Generating Questions
          <ArrowRight className="xsmd:w-5 xsmd:h-5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="xsmd:px-8 px-6 xsmd:py-4 py-3 rounded-xl bg-surface border-2 border-border text-fg font-bold xsmd:text-lg text-base hover:border-accent transition-all duration-300 flex items-center gap-2">
          Watch Demo
          <Eye className="xsmd:w-5 xsmd:h-5 w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-8 md:mt-12 xsmd:mt-10 mt-8 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <span className="text-xs xs:text-sm">Secure & Private</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="text-xs xs:text-sm">Instant Results</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          <span className="text-xs xs:text-sm">Team Collaboration</span>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <section className="relative z-10 max-w-6xl mx-auto xs:px-6 px-4 lg:py-20 xs:py-16 py-12">
      <header className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl sm:text-3xl text-2xl font-bold text-fg mb-4">
          Everything You Need to Ace Interviews
        </h3>
        <p className="sm:text-lg text-base text-muted max-w-2xl mx-auto">
          Powerful features designed to streamline your hiring process from
          start to finish
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOME_FEATURES.map((feature, index) => (
          <article
            key={feature.title}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
            className="group relative sm:p-8 p-6 rounded-2xl bg-surface border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-xl cursor-pointer"
            style={{
              animation: `slideUp 0.6s ease-out`,
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <div
              className={`absolute inset-0 bg-accent/5 rounded-2xl transition-opacity duration-300 ${
                hoveredFeature === index ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative">
              <div
                className={`sm:w-14 sm:h-14 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center sm:mb-5 mb-3 transition-all duration-300 ${
                  hoveredFeature === index ? "scale-110 bg-accent" : ""
                }`}
              >
                <feature.icon
                  className={`sm:w-7 sm:h-7 w-5 h-5  transition-colors duration-300 ${
                    hoveredFeature === index ? "text-onaccent" : "text-accent"
                  }`}
                />
              </div>

              <h4 className="sm:text-xl text-lg font-bold text-fg mb-3">
                {feature.title}
              </h4>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const HowItWorksSection = () => (
  <section className="relative z-10 max-w-6xl mx-auto xs:px-6 px-4 lg:py-20 xs:py-16 py-12">
    <div className="bg-surface rounded-3xl border-2 border-border lg:p-12 sm:p-9 p-8 shadow-xl">
      <header className="text-center md:mb-12 sm:mb-10 mb-8">
        <h3 className="text-3xl md:text-4xl sm:text-3xl text-2xl font-bold text-fg mb-4">
          How It Works
        </h3>
        <p className="sm:text-lg text-base text-muted">
          Two simple ways to generate interview questions
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <article
            key={step.title}
            className="lg:p-8 md:p-6 p-5 rounded-2xl bg-elevated border-2 border-border hover:border-accent transition-all duration-300"
          >
            <div className="flex items-center gap-3 sm:mb-6 mb-4">
              <div className="sm:w-10 sm:h-10 w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                {index + 1}
              </div>
              <h4 className="sm:text-2xl xs:text-xl text-lg font-bold text-fg">
                {step.title}
              </h4>
            </div>

            <div className="space-y-4">
              {step.items.map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <CheckCircle2 className="xs:w-5 xs:h-5 w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-muted lg:text-base md:text-sm sm:text-base xs:text-sm text-xs">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="md:mt-12 sm:mt-10 mt-8 lg:p-8 md:p-6 p-5 rounded-2xl bg-accent/5 border-2 border-accent/20">
        <h4 className="sm:text-2xl xs:text-xl text-lg font-bold text-fg mb-6 text-center">
          What You Can Do Next
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {HOME_BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-fg">
              <CheckCircle2 className="xs:w-5 xs:h-5 w-4 h-4 text-accent flex-shrink-0" />
              <span className="font-medium lg:text-base md:text-sm sm:text-base xs:text-sm text-xs">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="relative z-10 max-w-4xl mx-auto xs:px-6 px-4 lg:py-20 xs:py-16 py-12">
    <div className="relative overflow-hidden rounded-3xl bg-accent lg:p-12 xs:p-10 p-8 text-center shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/80" />

      <div className="relative z-10">
        <h3 className="text-2xl xs:text-3xl md:text-4xl font-bold text-onaccent mb-4">
          Ready to Transform Your Interview Process?
        </h3>
        <p className="text-sm xs:text-base md:text-lg text-onaccent/90 xs:mb-8 mb-5 max-w-2xl mx-auto">
          Join hundreds of hiring managers who are saving time and making better
          hiring decisions with Interro-AI
        </p>
        <button className="px-10 py-4 rounded-xl bg-main text-fg font-bold text-sm xs:text-base md:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
          Get Started Free
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
);

export default function Home() {
  const navigate = useNavigate();

  const navigateToApp = () => {
    navigate(ROUTES.APP);
  };

  return (
    <div className="bg-gradient-to-br from-bg to-elevated min-h-screen flex flex-col transition-colors duration-300 font-sans">
      <Navbar />
      <main className="flex-1 p-4">
        <HeroSection onNavigate={navigateToApp} />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
