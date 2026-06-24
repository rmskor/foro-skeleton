"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ProfilePicture() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Mail");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled || !user) return;

      const name =
        user.user_metadata?.full_name ??
        user.user_metadata?.username ??
        user.email?.split("@")[0] ??
        "Username";

      setUsername(name);
      setEmail(user.email ?? "Mail");

      const avatarUrl =
        user.user_metadata?.avatar_url ?? null;
      if (avatarUrl) setProfileImage(avatarUrl);
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePhotoChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type and size (max 5 MB)
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be smaller than 5 MB.");
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated.");

        const fileExt = file.name.split(".").pop() ?? "jpg";
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        // Retrieve the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath);

        // Persist avatar URL on the user record
        await supabase.auth.updateUser({
          data: { avatar_url: publicUrl },
        });

        // Also upsert into profiles table so other queries pick it up
        await supabase.from("profiles").upsert(
          { id: user.id, avatar_url: publicUrl },
          { onConflict: "id" }
        );

        setProfileImage(publicUrl);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload photo."
        );
      } finally {
        setUploading(false);
        // Clear the input so the same file can be re-selected
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    []
  );

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <div className="flex items-center gap-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Change profile picture"
          className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4D4D4] transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-[#F2EFE6] disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="h-full w-full bg-gray-300" />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-0.5">
          <span className="font-space-grotesk text-2xl font-semibold text-gray-900">
            {username}
          </span>
          <span className="font-space-grotesk text-lg text-gray-500">
            {email}
          </span>
          <span className="font-space-grotesk text-md text-gray-400 italic">
            {uploading ? "Uploading…" : error ?? "Tap photo to change"}
          </span>
        </div>
      </div>

      {error && (
        <p className="mt-4 font-space-grotesk text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}