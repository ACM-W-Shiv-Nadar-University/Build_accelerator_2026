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
  title: "ACM-W Summer Build Program",
  subtitle: "A focused 4-week build challenge for students",
  
  // Weekly configuration
  weeks: [
    {
      number: 0,
      title: "Week 0: Resources & Program Schedule",
      theme: "Preparation & Setup",
      description: "Week 0 is for preparation. Students can explore learning resources across different domains before weekly build challenges begin.",
      unlockDate: "2026-06-01", // Already unlocked
      resourceSections: [
        {
          title: "Web Development",
          resources: [
            {
              title: "HTML, CSS, JavaScript Basics",
              description: "Learn the core languages of the web, starting with page structure, styling, and basic page interactivity.",
              link: "https://developer.mozilla.org/en-US/docs/Learn"
            },
            {
              title: "React Basics",
              description: "Understand components, hooks, state, and props in modern React for dynamic web apps.",
              link: "https://react.dev/learn"
            },
            {
              title: "Git & GitHub",
              description: "Master version control, repository setup, commits, branches, pull requests, and collaboration.",
              link: "https://docs.github.com/en/get-started"
            },
            {
              title: "Deployment Guide",
              description: "Deploy your front-end apps live in seconds using Vercel, Netlify, or GitHub Pages.",
              link: "https://nextjs.org/docs/app/building-your-application/deploying"
            }
          ]
        },
        {
          title: "AI/ML",
          resources: [
            {
              title: "Python Basics",
              description: "Learn Python syntax, data structures, control flows, and libraries essential for ML.",
              link: "https://docs.python.org/3/tutorial/"
            },
            {
              title: "Machine Learning Introduction",
              description: "Understand the fundamentals of supervised and unsupervised learning, algorithms, and models.",
              link: "https://www.coursera.org/specializations/machine-learning-introduction"
            },
            {
              title: "Prompt Engineering",
              description: "Learn how to effectively prompt Large Language Models to generate structured output and perform tasks.",
              link: "https://www.promptingguide.ai/"
            },
            {
              title: "AI Project Ideas",
              description: "A curated list of beginner and intermediate AI/ML project ideas with step-by-step guides.",
              link: "https://github.com/ashishpatel26/500-AI-Machine-learning-Deep-learning-Computer-vision-NLP-Projects"
            }
          ]
        },
        {
          title: "Data Science",
          resources: [
            {
              title: "Python for Data Analysis",
              description: "Explore the basics of Python libraries used specifically for data handling and computing.",
              link: "https://wesmckinney.com/book/"
            },
            {
              title: "Pandas & NumPy",
              description: "Understand dataframes, arrays, series, and operations to clean and preprocess raw datasets.",
              link: "https://pandas.pydata.org/docs/user_guide/index.html"
            },
            {
              title: "Data Visualization",
              description: "Master Matplotlib, Seaborn, and Plotly to create gorgeous charts and dashboards.",
              link: "https://jakevdp.github.io/PythonDataScienceHandbook/"
            },
            {
              title: "Dataset Exploration",
              description: "Learn how to find and analyze high-quality public datasets on Kaggle and Google Dataset Search.",
              link: "https://www.kaggle.com/datasets"
            }
          ]
        }
      ]
    },
    {
      number: 1,
      title: "Week 1: Student Survival Track",
      theme: "Student Survival Track",
      description: "Build a project that solves a real student-life problem. The idea can help students manage time, academics, expenses, hostel life, clubs, events, mental well-being, or daily productivity.",
      unlockDate: "2026-06-15", // Unlocked based on current date 2026-06-18
      problems: [
        "Help students manage assignments and deadlines.",
        "Build a tool to find study partners.",
        "Create a hostel complaint tracker.",
        "Build a student expense tracker.",
        "Create a campus event discovery app."
      ]
    },
    {
      number: 2,
      title: "Week 2: Tech for Impact",
      theme: "Tech for Impact",
      description: "Build a project that solves a real-world problem with social, environmental, educational, healthcare, accessibility, safety, or community impact.",
      unlockDate: "2026-06-22", // Locked (unlocks in 4 days)
      problems: [
        "Build a platform for local volunteering.",
        "Create an accessibility tool for students.",
        "Build a food waste reduction tracker.",
        "Create a safety reporting tool.",
        "Build a simple healthcare awareness chatbot."
      ]
    },
    {
      number: 3,
      title: "Week 3: Build Your Brand",
      theme: "Build Your Brand",
      description: "Build something that supports your personal growth, career, learning, portfolio, networking, or professional identity.",
      unlockDate: "2026-06-29", // Locked (unlocks in 11 days)
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
      phase: "Phase 1: Registration Starts",
      description: "Students register using their official SNU Google account."
    },
    {
      phase: "Phase 2: Week 0 Begins",
      description: "Students explore resources for Web Development, AI/ML, and Data Science."
    },
    {
      phase: "Phase 3: Weekly Build Challenges",
      description: "Every week, a new theme unlocks with a problem statement and submission space."
    },
    {
      phase: "Phase 4: Final Evaluation",
      description: "Projects are reviewed and top submissions are ranked on the leaderboard."
    }
  ]
};

// Helper function to check if a week is unlocked
export function isWeekUnlocked(weekNumber: number, currentDateOverride?: string): boolean {
  if (weekNumber === 0) return true; // Week 0 is always open
  
  const week = PROGRAM_CONFIG.weeks.find(w => w.number === weekNumber);
  if (!week) return false;

  const current = currentDateOverride ? new Date(currentDateOverride) : new Date();
  const unlock = new Date(week.unlockDate);

  // Set hours/minutes to zero to compare dates properly
  current.setHours(0, 0, 0, 0);
  unlock.setHours(0, 0, 0, 0);

  return current >= unlock;
}
