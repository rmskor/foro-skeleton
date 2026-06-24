"use client";
import React from "react";
import { Button } from "@/components/Button";

// Add logic to interact with backend. 

export default function SaveDiscard() {
    return (
      <div className="flex flex-row mx-auto w-full max-w-6xl gap-5">
        <Button
          href="/"
          bg="olive"
          size="lg"
          className="hover:scale-102 w-full sm:w-64"
        >
          Save Changes
        </Button>

        <Button
          href="/"
          bg="mauve"
          size="lg"
          className="hover:scale-102 w-full sm:w-64"
        >
          Discard Changes
        </Button>
      </div>
    );
}