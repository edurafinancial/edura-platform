import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import AuthProviders from "@/components/auth/AuthProviders";
import LoginFields from "@/components/auth/LoginFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SubmitLoginSchema } from "@/schemas/SubmitLoginSchema";

export default function LoginForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(SubmitLoginSchema),
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      remember: defaultValues?.remember ?? false,
    },
  });

  const isBusy = form.formState.isSubmitting || form.formState.isValidating;

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <LoginFields form={form} />

          <Button
            type="submit"
            disabled={isBusy}
            className="font-headline bg-primary-container text-on-primary-container shadow-primary/10 h-auto w-full rounded-xl py-4 font-bold transition-all hover:bg-secondary active:scale-[0.98]"
          >
            {isBusy ? <LoaderCircle className="animate-spin" /> : null}
            Log In
          </Button>

          <AuthProviders />

          <p className="text-on-surface-variant font-body text-center text-xs">
            By continuing, you agree to the{" "}
            <a className="underline transition-colors hover:text-primary" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline transition-colors hover:text-primary" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </Form>
    </div>
  );
}
