"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToWeeks = () => {
    const element = document.getElementById("weeks");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-24 border-b border-brand-border bg-brand-bg">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#BE6B24 1.5px, transparent 1.5px), radial-gradient(#BE6B24 1.5px, #F8F3EA 1.5px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Content */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border bg-brand-card mb-6">
              <Sparkles size={12} className="text-brand-orange animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase font-bold">
                ACM-W | SNU
              </span>
            </div>

            {/* Big Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-text tracking-tight leading-none mb-6">
              Summer Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text via-brand-orange to-brand-orange/80">
                Program 2026
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-brand-muted max-w-xl mb-8 leading-relaxed font-sans">
              Build, submit, learn, and get ranked every single week. A focused 4-week student building sprint across development and machine learning.
            </p>

            {/* Configured Pills */}
            <div className="flex flex-wrap gap-2 mb-10 max-w-xl">
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 0: Resources
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 1: Student Survival
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 2: Tech for Impact
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 3: Build Your Brand
              </span>
            </div>

            {/* Button */}
            <button
              onClick={scrollToWeeks}
              className="group flex items-center gap-2 bg-brand-btn-dark hover:bg-brand-orange text-brand-bg font-sans font-medium text-sm py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-lg"
            >
              View Weeks
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Concentric Animated Orbits */}
          <div className="md:col-span-5 flex justify-center items-center py-6">
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
              
              {/* Outer Orbit (Speed: 30s) */}
              <div className="absolute w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-dashed border-brand-border/80 animate-spin-slow">
                {/* Node: CAREER */}
                <div className="absolute -top-3 left-[calc(50%-40px)] w-20 h-6 bg-brand-card border border-brand-orange/60 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase font-bold">
                    CAREER
                  </span>
                </div>
              </div>

              {/* Middle Orbit (Speed: 25s, Reverse) */}
              <div className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full border border-brand-border animate-spin-reverse">
                {/* Node: DATA SCIENCE */}
                <div className="absolute top-[calc(50%-12px)] -left-14 w-28 h-6 bg-brand-card border border-brand-border rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <span className="font-mono text-[9px] tracking-widest text-brand-text uppercase font-bold">
                    DATA SCIENCE
                  </span>
                </div>
                {/* Node: IMPACT */}
                <div className="absolute top-[calc(50%-12px)] -right-10 w-20 h-6 bg-brand-card border border-brand-border rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <span className="font-mono text-[9px] tracking-widest text-brand-text uppercase font-bold">
                    IMPACT
                  </span>
                </div>
              </div>

              {/* Inner Orbit (Speed: 15s) */}
              <div className="absolute w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full border border-dashed border-brand-border/60 animate-spin-slow">
                {/* Node: WEB DEV */}
                <div className="absolute -top-3 left-[calc(50%-35px)] w-18 h-6 bg-brand-card border border-brand-border rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <span className="font-mono text-[8px] tracking-widest text-brand-text uppercase font-bold">
                    WEB DEV
                  </span>
                </div>
                {/* Node: AI/ML */}
                <div className="absolute -bottom-3 left-[calc(50%-25px)] w-14 h-6 bg-brand-card border border-brand-border rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <span className="font-mono text-[8px] tracking-widest text-brand-text uppercase font-bold">
                    AI/ML
                  </span>
                </div>
              </div>

              {/* Core logo circle */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-card border border-brand-border flex flex-col items-center justify-center shadow-md animate-pulse-subtle">
                <span className="font-mono text-xs font-bold tracking-widest text-brand-orange">
                  ACM-W
                </span>
                <span className="font-sans text-[9px] font-bold text-brand-text tracking-wider mt-1">
                  SNU
                </span>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
