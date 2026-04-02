import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
    >
      <path
        fill="#4285F4"
        d="M21.64 12.2c0-.64-.06-1.25-.16-1.84H12v3.48h5.41a4.63 4.63 0 0 1-2 3.04v2.52h3.24c1.9-1.75 2.99-4.34 2.99-7.2Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.24-2.52c-.9.6-2.06.95-3.37.95-2.59 0-4.78-1.75-5.56-4.1H3.09v2.6A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.44 13.9A5.99 5.99 0 0 1 6.13 12c0-.66.11-1.31.31-1.9V7.5H3.09a9.99 9.99 0 0 0 0 9l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.47 0 2.8.51 3.84 1.52l2.88-2.88C16.95 2.98 14.7 2 12 2A9.99 9.99 0 0 0 3.09 7.5l3.35 2.6C7.22 7.75 9.41 6 12 6Z"
      />
    </svg>
  );
}

export default function AuthProviders() {
  return (
    <>
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-outline-variant/50" />
        <div className="font-label text-on-surface-variant text-[11px] font-extrabold uppercase tracking-[0.18em]">
          or continue with
        </div>
        <div className="h-px flex-1 bg-outline-variant/50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="font-label text-on-surface h-12 rounded-xl border-outline-variant bg-surface-container-lowest font-semibold"
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="font-label text-on-surface h-12 rounded-xl border-outline-variant bg-surface-container-lowest font-semibold"
        >
          <Building2 className="size-4" />
          University SSO
        </Button>
      </div>
    </>
  );
}
