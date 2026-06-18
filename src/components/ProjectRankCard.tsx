"use client";

import { Award, Globe } from "lucide-react";
import { Submission } from "@/lib/sheets";

const GithubIcon = ({ size = 12 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectRankCard({ project }: { project: Submission }) {
  const rank = project.rank || 0;
  
  // Style config based on rank
  const rankConfig = {
    1: {
      label: "RANK 1",
      bgClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      borderClass: "border-amber-500/30",
      accentDot: "bg-amber-500"
    },
    2: {
      label: "RANK 2",
      bgClass: "bg-slate-400/10 text-slate-600 border-slate-400/20",
      borderClass: "border-brand-border hover:border-slate-400/50",
      accentDot: "bg-slate-400"
    },
    3: {
      label: "RANK 3",
      bgClass: "bg-amber-700/10 text-amber-800 border-amber-700/20",
      borderClass: "border-brand-border hover:border-amber-700/50",
      accentDot: "bg-amber-700"
    }
  }[rank as 1 | 2 | 3] || {
    label: `RANK ${rank}`,
    bgClass: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    borderClass: "border-brand-border",
    accentDot: "bg-brand-orange"
  };

  return (
    <div className={`relative bg-brand-card border rounded-2xl p-6 transition-all duration-300 ${rankConfig.borderClass} ${rank === 1 ? "shadow-md hover:shadow-lg" : "hover:shadow-sm"} flex flex-col justify-between`}>
      
      {/* Top section */}
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          {/* Rank Badge */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider ${rankConfig.bgClass}`}>
            <Award size={10} />
            {rankConfig.label}
          </span>
          
          {/* Score Badge */}
          {project.score !== null && (
            <span className="font-mono text-xs text-brand-orange font-bold">
              SCORE: {project.score}/100
            </span>
          )}
        </div>

        {/* Project Title */}
        <h4 className="font-sans font-bold text-lg text-brand-text mb-1">
          {project.projectTitle}
        </h4>
        
        {/* Team Name */}
        <p className="font-mono text-xs text-brand-orange mb-3 font-semibold">
          {project.teamName}
        </p>

        {/* Description / Idea Summary */}
        <p className="text-xs text-brand-muted leading-relaxed mb-6 font-sans">
          {project.description}
        </p>
      </div>

      {/* Links Footer */}
      <div className="flex items-center gap-3 border-t border-brand-border pt-4 mt-auto">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-brand-muted hover:text-brand-text transition-colors"
          >
            <GithubIcon size={12} />
            GITHUB
          </a>
        )}
        
        {project.prototypeLink && (
          <a
            href={project.prototypeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-brand-muted hover:text-brand-text transition-colors"
          >
            <Globe size={12} />
            PROTOTYPE
          </a>
        )}
      </div>

    </div>
  );
}
