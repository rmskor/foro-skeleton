import React from "react";
import Image from "next/image";

export interface ProfilePictureProps {
  username?: string;
  email?: string;
  profileImage?: string; 
  onPhotoChange?: () => void;
}

export default function ProfilePicture({
  username = "Username",
  email = "Mail",
  profileImage,
  onPhotoChange,
}: ProfilePictureProps) {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Picture
      </h2>

      <div className="flex items-center gap-6">
        <button
          onClick={onPhotoChange}
          aria-label="Change profile picture"
          className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4D4D4] transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-[#F2EFE6]"
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt={`${username}'s profile picture`}
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            // if no image, use this as placeholder.
            <div className="h-full w-full bg-gray-300" />
          )}
        </button>

        <div className="flex flex-col gap-0.5">
          <span className="font-space-grotesk text-2xl font-semibold text-gray-900">
            {username}
          </span>
          <span className="font-space-grotesk text-lg text-gray-500">
            {email}
          </span>
          <span className="font-space-grotesk text-md text-gray-400 italic">
            Tap photo to change
          </span>
        </div>
      </div>
    </div>
  );
}