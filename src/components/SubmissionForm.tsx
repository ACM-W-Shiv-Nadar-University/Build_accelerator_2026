"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface SubmissionFormProps {
  weekNumber: number;
  onSubmitSuccess?: () => void;
}

export default function SubmissionForm({ weekNumber, onSubmitSuccess }: SubmissionFormProps) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [prototypeLink, setPrototypeLink] = useState("");
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          week: weekNumber,
          projectTitle,
          projectDomain,
          githubLink,
          prototypeLink,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project.");
      }

      setSuccessMessage("Your project has been submitted successfully.");
      
      // Clear form
      setProjectTitle("");
      setProjectDomain("");
      setGithubLink("");
      setPrototypeLink("");
      setDescription("");

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8">
      <h3 className="font-sans font-bold text-lg text-brand-text mb-2">
        Submit Week {weekNumber} Project
      </h3>
      <p className="text-xs text-brand-muted mb-6">
        Submit your project details below. You can submit only once per week.
      </p>

      {/* Success Banner */}
      {successMessage && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-sm mb-6 animate-fade-in">
          <CheckCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <span className="font-sans leading-tight">{successMessage}</span>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-sm mb-6 animate-fade-in">
          <AlertCircle size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <span className="font-sans leading-tight">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Project Title */}
        <div>
          <label htmlFor="title" className="block font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold mb-2">
            Project Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. Campus Event Finder"
            className="w-full bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-brand-orange focus:bg-brand-bg transition-colors"
          />
        </div>

        {/* Project Domain */}
        <div>
          <label htmlFor="domain" className="block font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold mb-2">
            Project Domain *
          </label>
          <input
            id="domain"
            type="text"
            required
            value={projectDomain}
            onChange={(e) => setProjectDomain(e.target.value)}
            placeholder="e.g. EdTech, HealthTech, FinTech, DevTools"
            className="w-full bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-brand-orange focus:bg-brand-bg transition-colors"
          />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* GitHub Repository Link */}
          <div>
            <label htmlFor="github" className="block font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold mb-2">
              GitHub Repository Link *
            </label>
            <input
              id="github"
              type="url"
              required
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-brand-orange focus:bg-brand-bg transition-colors"
            />
          </div>

          {/* Deployed Prototype Link */}
          <div>
            <label htmlFor="prototype" className="block font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold mb-2">
              Deployed Prototype Link
            </label>
            <input
              id="prototype"
              type="url"
              value={prototypeLink}
              onChange={(e) => setPrototypeLink(e.target.value)}
              placeholder="https://your-app.vercel.app"
              className="w-full bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-brand-orange focus:bg-brand-bg transition-colors"
            />
          </div>
        </div>

        {/* Short Project Description */}
        <div>
          <label htmlFor="desc" className="block font-mono text-[10px] tracking-wider text-brand-muted uppercase font-bold mb-2">
            Short Project Description *
          </label>
          <textarea
            id="desc"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a 2-3 sentence overview of the problem you are solving and your tech stack."
            className="w-full bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-brand-orange focus:bg-brand-bg transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-brand-btn-dark hover:bg-brand-orange text-brand-bg font-sans font-bold text-xs py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              SUBMITTING...
            </>
          ) : (
            <>
              <Send size={14} />
              SUBMIT WEEK {weekNumber} PROJECT
            </>
          )}
        </button>

      </form>
    </div>
  );
}
