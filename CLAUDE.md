\# Edura Financial — Learning Platform Guidelines

\#\# Project Overview  
Edura Financial is a B2B financial literacy education platform for schools serving students (ages 14–24) across a single growing pathway, alongside Teacher/Admin progress monitoring.

Target aesthetic: "Duolingo meets Notion" — clean, structured, approachable, and institutional-grade.

\#\# Tech Stack & Architecture  
\- \*\*Framework:\*\* React 18+ (Vite)  
\- \*\*Styling:\*\* Tailwind CSS \+ shadcn/ui (Radix Primitives)  
\- \*\*Animations:\*\* Framer Motion  
\- \*\*Icons:\*\* Lucide React (\`lucide-react\`)  
\- \*\*Charts:\*\* Recharts (shadcn chart components)  
\- \*\*Deployment:\*\* Netlify

\#\# Brand & Design Tokens  
\- \*\*Navy (Primary/Headings/Sidebar):\*\* \`\#1B2A4A\`  
\- \*\*Teal (Primary Accent/Action):\*\* \`\#2A9D8F\`  
\- \*\*Gold (Secondary Accent/Badges):\*\* \`\#E9C46A\`  
\- \*\*Cream (App Background):\*\* \`\#FAFAF7\`  
\- \*\*White (Surface/Cards):\*\* \`\#FFFFFF\`  
\- \*\*Typography:\*\*  
  \- Headings & Body: \`Outfit\`, sans-serif  
  \- Display Text: \`Playfair Display\`, serif  
  \- Data / Numbers / Stats: \`JetBrains Mono\`, monospace

\#\# Core Functional Rules  
1\. \*\*Quiz Engine:\*\*  
   \- Always randomize both question sequence and multiple-choice answer option order upon initialization.  
   \- Immediate answer feedback (green highlight for correct, red for incorrect with explanatory text).  
   \- Track per-question results and generate final score percentage on the results screen.  
2\. \*\*Accessibility & Power Features:\*\*  
   \- Support keyboard navigation in the Lesson Viewer (Left/Right arrow keys for slide navigation, 1–4 keys for selecting quiz answers).  
   \- Implement skeleton loaders with shadcn/ui for all stat cards and module paths during state hydration.  
3\. \*\*Role-Based State:\*\*  
   \- Support distinct views for \`student\` (Dashboard, Curriculum, Profile) and \`teacher\` (Roster, Aggregates, Class Codes, Analytics).

\#\# Screen Inventory to Implement/Refactor  
1\. \`Login / Sign Up\`: Split-panel layout, student/teacher role toggle, SSO buttons, link to marketing site.  
2\. \`Student Dashboard\`: Stat cards, Foundations & Advanced vertical progression timelines, status badges (\`Start\`, \`In Progress\`, \`Completed\`, \`Coming Soon\` with lock).  
3\. \`Lesson Viewer\`: Read/Watch toggle, video embed with key takeaways summary, article reader, slide progress bar.  
4\. \`Quiz Engine & Results\`: Assessment interface, immediate feedback, score recap, celebratory completion screen.  
5\. \`Teacher Dashboard & Analytics\`: Class roster, aggregate metrics, class code, completion rate charts over time.  
6\. \`Curriculum Catalog\`: Grid/catalog view of all tracks and modules.  
7\. \`Sidebar & Global Layout\`: Persistent sidebar navigation, responsive mobile drawer.

\#\# Code Standards  
\- Keep components modular and single-responsibility in \`src/components/\`.  
\- Isolate static lesson/quiz data in \`src/data/\`.  
\- Use functional components with TypeScript or standard modern React hooks.  
\- Use 2-space indentation.  
