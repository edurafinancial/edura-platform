export default function SignUpHeader() {
  return (
    <header className="absolute top-0 z-50 flex w-full items-center justify-between bg-transparent px-8 py-6">
      <div className="flex items-center gap-2">
        <span className="font-headline text-2xl font-bold tracking-tight text-primary">
          Edura Financial
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a
          className="font-medium text-slate-600 transition-colors hover:text-primary"
          href="https://edurafinancial.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Back to Website
        </a>
        <button
          type="button"
          className="font-medium text-slate-600 transition-colors hover:text-primary"
        >
          Support
        </button>
      </div>
    </header>
  );
}
