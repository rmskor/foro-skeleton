"use client";
import React from "react";

export interface ProfileCustomizationProps {
  firstName?: string;
  surname?: string;
  username?: string;
  age?: string;
  email?: string;
  onChange?: (field: string, value: string) => void;
}

export default function ProfileCustomization({
  firstName = "",
  surname = "",
  username = "",
  age = "",
  email = "",
  onChange,
}: ProfileCustomizationProps) {
  const inputClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Customisation
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">Name</span>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => onChange?.("firstName", e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 sm:mt-6">
          <input type="text" placeholder="Surname" value={surname} onChange={(e) => onChange?.("surname", e.target.value)} className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">Username</span>
          <input type="text" placeholder="My username" value={username} onChange={(e) => onChange?.("username", e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">Age</span>
          <input type="text" placeholder="Age" value={age} onChange={(e) => onChange?.("age", e.target.value)} className={inputClass} />
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Mail</span>
        <input type="email" placeholder="My email" value={email} onChange={(e) => onChange?.("email", e.target.value)} className={inputClass} />
      </label>
    </div>
  );
}
