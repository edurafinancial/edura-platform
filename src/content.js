// ============================================================
// EDURA FINANCIAL — CONTENT FILE
// ============================================================
// This is the ONLY file you need to edit to change content.
// 
// To change something:
//   1. Find what you want to change below
//   2. Edit the text between the quotes
//   3. Save the file
//   4. Push to GitHub — Netlify auto-deploys in ~30 seconds
//
// To add a video to a lesson:
//   Find the lesson and change videoUrl: "" to
//   videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
//
// To add a new module:
//   Copy an existing module block, change the id, title,
//   lessons, and quiz questions.
// ============================================================


// ------------------------------------------------------------
// TRACKS — The two main learning paths
// ------------------------------------------------------------
export const TRACKS = [
  {
    id: "foundations",
    name: "Foundations",
    subtitle: "Core money concepts for everyday life",
    color: "#2A9D8F",
    icon: "F",
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "Financial skills for college and beyond",
    color: "#E9C46A",
    icon: "A",
  },
];


// ------------------------------------------------------------
// MODULES — Each module belongs to a track
// ------------------------------------------------------------
export const MODULES = [

  // ========================================
  // FOUNDATIONS TRACK
  // ========================================

  {
    id: "money-basics",
    trackId: "foundations",
    order: 1,
    title: "How Money Works",
    description: "Income, expenses, and the equation behind every financial decision.",

    // LESSONS — 10 slides, each with title, content, and optional video
    lessons: [
      {
        title: "Money Is a Tool, Not a Goal",
        videoUrl: "",
        content: `Here's something nobody tells you: money isn't the point. Money is a tool — like a hammer or a phone. It's only as useful as what you do with it.

Some people chase money their whole lives and still feel broke. Others earn modest incomes but build real security. The difference? Understanding how money actually works.

This module is going to give you that understanding. No complicated math, no boring lectures — just the stuff you'll actually use when you start earning, spending, and saving for real.

By the end, you'll know more about money than most adults. That's not an exaggeration.`,
      },
      {
        title: "The One Equation That Rules Everything",
        videoUrl: "",
        content: `All of personal finance comes down to one equation:

Income – Expenses = What's Left

That's it. Every financial decision you'll ever make connects back to this.

Income is money coming in — a paycheck, allowance, side hustle, birthday cash.

Expenses are money going out — food, clothes, phone bill, gas, subscriptions.

What's Left is the most important number. It's your future. It's what you save, invest, or use to build something. If this number is zero (or negative), you're stuck. If it's positive, you have options.

The entire game of personal finance is making that "What's Left" number as big as possible.`,
      },
      {
        title: "The Two Levers You Can Pull",
        videoUrl: "",
        content: `There are only two ways to improve your financial situation:

Lever 1: Earn more. Get a raise, start a side hustle, learn a higher-paying skill, work more hours.

Lever 2: Spend less. Cut subscriptions you don't use, cook instead of eating out, find cheaper alternatives.

Most people only think about Lever 2 — cutting expenses. And yes, that matters. But here's the thing: there's a floor to how little you can spend (you still need food and shelter), but there's no ceiling on how much you can earn.

The most powerful financial move? Use both levers at the same time. Earn more AND be smart about spending. That's how wealth actually gets built.`,
      },
      {
        title: "Needs vs. Wants (It's Not Always Obvious)",
        videoUrl: "",
        content: `You've probably heard "spend money on needs, not wants." Sounds simple, right? But in real life, the line is blurry.

Needs: Things you literally cannot function without — housing, food, basic clothing, transportation to work or school, healthcare.

Wants: Things that make life more enjoyable but aren't survival essentials — eating out, streaming subscriptions, new sneakers, the latest phone.

Here's where it gets tricky: a phone is a need (you need it for communication and work). But the newest $1,200 iPhone is a want — a $200 phone does the same job.

The skill isn't eliminating all wants. It's being honest with yourself about which category something falls into, and making intentional choices instead of impulse ones.`,
      },
      {
        title: "The 50/30/20 Rule",
        videoUrl: "",
        content: `When you start earning money, you need a system. The 50/30/20 rule is the simplest one that works:

50% goes to Needs — rent, groceries, bills, transportation, insurance. The non-negotiables.

30% goes to Wants — dining out, entertainment, hobbies, shopping. The fun stuff.

20% goes to Future You — savings, investing, paying off debt faster. The stuff that builds your financial foundation.

Is this perfect for everyone? No. If you live somewhere expensive, your needs might eat up 60%. If you're saving aggressively for a goal, you might flip wants and savings.

But as a starting point, it's gold. It forces you to think about your money in categories instead of just spending until it's gone.`,
      },
      {
        title: "Where Your Money Actually Goes",
        videoUrl: "",
        content: `Here's something wild: the average American has 12 paid subscriptions and underestimates what they spend on them by about 2x.

For teens, it looks like this:

Spotify Premium: $11/month = $132/year
Netflix or streaming: $15/month = $180/year
iCloud storage: $3/month = $36/year
Gaming (Xbox Game Pass, V-Bucks, Robux): $15-30/month = $180-360/year
DoorDash / Uber Eats a few times a month: $40/month = $480/year
Random in-app purchases: $10/month = $120/year

Add it up and you might be spending $1,000+ a year without realizing it. None of these feel expensive in the moment — that's what makes them invisible.

This isn't about never spending money on things you enjoy. It's about awareness. When you actually track where your money goes, you find stuff you forgot you were even paying for.

Try this: go through your phone's subscription settings right now.`,
      },
      {
        title: "Paying Yourself First",
        videoUrl: "",
        content: `Most people spend first and save whatever's left. The problem? There's never anything left.

The fix is a mindset shift called "Pay Yourself First." It means the moment you get paid, you immediately move money into savings BEFORE you spend on anything else.

It works because of human psychology. If money sits in your checking account, you'll spend it. If it's already moved to savings, you adjust your spending to what's left — and you barely notice.

Here's how to start: set up an automatic transfer. Every time you get paid, have your bank automatically move a set amount (even $25 or $50) into a savings account. You won't miss it after the first month.

This one habit — paying yourself first — is the single most important money habit you can build. It's how regular people become financially secure.`,
      },
      {
        title: "The Magic of Compound Interest",
        videoUrl: "",
        content: `Albert Einstein reportedly called compound interest "the eighth wonder of the world." Here's why.

Simple interest: you earn interest only on the money you put in.
Compound interest: you earn interest on your money AND on the interest you've already earned.

Example: You invest $1,000 at 8% annual return.
After Year 1: $1,080 (you earned $80)
After Year 5: $1,469 (you earned $469)
After Year 10: $2,159 (you more than doubled your money)
After Year 30: $10,063 (your $1,000 became over $10,000)

You didn't do anything extra. You just let time work. This is why starting early matters so much. A 16-year-old who invests $1,000 today will have WAY more at retirement than a 30-year-old who invests $5,000 — because of those extra 14 years of compounding.

Time is your biggest financial advantage right now. Use it.`,
      },
      {
        title: "Good Debt vs. Bad Debt",
        videoUrl: "",
        content: `Not all debt is created equal. Some debt helps you build wealth. Some debt destroys it.

Good debt is borrowing money for something that increases in value or increases your earning power:
- Student loans (if they lead to a higher-paying career)
- A mortgage (real estate typically appreciates over time)
- A small business loan (if it generates more income than it costs)

Bad debt is borrowing money for things that lose value or generate no return:
- Credit card debt from shopping sprees
- Car loans for vehicles way beyond your budget
- Payday loans (extremely high interest rates)

The key question to ask before taking on any debt: "Will this make me more money or save me more money than it costs?" If yes, it might be worth it. If no, avoid it.`,
      },
      {
        title: "Your Financial Cheat Code — Start Now",
        videoUrl: "",
        content: `Here's the truth that most adults wish they knew at your age: the single biggest advantage you have is time.

You don't need a lot of money to start. You don't need to understand the stock market. You don't need a finance degree. You just need to start.

Start by tracking your spending for one week. Start by saving $20 from your next paycheck. Start by learning one new financial concept a week (which you're already doing right now).

The gap between people who are financially comfortable and people who struggle isn't usually income — it's knowledge and habits. You're building both right now.

Here's your action plan:
1. Track every dollar you spend this week
2. Open a savings account if you don't have one
3. Set up automatic savings — even $10 per paycheck
4. Keep going through the Edura modules

You just finished Module 1. You already know more about money than most people twice your age. Keep going.`,
      },
    ],

    // QUIZ — 8 questions with 4 options each
    quiz: [
      {
        q: "What is the basic personal finance equation?",
        opts: ["Income + Expenses = Wealth", "Income – Expenses = What's Left", "Savings × Time = Rich", "Income ÷ Bills = Budget"],
        correct: 1,
        why: "Everything in personal finance starts here. What you earn minus what you spend equals what you have left to save, invest, and build with.",
      },
      {
        q: "What are the two \"levers\" you can pull to improve your finances?",
        opts: ["Save more and borrow more", "Work more and sleep less", "Earn more and spend less", "Invest everything and spend nothing"],
        correct: 2,
        why: "There are only two ways to improve your financial equation — increase income or decrease expenses. The most powerful strategy is using both at the same time.",
      },
      {
        q: "In the 50/30/20 rule, what does the 20% go toward?",
        opts: ["Rent and groceries", "Entertainment and dining out", "Taxes and fees", "Savings, investing, and paying off debt"],
        correct: 3,
        why: "The 20% goes to \"Future You\" — savings, investments, and extra debt payments. This builds your financial foundation over time.",
      },
      {
        q: "What is \"Pay Yourself First\"?",
        opts: ["Buying yourself something nice before paying bills", "Moving money to savings before spending on anything else", "Asking for a raise before your coworkers", "Paying off your smallest debt first"],
        correct: 1,
        why: "Paying yourself first means automatically saving money the moment you get paid, before spending on anything else.",
      },
      {
        q: "Why is compound interest so powerful?",
        opts: ["It charges you less interest over time", "It lets you borrow more money from banks", "You earn interest on your interest, so growth accelerates", "It eliminates all risk from investing"],
        correct: 2,
        why: "Compound interest means you earn returns not just on your original money, but also on the interest you've already earned. Over long periods, this creates exponential growth.",
      },
      {
        q: "Which is an example of a \"need\" vs. a \"want\"?",
        opts: ["The latest iPhone is a need", "A basic phone is a need; the newest model is a want", "Streaming subscriptions are needs", "Eating at restaurants is a need"],
        correct: 1,
        why: "A phone for communication is a genuine need. But the most expensive model is a want — a more affordable phone serves the same purpose.",
      },
      {
        q: "What makes debt \"good\" debt?",
        opts: ["Any debt with a low monthly payment", "Debt used to buy things that increase in value or earning power", "Credit card debt used for essentials", "Any debt that your parents co-sign"],
        correct: 1,
        why: "Good debt is borrowing for something that will make you more money or increase in value over time.",
      },
      {
        q: "What is the biggest financial advantage someone your age has?",
        opts: ["Access to credit cards", "Living with parents rent-free", "Time — for compound interest and building habits early", "Being able to take more financial risks"],
        correct: 2,
        why: "Time is your greatest financial asset. Thanks to compound interest, money invested early has decades to grow exponentially.",
      },
    ],
  },


  // ========================================
  // MORE FOUNDATIONS MODULES (add content later)
  // ========================================

  {
    id: "banking",
    trackId: "foundations",
    order: 2,
    title: "Banking Without the Confusion",
    description: "Checking, savings, and choosing your first bank account.",
    lessons: [],
    quiz: [],
  },
  {
    id: "credit",
    trackId: "foundations",
    order: 3,
    title: "Credit: Your Financial Reputation",
    description: "What credit scores are, why they matter, and how to build yours early.",
    lessons: [],
    quiz: [],
  },
  {
    id: "budgeting",
    trackId: "foundations",
    order: 4,
    title: "Budgeting That Doesn't Suck",
    description: "Simple systems to manage money without spreadsheet anxiety.",
    lessons: [],
    quiz: [],
  },


  // ========================================
  // ADVANCED TRACK (add content later)
  // ========================================

  {
    id: "paycheck",
    trackId: "advanced",
    order: 1,
    title: "Decode Your First Paycheck",
    description: "Every mysterious line on your pay stub, finally explained.",
    lessons: [],
    quiz: [],
  },
  {
    id: "loans",
    trackId: "advanced",
    order: 2,
    title: "Student Loans Demystified",
    description: "What you actually owe, repayment strategies, and forgiveness programs.",
    lessons: [],
    quiz: [],
  },
  {
    id: "investing",
    trackId: "advanced",
    order: 3,
    title: "Investing: Start With $50",
    description: "Index funds, compound interest, and why starting now is a superpower.",
    lessons: [],
    quiz: [],
  },
  {
    id: "taxes",
    trackId: "advanced",
    order: 4,
    title: "Filing Taxes Without Crying",
    description: "W-2s, deductions, credits, and filing for the very first time.",
    lessons: [],
    quiz: [],
  },
];
