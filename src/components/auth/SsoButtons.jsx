import { Building2, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/state/AuthProvider";
import { useState } from "react";

/** Google's mark, inlined so it renders without an external request. */
function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51Z"
      />
    </svg>
  );
}

export default function SsoButtons() {
  const { signInWithGitHub, isConfigured, error } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleGitHub() {
    setPending(true);
    // On success the browser leaves for GitHub, so `pending` stays true.
    await signInWithGitHub();
    setPending(false);
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        onClick={handleGitHub}
        disabled={!isConfigured || pending}
        className="w-full gap-2 bg-navy text-white hover:bg-navy-700"
        size="lg"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Github className="h-4 w-4" aria-hidden="true" />
        )}
        Sign in with GitHub
      </Button>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button type="button" variant="outline" className="gap-2" disabled>
          <GoogleIcon />
          Google
        </Button>
        <Button type="button" variant="outline" className="gap-2" disabled>
          <Building2 className="h-4 w-4" aria-hidden="true" />
          University Login
        </Button>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {!isConfigured ? (
        <p className="text-xs text-muted-foreground">
          Sign-in is unavailable until Supabase environment variables are set.
        </p>
      ) : null}
    </div>
  );
}
