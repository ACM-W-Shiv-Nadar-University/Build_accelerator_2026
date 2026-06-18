"use client";

import { PROGRAM_CONFIG } from "@/config/program";
import { ClipboardList, BookOpen, Code, Trophy } from "lucide-react";

export default function Timeline() {
  const icons = [
    <ClipboardList key="1" className="text-brand-orange" size={18} />,
    <BookOpen key="2" className="text-brand-orange" size={18} />,
    <Code key="3" className="text-brand-orange" size={18} />,
    <Trophy key="4" className="text-brand-orange" size={18} />
  ];

  return (
    <section id="timeline" className="py-20 bg-brand-bg border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-widest text-brand-orange uppercase mb-3 font-bold">
            Roadmap
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight">
            Program Schedule
          </h2>
          <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-brand-border ml-4 md:ml-32 pl-8 md:pl-10 space-y-12 py-2">
          {PROGRAM_CONFIG.timeline.map((item, idx) => {
            const phaseNumber = idx + 1;
            return (
              <div key={idx} className="relative group">
                
                {/* Timeline Connector Dot / Bubble */}
                <div className="absolute -left-[45px] md:-left-[53px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border border-brand-border bg-brand-card shadow-sm group-hover:border-brand-orange transition-colors duration-300">
                  {icons[idx] || phaseNumber}
                </div>

                {/* Desktop Left-aligned Phase Number */}
                <div className="hidden md:block absolute -left-44 top-2 text-right w-24">
                  <span className="font-mono text-xs tracking-widest text-brand-muted uppercase font-bold group-hover:text-brand-orange transition-colors">
                    Phase 0{phaseNumber}
                  </span>
                </div>

                {/* Timeline Card Content */}
                <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none rounded-tr-2xl" />

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className="md:hidden font-mono text-[10px] tracking-wider text-brand-orange uppercase font-bold">
                      Phase 0{phaseNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-text group-hover:text-brand-orange transition-colors">
                      {item.phase.replace(/^Phase \d+: /, "")}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
