import React, { useEffect, useState } from "react";

/**
 * ProfilePage
 * - stores profile in localStorage under key "ft_profile"
 * - provides Save and Edit functionality
 * - does not require any external libs (react-icons etc.)
 */
export default function ProfilePage() {
  const STORAGE_KEY = "ft_profile";

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  // savedProfile mirrors what's persisted — used for display & edit
  const [savedProfile, setSavedProfile] = useState(null);
  const [message, setMessage] = useState("");

  // load saved profile on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSavedProfile(parsed);
        setProfile(parsed); // optionally populate inputs with saved data
      }
    } catch (err) {
      console.error("Error reading profile from localStorage:", err);
    }
  }, []);

  // update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // Save validated profile to localStorage
  const handleSave = () => {
    // basic validation
    if (!profile.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }
    const normalized = {
      name: profile.name.trim(),
      age: profile.age === "" ? "" : String(profile.age),
      height: profile.height === "" ? "" : String(profile.height),
      weight: profile.weight === "" ? "" : String(profile.weight),
      gender: profile.gender || "",
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      setSavedProfile(normalized);
      setMessage("Profile saved.");
      // clear message after 2s
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setMessage("Failed to save profile (check console).");
    }
  };

  // Load saved profile into the form for editing
  const handleEdit = () => {
    if (savedProfile) {
      setProfile(savedProfile);
      setMessage("Editing saved profile.");
      setTimeout(() => setMessage(""), 1500);
    } else {
      setMessage("No saved profile to edit.");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  // Remove saved profile
  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedProfile(null);
    setProfile({ name: "", age: "", height: "", weight: "", gender: "" });
    setMessage("Profile cleared.");
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">P</div>
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Age</label>
            <input
              name="age"
              type="number"
              value={profile.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              min="0"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Height (cm)</label>
            <input
              name="height"
              type="number"
              value={profile.height}
              onChange={handleChange}
              placeholder="e.g. 175"
              min="0"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              value={profile.weight}
              onChange={handleChange}
              placeholder="e.g. 72"
              min="0"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Gender */}
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-300 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Buttons & message */}
        <div className="flex flex-wrap gap-3 items-center mt-5">
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
          >
            Save Profile
          </button>

          <button
            onClick={handleEdit}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            Edit Saved
          </button>

          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg ml-auto"
          >
            Clear
          </button>

          {message && (
            <div className="w-full mt-3 text-sm text-green-300">
              {message}
            </div>
          )}
        </div>

        {/* Saved profile card */}
        <div className="mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">📌 Saved Profile</h3>

            {savedProfile ? (
              <div className="text-gray-100 space-y-1">
                <p><span className="text-gray-300">Name:</span> {savedProfile.name || "—"}</p>
                <p><span className="text-gray-300">Age:</span> {savedProfile.age || "—"}</p>
                <p><span className="text-gray-300">Height:</span> {savedProfile.height ? `${savedProfile.height} cm` : "—"}</p>
                <p><span className="text-gray-300">Weight:</span> {savedProfile.weight ? `${savedProfile.weight} kg` : "—"}</p>
                <p><span className="text-gray-300">Gender:</span> {savedProfile.gender || "—"}</p>
              </div>
            ) : (
              <p className="text-gray-400">No saved profile yet. Use the form above and press Save Profile.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
