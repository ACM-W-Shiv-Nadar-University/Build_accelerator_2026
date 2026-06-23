"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const scrollToWeeks = () => {
    const element = document.getElementById("weeks");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-24 border-b border-brand-border bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headline and Content */}
          <div className="md:col-span-6 flex flex-col items-start text-left">

            {/* Big Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-text tracking-tight leading-none mb-6">
              Build Accelerator <br />
              <span className="text-brand-blue">
                2026
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-brand-muted max-w-xl mb-8 leading-relaxed font-sans">
              Build, submit, learn, and get ranked every single week. A focused 4-week student building sprint across development and machine learning.
            </p>

            {/* Configured Pills */}
            <div className="flex flex-wrap gap-2 mb-10 max-w-xl">
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 1: Resources
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 2: Student Survival
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 3: Tech for Impact
              </span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider bg-brand-card border border-brand-border text-brand-text">
                Week 4: Build Your Brand
              </span>
            </div>

            {/* Button */}
            <button
              onClick={scrollToWeeks}
              className="group flex items-center gap-2 bg-brand-btn-dark hover:bg-brand-blue text-brand-bg font-sans font-medium text-sm py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-lg"
            >
              View Weeks
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="md:col-span-6 flex justify-center items-center py-6">
            <div className="relative w-full max-w-[520px] transition-all duration-500 hover:scale-[1.02] flex items-center justify-center">
              <Image
                src="/hero-illustration.png"
                alt="ACM-W Build Accelerator 2026 Illustration"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
