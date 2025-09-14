"use client";

import { useEffect, useState } from "react";
import { getCards, deleteCard } from "../lib/api";
import Link from "next/link";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      const res = await getCards();
      setCards(res.data);
    } catch (err) {
      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards(cards.filter((card) => card._id !== id));
    } catch {
      alert("Failed to delete card");
    }
  };

  if (loading) return <p className="text-gray-400">Loading cards...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card._id}
          className="p-4 border rounded-lg shadow-sm bg-gray-800 flex justify-between items-center"
        >
          <Link href={`/cards/${card._id}`} className="flex-1">
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-gray-400">🔥 Streak: {card.streak}</p>
          </Link>
          <button
            onClick={() => handleDelete(card._id)}
            className="ml-4 text-sm text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
