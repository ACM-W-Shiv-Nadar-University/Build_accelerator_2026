"use client";

import { Calendar, Globe, Loader2, CheckCircle2, Eye, Award } from "lucide-react";
import { Submission } from "@/lib/sheets";

const GithubIcon = ({ size = 14 }) => (
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

interface ProfileSubmissionCardProps {
  weekNumber: number;
  submission?: Submission;
}

export default function ProfileSubmissionCard({ weekNumber, submission }: ProfileSubmissionCardProps) {
  
  // Status styling configurations
  const statusConfig = {
    "Submitted": {
      label: "SUBMITTED",
      bgClass: "bg-zinc-100 text-zinc-600 border-zinc-200",
      icon: <CheckCircle2 size={12} className="text-zinc-500" />
    },
    "Under Review": {
      label: "UNDER REVIEW",
      bgClass: "bg-amber-50 text-amber-600 border-amber-200",
      icon: <Loader2 size={12} className="animate-spin text-amber-500" />
    },
    "Shortlisted": {
      label: "SHORTLISTED",
      bgClass: "bg-indigo-50 text-indigo-600 border-indigo-200",
      icon: <Eye size={12} className="text-indigo-500" />
    },
    "Ranked": {
      label: "RANKED",
      bgClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: <Award size={12} className="text-emerald-500" />
    }
  };

  const statusInfo = submission ? (statusConfig[submission.status] || statusConfig["Submitted"]) : null;

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 hover:shadow-sm transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-brand-orange" />
          <h4 className="font-mono text-xs tracking-wider font-extrabold text-brand-text uppercase">
            Week 0{weekNumber} Submission
          </h4>
        </div>

        {submission && statusInfo && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono font-bold tracking-wider ${statusInfo.bgClass}`}>
            {statusInfo.icon}
            {statusInfo.label}
          </span>
        )}
      </div>

      {submission ? (
        <div className="space-y-4">
          
          {/* Project Details */}
          <div>
            <h5 className="font-sans font-bold text-lg text-brand-text mb-1">
              {submission.projectTitle}
            </h5>
            <p className="font-mono text-xs text-brand-orange mb-3">
              Domain: {submission.projectDomain}
            </p>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
              {submission.description}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-border/60">
            {submission.githubLink && (
              <a
                href={submission.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono tracking-wider font-bold text-brand-text hover:text-brand-orange transition-colors"
              >
                <GithubIcon size={14} />
                GITHUB REPOSITORY
              </a>
            )}

            {submission.prototypeLink && (
              <a
                href={submission.prototypeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono tracking-wider font-bold text-brand-text hover:text-brand-orange transition-colors"
              >
                <Globe size={14} />
                LIVE PROTOTYPE
              </a>
            )}
          </div>

          {/* Score details (if ranked) */}
          {submission.status === "Ranked" && submission.score !== null && (
            <div className="mt-4 p-3 bg-brand-bg/50 border border-brand-border rounded-xl flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold">
                Evaluation Score
              </span>
              <span className="font-mono text-sm font-extrabold text-brand-orange">
                {submission.score} / 100
              </span>
            </div>
          )}

        </div>
      ) : (
        /* Empty State */
        <div className="py-6 text-center">
          <p className="font-sans text-xs text-brand-muted italic font-medium">
            No submission yet.
          </p>
        </div>
      )}

    </div>
  );
}
