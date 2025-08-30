import React, { useState } from "react";

function LoginPage({ setShowRegister, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-6 w-80">
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
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-3 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setShowRegister(true)}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default LoginPage;
