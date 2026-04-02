import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "@/components/auth/LoginForm";
import AuthHeroPanel from "@/components/auth/AuthHeroPanel";
import AuthPageHeader from "@/components/auth/AuthPageHeader";
import AuthModeIntro from "@/components/auth/AuthModeIntro";
import SignUpForm from "@/components/auth/SignUpForm";

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
        <section className="bg-surface relative flex min-h-screen items-center justify-center px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pt-24">
          <Tabs
            value={mode}
            onValueChange={onModeChange}
            className="w-full max-w-lg gap-0"
          >
            <AuthModeIntro mode={mode} />

            <TabsList className="bg-surface-container-high mb-10 grid h-14 w-full grid-cols-2 rounded-[1rem] p-1.5">
              <TabsTrigger
                value="login"
                className="font-label h-full w-full cursor-pointer rounded-[0.75rem] border-0 bg-transparent px-6 text-[15px] font-semibold text-[#6d7a77] shadow-none ring-0 transition-all hover:text-on-surface data-[state=active]:bg-white data-[state=active]:text-on-surface data-[state=active]:shadow-[0_2px_10px_rgba(26,28,27,0.10)]"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="font-label h-full w-full cursor-pointer rounded-[0.75rem] border-0 bg-transparent px-6 text-[15px] font-semibold text-[#6d7a77] shadow-none ring-0 transition-all hover:text-on-surface data-[state=active]:bg-white data-[state=active]:text-on-surface data-[state=active]:shadow-[0_2px_10px_rgba(26,28,27,0.10)]"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm defaultValues={loginValues} onSubmit={onLoginSubmit} />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <SignUpForm
                defaultValues={signupDefaultValues}
                onSubmit={onSignupSubmit}
              />
            </TabsContent>
          </Tabs>

          <footer className="font-ui-mono absolute bottom-8 text-xs text-slate-400">
            @ 2026 Edura Financial Systems. Secure 256-bit SSL Encrypted Access.
          </footer>
        </section>
      </main>
    </>
  );
}
