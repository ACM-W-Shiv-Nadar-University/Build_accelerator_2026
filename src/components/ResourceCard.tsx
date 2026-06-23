"use client";

import { ExternalLink } from "lucide-react";
import { Resource } from "@/config/program";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-blue transition-all duration-300 hover:shadow-sm flex flex-col justify-between h-full group">
      <div>
        {/* Title */}
        <h4 className="font-sans font-bold text-base text-brand-text mb-2 group-hover:text-brand-blue transition-colors">
          {resource.title}
        </h4>
        {/* Description */}
        <p className="text-xs text-brand-muted leading-relaxed mb-6 font-sans">
          {resource.description}
        </p>
      </div>

      {/* Button */}
      <div>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider font-bold text-brand-text hover:text-brand-blue transition-colors"
        >
          EXPLORE RESOURCE
          <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
