"use client";

import { useEffect } from "react";

export default function ThemeSelector({ theme }: { theme: "default" | "home" }) {
  useEffect(() => {
    if (theme === "home") {
      document.body.classList.add("bg-theme-home");
      document.body.classList.remove("bg-theme-default");
    } else {
      document.body.classList.add("bg-theme-default");
      document.body.classList.remove("bg-theme-home");
    }
  }, [theme]);

  return null;
}
