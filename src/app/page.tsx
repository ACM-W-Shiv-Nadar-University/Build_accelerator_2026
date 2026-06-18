"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Sparkles, ShieldAlert, Loader2 } from "lucide-react";
import { PROGRAM_CONFIG } from "@/config/program";

// Simple SVG for Google logo (multicolored)
const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

function LoginForm() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // Parse error query parameters from NextAuth
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "AccessDenied" || errorParam.toLowerCase().includes("snu")) {
        setErrorMessage("Please login using your official SNU email ID.");
      } else {
        setErrorMessage("An error occurred during authentication. Please try again.");
      }
    }
  }, [searchParams]);

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setErrorMessage("Please login using your official SNU email ID.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-brand-bg font-mono text-xs text-brand-muted">
        <Loader2 className="animate-spin text-brand-orange mb-2" size={24} />
        VERIFYING SESSION...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden min-h-screen">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#BE6B24 1px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* ACM-W Logo */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border bg-brand-card">
            <span className="font-mono text-xs tracking-widest text-brand-muted uppercase font-bold">
              ACM-W
            </span>
            <span className="h-3 w-[1px] bg-brand-border" />
            <span className="font-mono text-xs tracking-widest text-brand-orange uppercase font-bold">
              SNU
            </span>
          </div>
        </div>

        {/* Card Wrapper */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle Orange Accent Circle */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight mb-2">
              {PROGRAM_CONFIG.title}
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed font-sans">
              {PROGRAM_CONFIG.subtitle}
            </p>
          </div>

          {/* Badge Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-brand-border bg-brand-bg text-[10px] font-mono tracking-wider text-brand-text font-bold">
              Open to SNU Students
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-brand-border bg-brand-bg text-[10px] font-mono tracking-wider text-brand-text font-bold">
              Web Dev • AI/ML • Data Science
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-brand-border bg-brand-bg text-[10px] font-mono tracking-wider text-brand-text font-bold">
              Weekly Projects
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs mb-6 animate-fade-in">
              <ShieldAlert size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="font-sans leading-tight font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-1 bg-brand-btn-dark hover:bg-brand-orange text-brand-bg font-sans font-bold text-xs py-3.5 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
          >
            <GoogleIcon />
            Continue with Google
          </button>

        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-[10px] font-mono text-brand-muted tracking-wider">
          © 2026 SNU ACM-W CHAPTER. ALL RIGHTS RESERVED.
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-brand-bg font-mono text-xs text-brand-muted">
        <Loader2 className="animate-spin text-brand-orange mb-2" size={24} />
        VERIFYING SESSION...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
