import React from "react";

export default function HomeHeader() {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-block mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl opacity-50 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-black relative text-fg">
            /interro-ai
          </h1>
        </div>
      </div>
      <p className="text-lg text-muted font-medium px-4">
        Generate role-specific interview questions with scoring rubrics
      </p>
    </div>
  );
}
