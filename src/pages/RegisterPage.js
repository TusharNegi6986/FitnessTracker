import React, { useState } from "react";

function RegisterPage({ setShowRegister, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-6 w-80">
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setShowRegister(false)}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default RegisterPage;
