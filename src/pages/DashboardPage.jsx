import React from "react";

const navLinks = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Curriculum", icon: "menu_book" },
  { label: "Students", icon: "group" },
  { label: "Analytics", icon: "analytics" },
];

const footerLinks = [
  { label: "Settings", icon: "settings" },
  { label: "Support", icon: "help" },
];

const stats = [
  {
    label: "Modules Completed",
    value: "0",
    suffix: "/12",
  },
  {
    label: "Avg Quiz Score",
    value: "—",
  },
  {
    label: "Total Progress",
    value: "0%",
    progress: 0,
  },
];

const foundations = [
  {
    title: "How Money Works",
    description:
      "Master the basics of inflation, purchasing power, and the flow of capital.",
    status: "active",
    action: "Start",
  },
  {
    title: "Banking Without Confusion",
    description:
      "Everything you weren't taught about accounts, fees, and security.",
    status: "locked",
    action: "Coming soon",
  },
  {
    title: "Credit: Your Financial Reputation",
    description:
      "The high-stakes game of credit scores and how to win it early.",
    status: "locked",
    action: "Coming soon",
  },
];

const advanced = [
  {
    title: "Decode Your First Paycheck",
    description: "Understanding deductions, withholdings, and gross vs net.",
    status: "locked",
    action: "Coming soon",
  },
  {
    title: "Student Loans Demystified",
    description:
      "Strategies for repayment and understanding compounding interest.",
    status: "locked",
    action: "Coming soon",
  },
];

const DashboardPage = () => {
  return (
    <>
      <aside className="bg-surface-container-low fixed left-0 top-0 z-50 flex h-full w-64 flex-col space-y-2 p-4 text-sm">
        <div className="mb-8 flex items-center space-x-3 px-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded text-white font-black">
            E
          </div>
          <div>
            <h1 className="font-headline text-on-surface text-lg font-black leading-tight">
              Edura Admin
            </h1>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">
              Financial Panel
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              className={
                item.active
                  ? "bg-surface-container-lowest text-primary flex items-center rounded-lg px-3 py-2 font-bold shadow-sm transition-all hover:translate-x-1"
                  : "text-on-surface-variant hover:bg-surface-container-high flex items-center rounded-lg px-3 py-2 transition-all hover:translate-x-1"
              }
              href="#"
            >
              <span className="material-symbols-outlined mr-3">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="bg-primary mt-4 w-full rounded-lg py-2 font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-95">
          New Report
        </button>
        <div className="border-outline-variant space-y-1 border-t pt-4">
          {footerLinks.map((item) => (
            <a
              key={item.label}
              className="text-on-surface-variant hover:bg-surface-container-high flex items-center rounded-lg px-3 py-2 transition-all hover:translate-x-1"
              href="#"
            >
              <span className="material-symbols-outlined mr-3">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </aside>
      <main className="ml-64 min-h-screen flex flex-col">
        <header className="bg-surface/80 border-surface-container sticky top-0 z-40 flex w-full items-center justify-between border-b px-8 py-3 backdrop-blur-md lg:px-16">
          <div className="flex items-center space-x-4">
            <h3 className="text-secondary text-sm font-semibold uppercase tracking-wider">
              Dashboard
            </h3>
          </div>
          <div className="mx-8 max-w-md flex-1">
            <div className="relative group">
              <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                search
              </span>
              <input
                className="bg-surface-container-low w-full rounded-full border-none py-2 pl-10 pr-4 text-sm transition-all placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-primary/30"
                placeholder="Search modules, lessons..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <button className="text-on-surface-variant transition-colors hover:text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant transition-colors hover:text-primary">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="bg-primary-container/20 border-surface-container-high flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
              <img
                alt="User Avatar"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQyxYt5HpnbbTMMGCFSNFnHrBujHAK4tb0fdzNDOkGObnWP3Vso-YLfJiWcZLAaUkOHozM9pH1KgzNJzWMTEraPrptwhpdCvmxJRZYE6VnMb1pyy8it61z_P-s7NF32YSKd34JbG4hW71TOQyrbs8IkI3NFeMjIEzidRLC517oqKianD8-Cfh7kmtJBSvbqllLiJuFVLi7kZ9X04GnUXd8IWZinB54FfZ355xuuWIUqH6Mtce66lV6Ub_JILdZZmQTfRwYoPal0Do"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl p-8 lg:px-0">
          <header className="mb-10">
            <div className="text-on-surface-variant mb-4 flex items-center space-x-2 text-sm">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-on-surface font-medium">
                sadmanshowmiko07
              </span>
            </div>
            <h2 className="font-display text-secondary mb-3 text-5xl font-bold">
              Student Dashboard
            </h2>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Welcome back. You have one module ready to start in your
              foundation path.
            </p>
          </header>

          <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-surface-container-low border-surface-container-high rounded-xl border p-6"
              >
                {item.progress !== undefined ? (
                  <>
                    <div className="mb-4 flex items-end justify-between">
                      <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                        {item.label}
                      </span>
                      <span className="font-ui-mono text-primary text-lg font-bold">
                        {item.value}
                      </span>
                    </div>
                    <div className="bg-surface-container-high h-2.5 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-on-surface-variant mb-4 block text-xs font-semibold uppercase tracking-widest">
                      {item.label}
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="font-ui-mono text-secondary text-4xl font-bold">
                        {item.value}
                      </span>
                      {item.suffix ? (
                        <span className="font-ui-mono text-on-surface-variant text-lg">
                          {item.suffix}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            ))}
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <div className="bg-tertiary/20 text-tertiary flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                F
              </div>
              <h3 className="text-secondary text-xl font-bold">Foundations</h3>
            </div>
            <div className="relative pl-12">
              <div className="border-outline-variant/70 absolute bottom-4 left-[19px] top-4 w-0.5 border-l-2 border-dashed" />
              <div className="space-y-6">
                {foundations.map((item) => (
                  <div key={item.title} className="relative group">
                    <div className="absolute -left-12 top-1/2 z-10 -translate-y-1/2">
                      {item.status === "active" ? (
                        <div className="bg-surface border-primary flex h-10 w-10 items-center justify-center rounded-full border-4">
                          <div className="bg-primary h-2.5 w-2.5 animate-pulse rounded-full" />
                        </div>
                      ) : (
                        <div className="bg-surface-container-high border-outline-variant/70 flex h-10 w-10 items-center justify-center rounded-full border-2">
                          <span className="material-symbols-outlined text-on-surface-variant/70 text-base">
                            lock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="bg-surface-container-lowest ring-outline-variant/20 flex items-center justify-between rounded-xl p-7 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1">
                      <div className="flex flex-1 items-center">
                        <div
                          className={
                            item.status === "active"
                              ? "bg-primary mr-6 h-2.5 w-2.5 rounded-full shadow-[0_0_0_5px_rgba(42,157,143,0.18)]"
                              : "bg-outline-variant/60 mr-6 h-2.5 w-2.5 rounded-full"
                          }
                        />
                        <div>
                          <h4
                            className={
                              item.status === "active"
                                ? "font-body text-secondary text-lg font-semibold"
                                : "font-body text-on-surface-variant/70 text-lg font-semibold"
                            }
                          >
                            {item.title}
                          </h4>
                          <p
                            className={
                              item.status === "active"
                                ? "text-on-surface-variant mt-0.5 text-sm"
                                : "text-on-surface-variant/60 mt-0.5 text-sm"
                            }
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.status === "active" ? (
                        <button className="bg-primary text-white flex items-center rounded-lg px-6 py-2 text-sm font-semibold shadow-md transition-all hover:shadow-lg active:scale-95">
                          {item.action}
                          <span className="material-symbols-outlined text-sm ml-2">
                            arrow_forward
                          </span>
                        </button>
                      ) : (
                        <div className="bg-surface-container-high rounded-md px-3 py-1">
                          <span className="text-on-surface-variant/70 text-[9px] font-bold uppercase tracking-[0.2em]">
                            {item.action}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                A
              </div>
              <h3 className="text-secondary text-xl font-bold">
                Advanced Topics
              </h3>
            </div>
            <div className="relative pl-12">
              <div className="border-outline-variant/70 absolute bottom-4 left-[19px] top-4 w-0.5 border-l-2 border-dashed" />
              <div className="space-y-6">
                {advanced.map((item) => (
                  <div key={item.title} className="relative group">
                    <div className="absolute -left-12 top-1/2 z-10 -translate-y-1/2">
                      <div className="bg-surface-container-high border-outline-variant/70 flex h-10 w-10 items-center justify-center rounded-full border-2">
                        <span className="material-symbols-outlined text-on-surface-variant/70 text-base">
                          lock
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest ring-outline-variant/20 flex items-center justify-between rounded-xl p-7 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1">
                      <div className="flex flex-1 items-center">
                        <div className="bg-outline-variant/60 mr-6 h-2.5 w-2.5 rounded-full" />
                        <div>
                          <h4 className="font-body text-on-surface-variant/70 text-lg font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-on-surface-variant/60 mt-0.5 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="bg-surface-container-high rounded-md px-3 py-1">
                        <span className="text-on-surface-variant/70 text-[9px] font-bold uppercase tracking-[0.2em]">
                          {item.action}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-surface-container mt-8 flex w-full flex-col items-center justify-between px-0 py-12 font-body text-xs text-on-surface-variant md:flex-row">
            <p>© 2026 Edura Financial. All rights reserved.</p>
            <div className="mt-6 flex space-x-8 md:mt-0">
              <a className="hover:text-primary transition-colors" href="#">
                Website
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
            </div>
          </footer>
        </div>

        <div className="pointer-events-none fixed right-0 top-0 -z-10 h-1/2 w-1/3 bg-gradient-to-bl from-primary/5 to-transparent opacity-50 blur-3xl" />
        <div className="pointer-events-none fixed bottom-0 left-64 -z-10 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl" />
      </main>
    </>
  );
};

export default DashboardPage;
