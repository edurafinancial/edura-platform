# Learning Flow Components Documentation

This document explains the authentication and learning flow components in the Edura Financial platform. Use this guide to understand, modify, or extend the functionality.

---

## Overview

The learning flow consists of three main components that handle the user journey:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Auth      │ ──→ │  Dashboard  │ ──→ │   Lesson    │ ──→ │    Quiz     │
│  (Login)    │     │   (Home)    │     │   (Learn)   │     │   (Test)    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

---

## 1. Auth Component

**File:** `src/components/shared/learning/Auth.jsx`

### Purpose
Handles user authentication (login/signup) and manages session state.

### State Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | string | `"login"` | Switches between login and signup forms |
| `name` | string | `""` | User's full name (signup only) |
| `email` | string | `""` | User's email address |
| `school` | string | `""` | User's school/institution (signup only) |
| `role` | string | `"student"` | User role (student/teacher) |
| `password` | string | `""` | User's password |
| `remember` | boolean | `false` | Remember me preference |

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onLogin` | `(user) => void` | Callback fired when user successfully logs in |

### How It Works

1. Renders the `AuthPage` UI component
2. Passes current mode and form values to the UI
3. On submit, creates a user object:
   ```javascript
   const user = {
     name: mode === "signup" ? values.name : email.split("@")[0],
     email: values.email,
     school: values.school || "",
     role: values.role || "student"
   };
   ```
4. Saves user to localStorage via `saveUser(user)`
5. Calls `onLogin(user)` to notify parent component

### Common Modifications

#### Add More Fields to Signup
```javascript
// 1. Add state variable
const [phone, setPhone] = useState("");

// 2. Add to signupDefaultValues
signupDefaultValues={{ name, email, school, role, phone }}

// 3. Include in user object
const u = {
  name: ...,
  email: ...,
  phone: values.phone || phone,
};
```

#### Add Validation
```javascript
const submit = (eventOrValues) => {
  if (eventOrValues?.preventDefault) {
    eventOrValues.preventDefault();
  }

  // Add validation
  if (!values.email?.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  // ... rest of submit logic
};
```

---

## 2. Lesson Component

**File:** `src/components/shared/learning/Lesson.jsx`

### Purpose
Displays educational content with read/watch modes and navigation between lessons.

### State Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `idx` | number | `0` | Current lesson slide index |
| `mode` | string | `"read"` | Content mode: "read" or "watch" |
| `fade` | boolean | `true` | Controls fade transition animation |

### Props

| Prop | Type | Description |
|------|------|-------------|
| `mod` | object | Module object containing lessons array |
| `onBack` | `() => void` | Return to dashboard |
| `onQuiz` | `() => void` | Start the quiz |

### Module Data Structure

```javascript
mod = {
  id: "uuid",
  title: "Introduction to Finance",
  description: "Learn the basics...",
  trackId: "track-1",
  order: 1,
  lessons: [
    {
      title: "What is Money?",
      content: "Full article text here...",
      videoUrl: "https://youtube.com/..."
    },
    // ... more lessons
  ],
  quiz: [...]
}
```

### How It Works

1. Displays a sticky header with:
   - Back button
   - Module title
   - Progress bar
   - Lesson counter (e.g., "1/5")

2. Content area shows:
   - Lesson title
   - Toggle between Read/Watch modes
   - **Read mode:** Full article content
   - **Watch mode:** Video embed + key takeaways summary

3. Navigation buttons at bottom:
   - "← Back" (if not first lesson)
   - "Continue →" (if not last lesson)
   - "Start Quiz →" (on last lesson)

### Common Modifications

#### Add Note-Taking Feature
```javascript
// Add state
const [notes, setNotes] = useState({});

// Save note for current slide
const saveNote = (text) => {
  setNotes({ ...notes, [idx]: text });
  // Also save to localStorage
};

// Render textarea
<textarea
  value={notes[idx] || ""}
  onChange={(e) => saveNote(e.target.value)}
  placeholder="Take notes..."
/>
```

#### Add Bookmark Feature
```javascript
// Add state
const [bookmarked, setBookmarked] = useState(false);

// Toggle bookmark
const toggleBookmark = () => {
  setBookmarked(!bookmarked);
  localStorage.setItem(`bookmark-${mod.id}-${idx}`, !bookmarked);
};

// Add button in header
<button onClick={toggleBookmark}>
  {bookmarked ? "★" : "☆"}
</button>
```

#### Change Transition Speed
```javascript
// In the go() function, change 180 to your desired ms
const go = (fn) => {
  setFade(false);
  setTimeout(() => {
    fn();
    setFade(true);
  }, 300); // Changed from 180ms to 300ms
};
```

---

## 3. Quiz Component

**File:** `src/components/shared/learning/Quiz.jsx`

### Purpose
Assesses user knowledge with multiple-choice questions and provides immediate feedback.

### State Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `qi` | number | `0` | Current question index |
| `sel` | number | `null` | Selected answer option index |
| `show` | boolean | `false` | Show feedback/explanation panel |
| `score` | number | `0` | Number of correct answers |
| `phase` | string | `"quiz"` | Current phase: "quiz" or "results" |
| `fade` | boolean | `true` | Controls fade transition animation |

### Props

| Prop | Type | Description |
|------|------|-------------|
| `mod` | object | Module object containing quiz array |
| `onBack` | `() => void` | Return to dashboard |
| `onComplete` | `(score) => void` | Complete quiz with score percentage |

### Quiz Data Structure

```javascript
mod.quiz = [
  {
    q: "What is the primary function of money?",
    opts: ["Store of value", "Medium of exchange", "Unit of account", "All of the above"],
    correct: 3,  // Index of correct answer
    why: "Money serves all three functions..."
  },
  // ... more questions
];
```

### How It Works

#### Quiz Phase
1. Displays sticky header with:
   - Back button
   - Module title + "Quiz"
   - Progress bar
   - Question counter (e.g., "1/5")

2. Question area shows:
   - Question badge ("Question 1 of 5")
   - Question text
   - 4 answer options as clickable buttons

3. User selects an answer:
   - Answer locks immediately
   - Correct answer highlights in green
   - Wrong answer highlights in red
   - Feedback panel slides in with explanation

4. User clicks "Next question" or "See results"

#### Results Phase
Shows when all questions are answered:
- Emoji based on score: 🎉 (≥80%), 💪 (≥50%), 📚 (<50%)
- Score display (e.g., "4/5 (80%)")
- Visual breakdown of each question (✓/✗ tiles)
- Two buttons:
  - "Back to dashboard"
  - "Complete module"

### Common Modifications

#### Add Hint System
```javascript
// Add state
const [usedHint, setUsedHint] = useState(false);

// Add to quiz data structure
mod.quiz = [
  {
    q: "...",
    opts: [...],
    correct: 3,
    why: "...",
    hint: "Think about the three functions of money"
  }
];

// Add hint button
{!usedHint && (
  <button onClick={() => setUsedHint(true)}>
    💡 Hint
  </button>
)}
{usedHint && <p>{q[qi].hint}</p>}
```

#### Change Passing Score
```javascript
// In the results phase, modify the emoji logic
const pct = Math.round((score / total) * 100);

// Change thresholds (currently 80% and 50%)
{pct >= 90 ? "🎉" : pct >= 70 ? "💪" : "📚"}

// Update messages accordingly
{pct >= 90 ? "Excellent!" : pct >= 70 ? "Good job!" : "Keep studying!"}
```

#### Add Time Limit
```javascript
// Add state
const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question

// Add timer effect
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        // Auto-submit when time runs out
        next();
        return 60;
      }
      return t - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, [qi]);

// Display timer
<span>⏱️ {timeLeft}s</span>
```

#### Require Minimum Score to Pass
```javascript
// In the results phase, add validation
const pct = Math.round((score / total) * 100);
const passed = pct >= 70; // 70% passing score

// Conditionally render complete button
{passed ? (
  <Btn onClick={() => onComplete(pct)}>Complete module</Btn>
) : (
  <Btn onClick={() => setPhase("quiz")}>Try Again</Btn>
)}
```

---

## Styling & Theme

All three components use a shared theme system:

**File:** `src/shared/learning/theme.js`

```javascript
export const C = {
  cream: "#FAFAF7",
  white: "#FFFFFF",
  navy: "#1B2A4A",
  teal: "#2A9D8F",
  gold: "#E9C46A",
  green: "#065F46",
  red: "#991B1B",
  border: "#E5E5E5",
  text1: "#1A1C1B",
  text2: "#5C5F5E",
  text3: "#9CA3A0",
  warmGray: "#F5F5F4",
};

export const F = {
  display: "Epilogue, sans-serif",
  heading: "Plus Jakarta Sans, sans-serif",
  body: "Plus Jakarta Sans, sans-serif",
  mono: "JetBrains Mono, monospace",
};
```

### To Change Colors
Edit the `C` object in `theme.js`:
```javascript
export const C = {
  cream: "#FFF8F0",  // Change to your background color
  teal: "#00685d",   // Change to your primary brand color
  // ...
};
```

### To Change Fonts
Edit the `F` object in `theme.js`:
```javascript
export const F = {
  display: "Playfair Display, serif",  // Change headlines font
  body: "Inter, sans-serif",          // Change body text font
  // ...
};
```

---

## Data Flow

### User Login Flow
```
AuthPage (UI)
    ↓
Auth.jsx (handles submit)
    ↓
saveUser() → localStorage
    ↓
onLogin() callback
    ↓
DashboardPage sets user state
    ↓
Dashboard renders
```

### Lesson Completion Flow
```
DashboardPage
    ↓
User clicks module → sets screen="lesson"
    ↓
Lesson.jsx renders
    ↓
User completes lessons
    ↓
Clicks "Start Quiz"
    ↓
onQuiz() callback
    ↓
DashboardPage sets screen="quiz"
```

### Quiz Completion Flow
```
Quiz.jsx
    ↓
User answers all questions
    ↓
onComplete(score) callback
    ↓
DashboardPage saves progress:
{
  [mod.id]: { completed: true, score: 85 }
}
    ↓
doSave() → localStorage
    ↓
DashboardPage sets screen="dashboard"
    ↓
Dashboard shows updated progress
```

---

## Storage System

**File:** `src/shared/learning/storage.js`

### Functions

| Function | Description |
|----------|-------------|
| `saveUser(user)` | Save user object to localStorage |
| `loadUser()` | Load user from localStorage |
| `saveProgress(progress)` | Save learning progress |
| `loadProgress()` | Load progress from localStorage |

### Data Structure

```javascript
// User object
{
  name: "John Doe",
  email: "john@example.com",
  school: "Harvard",
  role: "student"
}

// Progress object
{
  "mod-1": { completed: true, score: 85 },
  "mod-2": { completed: false, score: 0 },
  "mod-3": { completed: true, score: 92 }
}
```

---

## Quick Reference: How to Modify

| Goal | File to Edit |
|------|--------------|
| Add login fields | `Auth.jsx` |
| Change lesson layout | `Lesson.jsx` |
| Modify quiz behavior | `Quiz.jsx` |
| Change colors | `theme.js` |
| Change fonts | `theme.js` |
| Add new question types | `Quiz.jsx` |
| Add note-taking | `Lesson.jsx` |
| Add certificates | `Quiz.jsx` (results phase) |
| Change storage method | `storage.js` |

---

## Troubleshooting

### Component not rendering
1. Check if lazy loading is working (check browser console)
2. Verify module data structure matches expected format
3. Ensure all required props are passed

### State not persisting
1. Check localStorage in DevTools
2. Verify `saveUser()` or `doSave()` is being called
3. Clear localStorage and try again

### Animation not smooth
1. Adjust `fade` transition duration in `go()` function
2. Check for too many re-renders (use React DevTools)

---

## Related Files

- `src/pages/DashboardPage.jsx` - Main page that orchestrates all components
- `src/pages/AuthPage.jsx` - Auth UI page component
- `src/data.json` - Course content (modules, lessons, quizzes)
- `src/components/ui/skeleton.jsx` - Loading skeleton component
