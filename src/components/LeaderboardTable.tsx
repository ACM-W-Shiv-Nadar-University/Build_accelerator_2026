"use client";

import { useEffect, useState } from "react";
import { Trophy, ArrowUpDown, HelpCircle } from "lucide-react";
import { LeaderboardEntry } from "@/lib/sheets";

type FilterType = "Overall" | "Week 1" | "Week 2" | "Week 3";

export default function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<FilterType>("Overall");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data = await res.json();
          setEntries(data.leaderboard || []);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    let sorted = [...entries];
    if (filter === "Overall") {
      sorted.sort((a, b) => b.totalScore - a.totalScore);
    } else if (filter === "Week 1") {
      sorted.sort((a, b) => (b.week1Score || 0) - (a.week1Score || 0));
    } else if (filter === "Week 2") {
      sorted.sort((a, b) => (b.week2Score || 0) - (a.week2Score || 0));
    } else if (filter === "Week 3") {
      sorted.sort((a, b) => (b.week3Score || 0) - (a.week3Score || 0));
    }

    // Recalculate ranks based on current filter sort
    let rank = 1;
    const ranked = sorted.map((entry, idx) => {
      const getScore = (e: LeaderboardEntry) => {
        if (filter === "Overall") return e.totalScore;
        if (filter === "Week 1") return e.week1Score || 0;
        if (filter === "Week 2") return e.week2Score || 0;
        if (filter === "Week 3") return e.week3Score || 0;
        return 0;
      };

      if (idx > 0 && getScore(entry) < getScore(sorted[idx - 1])) {
        rank = idx + 1;
      }

      return { ...entry, rank };
    });

    setFilteredEntries(ranked);
  }, [entries, filter]);

  if (loading) {
    return (
      <div className="py-24 text-center font-mono text-xs text-brand-muted">
        LOADING LEADERBOARD...
      </div>
    );
  }

  // If there are no scores logged yet, display the required fallback text
  const totalSubmissionsWithScores = entries.some(e => e.totalScore > 0);
  if (entries.length === 0 || !totalSubmissionsWithScores) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 border border-dashed border-brand-border rounded-3xl text-center bg-brand-card max-w-lg mx-auto">
        <Trophy size={48} className="text-brand-muted/40 mb-4" />
        <p className="font-sans text-sm text-brand-muted italic font-medium">
          Leaderboard will be updated after evaluation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-border pb-6">
        {(["Overall", "Week 1", "Week 2", "Week 3"] as FilterType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-2 px-5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
              filter === tab
                ? "bg-brand-orange text-brand-bg shadow-sm"
                : "bg-brand-card hover:bg-brand-border/40 text-brand-text border border-brand-border cursor-pointer"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg/40 font-mono text-[10px] tracking-wider text-brand-muted uppercase">
                <th className="py-4 px-6 font-bold w-20">Rank</th>
                <th className="py-4 px-6 font-bold">Student/Team</th>
                <th className={`py-4 px-6 font-bold text-center w-28 ${filter === "Week 1" ? "text-brand-orange bg-brand-orange/5" : ""}`}>Week 1</th>
                <th className={`py-4 px-6 font-bold text-center w-28 ${filter === "Week 2" ? "text-brand-orange bg-brand-orange/5" : ""}`}>Week 2</th>
                <th className={`py-4 px-6 font-bold text-center w-28 ${filter === "Week 3" ? "text-brand-orange bg-brand-orange/5" : ""}`}>Week 3</th>
                <th className={`py-4 px-6 font-bold text-center w-32 ${filter === "Overall" ? "text-brand-orange bg-brand-orange/5" : ""}`}>Total Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredEntries.map((entry, index) => {
                const isTopThree = entry.rank <= 3;
                const rankColors = {
                  1: "bg-amber-500/10 text-amber-700 border-amber-500/20 font-extrabold",
                  2: "bg-slate-400/10 text-slate-700 border-slate-400/20 font-extrabold",
                  3: "bg-amber-700/10 text-amber-900 border-amber-700/20 font-extrabold"
                }[entry.rank as 1 | 2 | 3] || "text-brand-text font-mono text-xs";

                return (
                  <tr key={index} className="hover:bg-brand-bg/25 transition-colors font-sans">
                    {/* Rank cell */}
                    <td className="py-4 px-6">
                      {isTopThree ? (
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-[10px] ${rankColors}`}>
                          0{entry.rank}
                        </span>
                      ) : (
                        <span className="font-mono text-xs pl-2 text-brand-muted">
                          {entry.rank}
                        </span>
                      )}
                    </td>
                    
                    {/* Name cell */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-sm text-brand-text">
                        {entry.userName}
                      </div>
                      <div className="font-mono text-[10px] text-brand-muted">
                        {entry.userEmail}
                      </div>
                    </td>

                    {/* Week scores */}
                    <td className={`py-4 px-6 text-center font-mono text-xs ${filter === "Week 1" ? "bg-brand-orange/[0.02] font-bold" : ""}`}>
                      {entry.week1Score !== null ? (
                        <span className="text-brand-text">{entry.week1Score}</span>
                      ) : (
                        <span className="text-brand-muted/40">—</span>
                      )}
                    </td>

                    <td className={`py-4 px-6 text-center font-mono text-xs ${filter === "Week 2" ? "bg-brand-orange/[0.02] font-bold" : ""}`}>
                      {entry.week2Score !== null ? (
                        <span className="text-brand-text">{entry.week2Score}</span>
                      ) : (
                        <span className="text-brand-muted/40">—</span>
                      )}
                    </td>

                    <td className={`py-4 px-6 text-center font-mono text-xs ${filter === "Week 3" ? "bg-brand-orange/[0.02] font-bold" : ""}`}>
                      {entry.week3Score !== null ? (
                        <span className="text-brand-text">{entry.week3Score}</span>
                      ) : (
                        <span className="text-brand-muted/40">—</span>
                      )}
                    </td>

                    {/* Total Score cell */}
                    <td className={`py-4 px-6 text-center font-mono text-sm font-bold ${filter === "Overall" ? "bg-brand-orange/[0.02] text-brand-orange" : "text-brand-text"}`}>
                      {entry.totalScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
