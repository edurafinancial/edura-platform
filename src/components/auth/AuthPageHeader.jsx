export default function AuthPageHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent px-5 py-5 sm:px-8 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 sm:flex-row sm:items-start sm:justify-between">
        <span className="font-headline text-[2rem] font-bold tracking-tight text-primary sm:text-2xl">
          <span className="block sm:inline">Edura</span>
          <span className="block sm:ml-1 sm:inline">Financial</span>
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 self-stretch sm:self-auto">
          <a
            className="font-label text-secondary text-base font-medium transition-colors hover:text-primary"
            href="https://edurafinancial.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Back to Website
          </a>
          <button
            type="button"
            className="font-label text-secondary text-base font-medium transition-colors hover:text-primary"
          >
            Support
          </button>
        </div>
      </div>
    </header>
  );
}
