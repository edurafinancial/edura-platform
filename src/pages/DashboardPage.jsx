import React from "react";

import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    value: "-",
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
    <DashboardLayout navLinks={navLinks} footerLinks={footerLinks}>
      <header className="mb-10">
        <div className="text-on-surface-variant mb-4 flex items-center space-x-2 text-sm">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-on-surface font-medium">sadmanshowmiko07</span>
        </div>
        <h2 className="font-display text-secondary mb-3 text-5xl font-bold">
          Student Dashboard
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Welcome back. You have one module ready to start in your foundation
          path.
        </p>
      </header>

      <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <Card
            key={item.label}
            className="bg-surface-container-low border-surface-container-high rounded-xl border"
          >
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
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
                    <div className="bg-surface-container-low border-outline-variant/70 flex h-10 w-10 items-center justify-center rounded-full border-2">
                      <span className="material-symbols-outlined text-on-surface-variant/60 text-base">
                        lock
                      </span>
                    </div>
                  )}
                </div>
                <Card className="bg-surface-container-lowest ring-outline-variant/20 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1">
                  <CardContent className="flex items-center justify-between px-7 py-2">
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
                      <Button className="bg-primary text-white flex items-center rounded-md px-8 py-5 text-sm font-semibold shadow-md transition-all hover:shadow-lg">
                        {item.action}
                        <span className="material-symbols-outlined text-sm ml-2">
                          arrow_forward
                        </span>
                      </Button>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-surface-container-high text-on-surface-variant/70 rounded-sm px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        {item.action}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
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
          <h3 className="text-secondary text-xl font-bold">Advanced Topics</h3>
        </div>
        <div className="relative pl-12">
          <div className="border-outline-variant/70 absolute bottom-4 left-[19px] top-4 w-0.5 border-l-2 border-dashed" />
          <div className="space-y-6">
            {advanced.map((item) => (
              <div key={item.title} className="relative group">
                <div className="absolute -left-12 top-1/2 z-10 -translate-y-1/2">
                  <div className="bg-surface-container-low border-outline-variant/70 flex h-10 w-10 items-center justify-center rounded-full border-2">
                    <span className="material-symbols-outlined text-on-surface-variant/60 text-base">
                      lock
                    </span>
                  </div>
                </div>
                <Card className="bg-surface-container-lowest ring-outline-variant/20 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1">
                  <CardContent className="flex items-center justify-between px-7 py-2">
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
                    <Badge
                      variant="secondary"
                      className="bg-surface-container-high text-on-surface-variant/70 rounded-sm px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                      {item.action}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DashboardFooter />
      <div className="pointer-events-none fixed right-0 top-0 -z-10 h-1/2 w-1/3 bg-gradient-to-bl from-primary/5 to-transparent opacity-50 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-64 -z-10 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl" />
    </DashboardLayout>
  );
};

export default DashboardPage;
