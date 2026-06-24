"use client";

import React from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "profile-picture", label: "Profile Picture" },
  { id: "profile-customisation", label: "Profile Customisation" },
  { id: "academic-information", label: "Academic Information" },
  { id: "language-and-region", label: "Language & Region" },
  { id: "account-settings", label: "Account Settings" },
];

export default function SettingsNav() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="sticky top-8 w-56 shrink-0 self-start" aria-label="Settings sections">
      <p className="mb-4 font-space-grotesk text-xs font-semibold uppercase tracking-[2px] text-gray-500">
        On this page
      </p>
      <ul className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className="w-full rounded-md px-3 py-2 text-left font-space-grotesk text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
