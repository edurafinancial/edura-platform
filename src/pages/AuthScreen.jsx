import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, LineChart, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoleSelector from "@/components/auth/RoleSelector"
import SsoButtons from "@/components/auth/SsoButtons"

const MARKETING_URL = "https://edurafinancial.com"

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Built for real classrooms",
    body: "Short, structured modules students actually finish.",
  },
  {
    icon: LineChart,
    title: "Progress teachers can see",
    body: "Class-wide analytics without chasing spreadsheets.",
  },
  {
    icon: ShieldCheck,
    title: "Institution-ready",
    body: "Roster management and class codes built in.",
  },
]

function BrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between bg-navy p-10 lg:flex">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal text-white">
          <GraduationCap className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-xl leading-tight text-white">Edura</p>
          <p className="text-xs text-white/50">Financial</p>
        </div>
      </div>

      <div className="max-w-md">
        <h2 className="font-display text-4xl leading-tight text-white">
          Financial confidence starts before graduation.
        </h2>
        <p className="mt-4 leading-relaxed text-white/60">
          Edura gives schools a structured pathway through the money skills
          students need — and gives teachers the visibility to support them.
        </p>

        <ul className="mt-9 space-y-5">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teal">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-white/50">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="text-xs text-white/35">
        © 2026 Edura Financial. All rights reserved.
      </p>
    </div>
  )
}

export default function AuthScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState("login")
  const [role, setRole] = useState("student")

  const isSignUp = mode === "signup"

  function handleSubmit(event) {
    event.preventDefault()
    // No auth backend yet — both flows land on the student dashboard.
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <BrandPanel />

      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:min-h-0 lg:justify-center">
        <div className="flex items-center justify-between gap-4">
          {/* Compact brand lockup for the single-column layout */}
          <span className="flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg text-navy">Edura</span>
          </span>

          <a
            href={MARKETING_URL}
            className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Website
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto w-full max-w-md flex-1 lg:flex-none"
        >
          <div className="mt-10 lg:mt-0">
            <h1 className="font-display text-3xl text-navy">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1.5 text-muted-foreground">
              {isSignUp
                ? "Join your class and start building money skills."
                : "Log in to pick up where you left off."}
            </p>
          </div>

          <Tabs value={mode} onValueChange={setMode} className="mt-7">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-teal"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-teal"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {isSignUp ? <RoleSelector value={role} onChange={setRole} /> : null}

            {isSignUp ? (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jordan Ellis"
                  required
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp ? (
                  <a
                    href="#forgot"
                    className="text-xs text-muted-foreground transition-colors hover:text-teal"
                  >
                    Forgot password?
                  </a>
                ) : null}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal hover:bg-teal-600"
              size="lg"
            >
              {isSignUp ? "Create account" : "Log In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <SsoButtons />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account? " : "New to Edura? "}
            <button
              type="button"
              onClick={() => setMode(isSignUp ? "login" : "signup")}
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              {isSignUp ? "Log in" : "Create one"}
            </button>
          </p>
        </motion.div>

        <p className="mt-10 text-center text-xs text-muted-foreground lg:hidden">
          © 2026 Edura Financial. All rights reserved.
        </p>
      </div>
    </div>
  )
}
