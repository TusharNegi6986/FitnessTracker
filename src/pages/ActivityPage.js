import React, { useState, useEffect } from "react";

function ActivityPage() {
  const defaultActivity = {
    steps: "",
    workout: "",
    caloriesBurned: "",
    date: new Date().toLocaleDateString(),
  };

  const [activity, setActivity] = useState(() => {
    try {
      const saved = localStorage.getItem("activity");
      return saved ? JSON.parse(saved) : defaultActivity;
    } catch {
      return defaultActivity;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("activityHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(activity));
  }, [activity]);

  useEffect(() => {
    localStorage.setItem("activityHistory", JSON.stringify(history));
  }, [history]);

  // Handle input changes
  const handleChange = (field, value) => {
    setActivity((prev) => ({ ...prev, [field]: value }));
  };

  // Log activity into history
  const handleLog = () => {
    const entry = { ...activity, date: new Date().toLocaleDateString() };
    setHistory((prev) => [...prev, entry]);
    setActivity(defaultActivity);
  };

  // Clear all data
  const handleClear = () => {
    setActivity(defaultActivity);
    setHistory([]);
    localStorage.removeItem("activity");
    localStorage.removeItem("activityHistory");
  };

  // Estimate calories from steps (approx 0.04 kcal per step)
  const estimatedCalories = activity.steps ? Math.round(activity.steps * 0.04) : 0;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center">🏃 Activity Tracker</h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Steps Walked"
          value={activity.steps}
          onChange={(e) => handleChange("steps", e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Workout Done"
          value={activity.workout}
          onChange={(e) => handleChange("workout", e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <input
          type="number"
          placeholder="Calories Burned (Optional)"
          value={activity.caloriesBurned}
          onChange={(e) => handleChange("caloriesBurned", e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <p className="text-gray-300">
          Estimated calories from steps: {estimatedCalories} kcal
        </p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleLog}
          className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-semibold"
        >
          Log Activity
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-lg font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="mt-6 bg-gray-100 text-gray-900 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center">📌 Today's Activity</h3>
        <p>Steps: {activity.steps || 0}</p>
        <p>Workout: {activity.workout || "None"}</p>
        <p>
          Calories Burned: {activity.caloriesBurned || 0} kcal{" "}
          {activity.steps && `(+${estimatedCalories} kcal estimated from steps)`}
        </p>
      </div>

      <div className="mt-6 bg-gray-100 text-gray-900 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center">📋 Activity History</h3>
        {history.length === 0 ? (
          <p className="mt-2">No activity logged yet.</p>
        ) : (
          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {history.map((entry, index) => (
              <li key={index} className="border p-2 rounded">
                {entry.date} — Steps: {entry.steps || 0}, Workout: {entry.workout || "None"}, Calories:{" "}
                {entry.caloriesBurned || 0} kcal
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ActivityPage;
