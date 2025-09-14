"use client";

import { useState } from "react";
import { createCard } from "../lib/api";

export default function CreateCardForm({ onCardCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await createCard(title);
      onCardCreated(res.data); // notify parent to update list
      setTitle("");
    } catch {
      setError("Failed to create card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="New card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
