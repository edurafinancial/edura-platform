import { ArrowLeft, Compass, GraduationCap, LifeBuoy } from "lucide-react";
import { Link } from "react-router";

import eduraFinancialLogo from "@/assets/EduraFinancialLogo.webp";

const quickLinks = [
  "Financial Literacy 101",
  "Wealth Management",
  "Risk Assessment",
];

export default function Error404Page() {
  return (
    <div className="bg-surface min-h-screen px-5 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center">
            <img
              src={eduraFinancialLogo}
              alt="Edura Financial"
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          <Link
            to="/"
            className="font-label text-secondary inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back Home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="w-full max-w-4xl text-center">
            <div className="relative mx-auto mb-10 flex w-full max-w-xl justify-center">
              <div className="absolute inset-x-10 top-6 h-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="bg-surface-container-lowest ring-outline-variant/15 relative w-full rounded-[1rem] px-6 py-8 shadow-[0_20px_40px_rgba(26,28,27,0.06)] ring-1 sm:px-10 sm:py-10">
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-low">
                  <Compass className="size-14 text-primary" strokeWidth={1.8} />
                </div>

                <div className="mb-3 flex items-center justify-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined fill-icon text-lg">
                    stars
                  </span>
                  <span className="material-symbols-outlined fill-icon text-lg">
                    stars
                  </span>
                  <span className="material-symbols-outlined fill-icon text-lg">
                    stars
                  </span>
                </div>

                <p className="font-display text-primary mb-2 text-2xl italic sm:text-3xl">
                  The Academic Curator
                </p>
                <h1 className="font-headline text-on-surface text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
                  404
                </h1>
              </div>
            </div>

            <div className="mx-auto mb-10 max-w-2xl space-y-4">
              <h2 className="font-headline text-secondary text-3xl font-extrabold tracking-tight sm:text-4xl">
                Oops! This page has wandered off-campus.
              </h2>
              <p className="font-body text-on-surface-variant text-base leading-7 sm:text-lg">
                The page you are looking for might have been moved, deleted, or
                never existed in our curriculum.
              </p>
            </div>

            <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                className="font-label bg-primary-container text-on-primary-container inline-flex min-w-[220px] items-center justify-center gap-2 rounded-[0.75rem] px-6 py-4 text-sm font-bold shadow-[0_16px_32px_rgba(42,157,143,0.18)] transition-all hover:bg-secondary hover:text-white active:translate-y-px"
              >
                <GraduationCap className="size-4" />
                Return to Dashboard
              </Link>
              <a
                href="https://edurafinancial.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-secondary bg-surface-container-low inline-flex min-w-[220px] items-center justify-center gap-2 rounded-[0.75rem] px-6 py-4 text-sm font-bold transition-all hover:bg-surface-container-high active:translate-y-px"
              >
                <LifeBuoy className="size-4" />
                Visit Help Center
              </a>
            </div>

            <div className="mx-auto max-w-lg border-t border-outline-variant/30 pt-8">
              <p className="font-label text-on-surface-variant mb-4 text-xs font-bold uppercase tracking-[0.18em]">
                Quick Study Links
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {quickLinks.map((item) => (
                  <span
                    key={item}
                    className="font-label text-on-surface-variant bg-surface-container-low inline-flex rounded-full px-4 py-2 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
