"use client";
import React, { useState } from "react";

export interface ProfileCustomizationProps {
  firstName?: string;
  surname?: string;
  username?: string;
  age?: string;
  grade?: string;
  onChange?: (field: string, value: string) => void;
}

const GRADE_OPTIONS = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "University - Year 1",
  "University - Year 2",
  "University - Year 3",
  "University - Year 4+",
  "Other",
];

export default function ProfileCustomization({
  firstName = "",
  surname = "",
  username = "",
  age = "",
  grade = "",
  onChange,
}: ProfileCustomizationProps) {
  const [ageError, setAgeError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400";

  function handleAgeChange(value: string) {
    // Allow empty string while user is clearing the field
    if (value === "") {
      setAgeError(null);
      onChange?.("age", value);
      return;
    }

    // Must be a positive integer
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1 || num > 120) {
      setAgeError("Age must be a whole number (1–120).");
      // Still update the raw value so the user can see what they typed
      onChange?.("age", value);
      return;
    }

    setAgeError(null);
    onChange?.("age", value);
  }


  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Customisation
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Name
          </span>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => onChange?.("firstName", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:mt-6">
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => onChange?.("surname", e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Username
          </span>
          <input
            type="text"
            placeholder="My username"
            value={username}
            onChange={(e) => onChange?.("username", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Age
          </span>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="120"
            step="1"
            placeholder="Age"
            value={age}
            onChange={(e) => handleAgeChange(e.target.value)}
            className={`${inputClass} ${
              ageError
                ? "border-red-500 focus:ring-red-400"
                : ""
            }`}
          />
          {ageError && (
            <span className="font-space-grotesk text-xs text-red-600">
              {ageError}
            </span>
          )}
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">
          Grade
        </span>
        <select
          value={grade}
          onChange={(e) => onChange?.("grade", e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            My grade
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
