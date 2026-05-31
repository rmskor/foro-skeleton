"use client";
import React from "react";

export interface LanguageAndRegionProps {
  language?: string;
  region?: string;
  onLanguageChange?: (value: string) => void;
  onRegionChange?: (value: string) => void;
}

export default function LanguageAndRegion({
  language = "",
  region = "",
  onLanguageChange,
  onRegionChange,
}: LanguageAndRegionProps) {
  const selectClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Language and Region
      </h2>

      <label className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Language</span>
        <select value={language} onChange={(e) => onLanguageChange?.(e.target.value)} className={selectClass}>
          <option value="" disabled>Your Language</option>
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </label>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Region</span>
        <select value={region} onChange={(e) => onRegionChange?.(e.target.value)} className={selectClass}>
          <option value="" disabled>Your Region</option>
          <option value="hk">Hong Kong</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="sg">Singapore</option>
        </select>
      </label>
    </div>
  );
}
