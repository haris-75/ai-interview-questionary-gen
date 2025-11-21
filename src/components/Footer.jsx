import { Sparkles } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="absolute z-10 border-t border-border bg-bg backdrop-blur-sm w-full">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-onaccent" />
            </div>
            <span className="text-xl font-bold text-fg">/interro-ai</span>
          </div>

          <p className="text-sm text-muted">
            © 2024 Interro-AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
