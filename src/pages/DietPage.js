import React, { useState, useEffect } from "react";

function DietPage() {
  const defaultDiet = {
    breakfast: { meal: "", calories: "", protein: "", carbs: "", fat: "" },
    lunch: { meal: "", calories: "", protein: "", carbs: "", fat: "" },
    dinner: { meal: "", calories: "", protein: "", carbs: "", fat: "" },
    snacks: { meal: "", calories: "", protein: "", carbs: "", fat: "" },
  };

  // Initialize diet safely
  const [diet, setDiet] = useState(() => {
    try {
      const saved = localStorage.getItem("diet");
      const parsed = saved ? JSON.parse(saved) : defaultDiet;
      // Make sure all keys exist
      return { ...defaultDiet, ...parsed };
    } catch {
      return defaultDiet;
    }
  });

  useEffect(() => {
    localStorage.setItem("diet", JSON.stringify(diet));
  }, [diet]);

  const handleChange = (meal, field, value) => {
    setDiet((prev) => ({
      ...prev,
      [meal]: { ...(prev[meal] || {}), [field]: value },
    }));
  };

  const handleClear = () => setDiet(defaultDiet);

  const meals = ["breakfast", "lunch", "dinner", "snacks"];
  const nutrientFields = ["calories", "protein", "carbs", "fat"];

  // Compute totals safely
  const total = meals.reduce(
    (acc, meal) => {
      const m = diet[meal] || {};
      nutrientFields.forEach((field) => {
        acc[field] += Number(m[field]) || 0;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="p-6 bg-gradient-to-b from-green-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center">🥗 Diet Tracker</h2>

      <div className="space-y-6">
        {meals.map((meal) => {
          const m = diet[meal] || defaultDiet[meal];
          return (
            <div key={meal} className="bg-gray-100 text-gray-900 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg capitalize mb-2 flex items-center">
                {meal === "breakfast"
                  ? "🍳 Breakfast"
                  : meal === "lunch"
                  ? "🥪 Lunch"
                  : meal === "dinner"
                  ? "🍲 Dinner"
                  : "🍎 Snacks"}
              </h3>
              <input
                type="text"
                placeholder="Meal description"
                value={m.meal}
                onChange={(e) => handleChange(meal, "meal", e.target.value)}
                className="w-full p-3 rounded-lg mb-2 bg-white text-gray-800 placeholder-gray-500"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {nutrientFields.map((field) => (
                  <input
                    key={field}
                    type="number"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={m[field]}
                    onChange={(e) => handleChange(meal, field, e.target.value)}
                    className="p-2 rounded-lg bg-white text-gray-800 placeholder-gray-500"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-lg font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="mt-6 bg-gray-100 text-gray-900 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center">📌 Today's Summary</h3>
        {meals.map((meal) => {
          const m = diet[meal] || defaultDiet[meal];
          return (
            <div key={meal} className="mb-2">
              <p className="font-semibold capitalize">
                {meal}: {m.meal || "Not set"}
              </p>
              <p>
                Calories: {m.calories || 0} | Protein: {m.protein || 0}g | Carbs:{" "}
                {m.carbs || 0}g | Fat: {m.fat || 0}g
              </p>
            </div>
          );
        })}

        <div className="mt-4 font-bold border-t pt-2">
          Total — Calories: {total.calories} | Protein: {total.protein}g | Carbs: {total.carbs}g | Fat:{" "}
          {total.fat}g
        </div>
      </div>
    </div>
  );
}

export default DietPage;
