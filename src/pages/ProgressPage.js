import React, { useState, useEffect } from "react";

function ProgressPage() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(log));
  }, [log]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight) {
      const newEntry = {
        weight: parseFloat(weight),
        goal: goal ? parseFloat(goal) : null,
        date: new Date().toLocaleDateString(),
      };
      setLog([...log, newEntry]);
      setWeight("");
      setGoal("");
    }
  };

  const latest = log.length > 0 ? log[log.length - 1] : null;

  return (
    <div className="p-6 bg-gradient-to-b from-green-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center">📈 Progress Tracker</h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 md:flex-row">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Goal (kg)"
          className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <button className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 transition text-white px-6 py-3 rounded-lg font-semibold">
          Log
        </button>
      </form>

      <div className="mt-6 bg-gray-100 rounded-lg p-4 text-gray-900 shadow">
        <h3 className="text-lg font-semibold flex items-center">📋 History</h3>
        {log.length === 0 ? (
          <p className="mt-2">No entries yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {log.map((l, i) => (
              <li key={i} className="border p-2 rounded">
                {l.date} — Weight: {l.weight} kg {l.goal && `(Goal: ${l.goal} kg)`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {latest && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100 text-gray-900 shadow">
          <h3 className="font-bold flex items-center">🎯 Current Status</h3>
          <p>Latest Weight: {latest.weight} kg</p>
          {latest.goal && <p>Goal: {latest.goal} kg</p>}
        </div>
      )}
    </div>
  );
}

export default ProgressPage;
