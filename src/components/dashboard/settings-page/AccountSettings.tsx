"use client";
import React from "react";

export interface AccountSettingsProps {
  onDeactivate?: () => void;
}

export default function AccountSettings({ onDeactivate }: AccountSettingsProps) {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Account Settings
      </h2>

      <div className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Deactivate account</span>
        <button
          onClick={onDeactivate}
          className="w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 text-left font-space-grotesk text-base text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Tap to deactivate
        </button>
      </div>
    </div>
  );
}
