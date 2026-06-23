export interface Resource {
  title: string;
  description: string;
  link: string;
}

export interface ResourceSection {
  title: string;
  resources: Resource[];
}

export interface WeekConfig {
  number: number;
  title: string;
  theme: string;
  description: string;
  unlockDate: string; // ISO date string YYYY-MM-DD
  problems?: string[];
  resourceSections?: ResourceSection[];
}

export const PROGRAM_CONFIG = {
  // Configurable email domain for login validation
  allowedEmailDomain: "@snu.edu.in",
  
  // Basic Program details
  title: "ACM-W Build Accelerator 2026",
  subtitle: "A focused 4-week build challenge for students",
  
  // Weekly configuration
  weeks: [
    {
      number: 1,
      title: "Week 1: Resources & Program Schedule",
      theme: "Preparation & Setup",
      description: "Week 1 is for preparation. Students can explore learning resources across different domains before weekly build challenges begin.",
      unlockDate: "2026-06-22", // Unlocked on June 22
      resourceSections: [
        {
          title: "Web Development",
          resources: [
            {
              title: "Web Development Guide",
              description: "Access the curated learning path, study material, and projects for Web Development.",
              link: "https://drive.google.com/file/d/1X4msYZtNvmVt8La65KbA5bhUid_w5aQe/view?usp=sharing"
            }
          ]
        },
        {
          title: "AI/ML",
          resources: [
            {
              title: "AI/ML Guide",
              description: "Access the curated learning path, study material, and projects for AI/ML.",
              link: "https://drive.google.com/file/d/1iyLHHjemnVJpf-702zJSXa5Mg8iHhjeO/view?usp=sharing"
            }
          ]
        },
        {
          title: "Data Science",
          resources: [
            {
              title: "Data Analytics Guide",
              description: "Access the curated learning path, study material, and projects for Data Analytics.",
              link: "https://drive.google.com/file/d/1PNhveabQEglOi1llaymEcC2xhj9OIJFC/view?usp=sharing"
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Week 2: Student Survival Track",
      theme: "Student Survival Track",
      description: "Build a project that solves a real student-life problem. The idea can help students manage time, academics, expenses, hostel life, clubs, events, mental well-being, or daily productivity.",
      unlockDate: "2026-06-29",
      problems: [
        "Help students manage assignments and deadlines.",
        "Build a tool to find study partners.",
        "Create a hostel complaint tracker.",
        "Build a student expense tracker.",
        "Create a campus event discovery app."
      ]
    },
    {
      number: 3,
      title: "Week 3: Tech for Impact",
      theme: "Tech for Impact",
      description: "Build a project that solves a real-world problem with social, environmental, educational, healthcare, accessibility, safety, or community impact.",
      unlockDate: "2026-07-06",
      problems: [
        "Build a platform for local volunteering.",
        "Create an accessibility tool for students.",
        "Build a food waste reduction tracker.",
        "Create a safety reporting tool.",
        "Build a simple healthcare awareness chatbot."
      ]
    },
    {
      number: 4,
      title: "Week 4: Build Your Brand",
      theme: "Build Your Brand",
      description: "Build something that supports your personal growth, career, learning, portfolio, networking, or professional identity.",
      unlockDate: "2026-07-13",
      problems: [
        "Personal portfolio website",
        "Resume improvement tool",
        "LinkedIn content planner",
        "Skill tracker",
        "Interview preparation assistant",
        "Personal project showcase platform"
      ]
    }
  ] as WeekConfig[],

  // Timeline Schedule Data
  timeline: [
    {
      phase: "Week 1: Resources & Setup",
      description: "Students explore learning resources across different domains and set up their development environments."
    },
    {
      phase: "Week 2: Student Survival Track",
      description: "Build a project solving real-world student-life challenges like academics, expenses, hostels, or events."
    },
    {
      phase: "Week 3: Tech for Impact",
      description: "Build a project solving environmental, social, accessibility, educational, or healthcare challenges."
    },
    {
      phase: "Week 4: Build Your Brand",
      description: "Build a project focused on personal growth, portfolio creation, resume building, or showcasing skills."
    }
  ]
};

// Helper function to check if a week is unlocked
export function isWeekUnlocked(weekNumber: number, currentDateOverride?: string): boolean {
  if (weekNumber === 1) return true; // Week 1 is always open
  
  const week = PROGRAM_CONFIG.weeks.find(w => w.number === weekNumber);
  if (!week) return false;

  const current = currentDateOverride ? new Date(currentDateOverride) : new Date();
  const unlock = new Date(week.unlockDate);

  // Set hours/minutes to zero to compare dates properly
  current.setHours(0, 0, 0, 0);
  unlock.setHours(0, 0, 0, 0);

  return current >= unlock;
}
