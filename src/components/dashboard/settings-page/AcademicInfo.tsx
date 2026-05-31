"use client";
import React from "react";

export interface Subject {
  name: string;
  color: string; // tailwind bg class e.g. "bg-orange-500"
  icon?: string;
}

export interface AcademicInfoProps {
  grade?: string;
  subjects?: Subject[];
  email?: string;
  onGradeChange?: (value: string) => void;
  onAddSubject?: () => void;
  onEmailChange?: (value: string) => void;
}

const defaultSubjects: Subject[] = [
  { name: "Engineering", color: "bg-orange-500", icon: "⚙️" },
  { name: "Maths", color: "bg-blue-500", icon: "∂x" },
  { name: "Business", color: "bg-yellow-600", icon: "📊" },
];

export default function AcademicInfo({
  grade = "",
  subjects = defaultSubjects,
  email = "",
  onGradeChange,
  onAddSubject,
  onEmailChange,
}: AcademicInfoProps) {
  const inputClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Academic information
      </h2>

      <label className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Grade</span>
        <select value={grade} onChange={(e) => onGradeChange?.(e.target.value)} className={`${inputClass} appearance-none`}>
          <option value="" disabled>My grade</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
      </label>

      <div className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Subjects and interests</span>
        <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-cream px-4 py-3">
          {subjects.map((s) => (
            <span key={s.name} className={`${s.color} inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-space-grotesk text-sm font-medium text-white`}>
              {s.name} {s.icon && <span className="text-xs">{s.icon}</span>}
            </span>
          ))}
          <button onClick={onAddSubject} aria-label="Add subject" className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-700 transition-colors hover:bg-gray-200">
            +
          </button>
        </div>
      </div>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Mail</span>
        <input type="email" placeholder="My email" value={email} onChange={(e) => onEmailChange?.(e.target.value)} className={inputClass} />
      </label>
    </div>
  );
}
