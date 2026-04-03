import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AuthHeroPanel from "@/components/auth/AuthHeroPanel";
import AuthModeIntro from "@/components/auth/AuthModeIntro";
import AuthPageHeader from "@/components/auth/AuthPageHeader";

const LoginForm = lazy(() => import("@/components/auth/LoginForm"));
const SignUpForm = lazy(() => import("@/components/auth/SignUpForm"));

function AuthFormSkeleton() {
  return (
    <div className="bg-surface-container-lowest ring-outline-variant/15 rounded-[1rem] p-8 ring-1">
      <Skeleton className="mb-4 h-4 w-2/3 rounded-full" />
      <Skeleton className="mb-10 h-3 w-1/2 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function AuthPage({
  mode,
  onModeChange,
  loginValues,
  signupDefaultValues,
  onLoginSubmit,
  onSignupSubmit,
}) {
  return (
    <>
      <AuthPageHeader />
      <main className="min-h-screen lg:grid lg:grid-cols-2">
        <AuthHeroPanel />
        <section className="bg-surface relative flex min-h-screen items-center justify-center px-5 pb-20 pt-20 sm:px-8 sm:pt-40 lg:px-12 lg:pt-24">
          <Tabs
            value={mode}
            onValueChange={onModeChange}
            className="w-full max-w-lg gap-0"
          >
            <AuthModeIntro mode={mode} />

            <TabsList className="bg-surface-container-high mb-10 grid h-14 w-full grid-cols-2 rounded-[1rem] p-1.5">
              <TabsTrigger
                value="login"
                className="font-label h-full w-full cursor-pointer rounded-[0.75rem] border-0 bg-transparent px-6 text-[15px] font-semibold text-[#6d7a77] shadow-none ring-0 transition-all hover:text-on-surface data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-[0_2px_10px_rgba(26,28,27,0.10)]"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="font-label h-full w-full cursor-pointer rounded-[0.75rem] border-0 bg-transparent px-6 text-[15px] font-semibold text-[#6d7a77] shadow-none ring-0 transition-all hover:text-on-surface data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-[0_2px_10px_rgba(26,28,27,0.10)]"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <Suspense
              fallback={<AuthFormSkeleton />}
            >
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <LoginForm
                      defaultValues={loginValues}
                      onSubmit={onLoginSubmit}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <SignUpForm
                      defaultValues={signupDefaultValues}
                      onSubmit={onSignupSubmit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Suspense>
          </Tabs>

          <footer className="font-ui-mono absolute bottom-8 text-xs text-slate-400">
            @ 2026 Edura Financial Systems. Secure 256-bit SSL Encrypted Access.
          </footer>
        </section>
      </main>
    </>
  );
}
