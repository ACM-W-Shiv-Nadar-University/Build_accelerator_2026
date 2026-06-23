"use client";

import { useEffect, useState } from "react";
import { Lock, Unlock, BookOpen, AlertCircle, Sparkles, HelpCircle } from "lucide-react";
import { PROGRAM_CONFIG, isWeekUnlocked } from "@/config/program";
import { Submission } from "@/lib/sheets";
import ResourceCard from "./ResourceCard";
import ProjectRankCard from "./ProjectRankCard";
import SubmissionForm from "./SubmissionForm";

export default function WeekTabs() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [bestProjects, setBestProjects] = useState<{ [week: number]: Submission[] }>({
    2: [],
    3: [],
    4: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch evaluated project results
  const fetchRankedProjects = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setBestProjects(data.bestProjects || { 2: [], 3: [], 4: [] });
      }
    } catch (err) {
      console.error("Error fetching ranked projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankedProjects();
  }, []);

  const handleTabClick = (weekNum: number) => {
    if (isWeekUnlocked(weekNum)) {
      setActiveTab(weekNum);
    }
  };

  const activeWeekData = PROGRAM_CONFIG.weeks.find((w) => w.number === activeTab);

  return (
    <section id="weeks" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-widest text-brand-blue uppercase mb-3 font-bold">
            CURRICULUM
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight">
            Weekly Tracks
          </h2>
          <p className="text-sm text-brand-muted max-w-md mx-auto mt-3">
            Click on the tabs below to view resources, review problem statements, and submit projects.
          </p>
          <div className="w-12 h-1 bg-brand-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Buttons Row */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {PROGRAM_CONFIG.weeks.map((week) => {
            const unlocked = isWeekUnlocked(week.number);
            const isActive = activeTab === week.number;

            return (
              <button
                key={week.number}
                onClick={() => handleTabClick(week.number)}
                disabled={!unlocked}
                className={`flex items-center gap-2 py-3 px-5 sm:px-6 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-brand-btn-dark text-brand-bg border border-brand-btn-dark shadow-md"
                    : unlocked
                    ? "bg-brand-card hover:bg-brand-border/40 text-brand-text border border-brand-border cursor-pointer"
                    : "bg-brand-border/20 text-brand-muted border border-brand-border/10 cursor-not-allowed opacity-60"
                }`}
                title={!unlocked ? `Unlocks on ${week.unlockDate}` : ""}
              >
                {!unlocked ? <Lock size={12} /> : isActive ? <Unlock size={12} className="text-brand-blue" /> : <Unlock size={12} />}
                WEEK 0{week.number}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        {activeWeekData && (
          <div className="bg-transparent animate-fade-in">
            
            {/* Week Overview Header */}
            <div className="border border-brand-border rounded-2xl bg-brand-card p-6 sm:p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-blue/5 to-transparent pointer-events-none" />
              <div className="max-w-3xl">
                <span className="font-mono text-[10px] tracking-widest text-brand-blue uppercase font-bold">
                  {activeWeekData.theme}
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-brand-text mt-2 mb-4">
                  {activeWeekData.title}
                </h3>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {activeWeekData.description}
                </p>
              </div>
            </div>

            {/* Week 1 specific Content: Resource columns */}
            {activeTab === 1 && activeWeekData.resourceSections && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {activeWeekData.resourceSections.map((section, sIdx) => (
                  <div key={sIdx} className="border border-brand-border bg-brand-bg rounded-2xl p-6 flex flex-col">
                    {/* Section Header */}
                    <div className="flex items-center gap-2 pb-4 mb-6 border-b border-brand-border">
                      <BookOpen size={16} className="text-brand-blue" />
                      <h4 className="font-mono text-xs tracking-wider font-extrabold text-brand-text uppercase">
                        {section.title}
                      </h4>
                    </div>
                    {/* Resource list */}
                    <div className="grid grid-cols-1 gap-4 flex-grow">
                      {section.resources.map((res, rIdx) => (
                        <ResourceCard key={rIdx} resource={res} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Week 2, 3, 4 specific Content: Problems, Form, Best Projects */}
            {activeTab > 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Problem Statements & Submission Form */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Problem Statements */}
                  {activeWeekData.problems && (
                    <div className="border border-brand-border rounded-2xl bg-brand-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <HelpCircle size={16} className="text-brand-blue" />
                        <h4 className="font-mono text-xs tracking-wider font-extrabold text-brand-text uppercase">
                          Example Problem Statements
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeWeekData.problems.map((prob, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs text-brand-muted leading-relaxed font-sans">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                            {prob}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Submission Form */}
                  <SubmissionForm weekNumber={activeTab} onSubmitSuccess={fetchRankedProjects} />
                </div>

                {/* Right side: Best Projects */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="border border-brand-border rounded-2xl bg-brand-card p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-brand-border pb-4">
                      <Sparkles size={16} className="text-brand-blue animate-pulse" />
                      <h4 className="font-mono text-xs tracking-wider font-extrabold text-brand-text uppercase">
                        Best Projects of Week {activeTab}
                      </h4>
                    </div>

                    {loading ? (
                      <div className="py-8 text-center font-mono text-xs text-brand-muted">
                        LOADING RESULTS...
                      </div>
                    ) : bestProjects[activeTab] && bestProjects[activeTab].length > 0 ? (
                      <div className="space-y-4">
                        {bestProjects[activeTab].map((project, projIdx) => (
                          <ProjectRankCard key={projIdx} project={project} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-brand-border rounded-xl text-center bg-brand-bg/40">
                        <AlertCircle size={24} className="text-brand-muted/60 mb-2" />
                        <p className="font-sans text-xs text-brand-muted italic font-medium">
                          Results will appear after evaluation.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
