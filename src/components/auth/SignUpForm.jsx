import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";

import AuthProviders from "@/components/auth/AuthProviders";
import SignUpFields from "@/components/auth/SignUpFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CreateSignUpSchema } from "@/schemas/CreateSignUpSchema";

export default function SignUpForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(CreateSignUpSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      school: defaultValues?.school ?? "",
      role: defaultValues?.role ?? "student",
    },
  });

  const isBusy = form.formState.isSubmitting || form.formState.isValidating;

  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <SignUpFields form={form} />

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isBusy}
              className="font-headline bg-primary-container text-on-primary-container shadow-primary/10 h-auto w-full rounded-xl py-4 font-bold transition-all hover:bg-secondary active:scale-[0.98]"
            >
              {isBusy ? <LoaderCircle className="animate-spin" /> : null}
              Create Account
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Button>
          </div>

          <AuthProviders />

          <p className="text-on-surface-variant font-body text-center text-xs">
            By signing up, you agree to the{" "}
            <a
              className="underline transition-colors hover:text-primary"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="underline transition-colors hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
