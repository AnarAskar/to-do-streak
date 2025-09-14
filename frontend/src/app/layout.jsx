import "./globals.css";

export const metadata = {
  title: "Habit Tracker",
  description: "Track your habits with streaks and tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-gray-50">{children}</body>
    </html>
  );
}
