"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCard, createTask, completeTask, deleteTask } from "@/src//lib/api";
import confetti from "canvas-confetti";

export default function CardDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [card, setCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [streakCelebrated, setStreakCelebrated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const celebrateStreak = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const playSuccessSound = () => {
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 1; // softer volume
    audio.play();
  };

  // Fetch card + tasks
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCard(id);
        setCard(res.data.card);
        setTasks(res.data.tasks || []);
      } catch {
        alert("Failed to fetch card");
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await createTask(id, newTask);
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch {
      alert("Failed to add task");
    }
  };

  const handleToggleComplete = async (task) => {
    if (task.completed) return; // already completed

    playSuccessSound();

    try {
      await completeTask(task._id);

      // Refresh card + tasks from backend
      const res = await getCard(id);

      // check if streak increased
      if (res.data.card.streak > card.streak) {
        setStreakCelebrated(true);
        setShowPopup(true); // ✅ show popup
        setTimeout(() => {
          setStreakCelebrated(false);
          setShowPopup(false); // ✅ hide popup after animation
        }, 1500);

        celebrateStreak(); // 🎉 confetti
      }

      setCard(res.data.card);
      setTasks(res.data.tasks || []);
    } catch {
      alert("Failed to complete task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch {
      alert("Failed to delete task");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!card) return null;

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="mb-6 px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{card.title}</h1>
      <div className="relative mb-6">
        <p
          className={`text-gray-400 ${
            streakCelebrated
              ? "animate-pulse text-yellow-400 streak-bounce"
              : ""
          }`}
        >
          🔥 Streak: {card.streak}
        </p>
        {showPopup && <span className="streak-popup">+1 Streak!</span>}
      </div>
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </form>

      {/* Active Tasks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Tasks</h2>
        {activeTasks.length === 0 ? (
          <p className="text-gray-400">No active tasks.</p>
        ) : (
          <ul className="space-y-3">
            {activeTasks.map((task) => (
              <li
                key={task._id}
                className="p-3 rounded flex justify-between items-center bg-gray-800"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => handleToggleComplete(task)}
                    className="h-4 w-4"
                  />
                  <span>{task.text}</span>
                </label>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Completed Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Completed</h2>
        {completedTasks.length === 0 ? (
          <p className="text-gray-400">No completed tasks yet.</p>
        ) : (
          <ul className="space-y-3">
            {completedTasks.map((task) => (
              <li
                key={task._id}
                className="p-3 rounded flex justify-between items-center bg-gray-700 line-through text-gray-400"
              >
                <span>{task.text}</span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
