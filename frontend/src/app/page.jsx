import CardList from "../components/CardList";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habit Tracker Dashboard</h1>
        <Link
          href="/cards/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Card
        </Link>
      </div>
      <CardList />
    </main>
  );
}
