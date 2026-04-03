import React from "react";

export default function DashboardFooter() {
  return (
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
  );
}
