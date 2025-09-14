"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCard } from "@/src/lib/api";

export default function NewCardPage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createCard(title);
      router.push("/"); // go back to dashboard
    } catch {
      alert("Failed to create card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="mb-6 px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Create New Card</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </main>
  );
}
