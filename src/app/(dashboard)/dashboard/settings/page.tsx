import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfilePicture from "@/components/dashboard/settings-page/ProfilePicture";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-cream">
      <span className="sticky top-0 h-screen">
        <Sidebar />
      </span>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
        
        {/*           
          <h1 className="p-2 text-2xl font-semibold font-garamond">
            Settings
          </h1> */}
          
          <ProfilePicture />

          <div className="mt-6 p-2">
            
          </div>

        </div>
      </main>
    </div>
  );
}