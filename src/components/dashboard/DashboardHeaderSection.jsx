export default function DashboardHeaderSection({ userEmail }) {
  return (
    <header className="mb-10">
      <div className="text-on-surface-variant mb-4 flex items-center gap-2 text-sm">
        <span>Workspace</span>
        <span>/</span>
        <span className="text-on-surface font-medium">{userEmail}</span>
      </div>
      <h2 className="font-display text-secondary mb-3 text-5xl font-bold">
        Student Dashboard
      </h2>
      <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
        Welcome back. You have one module ready to start in your foundation
        path.
      </p>
    </header>
  );
}
