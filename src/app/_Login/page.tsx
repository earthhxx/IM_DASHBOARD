"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (can be extended)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Mock login (replace with actual authentication logic)
    const success = email === "test@example.com" && password === "password123";
    
    if (success) {
      router.push("/dashboard"); // Redirect to a dashboard or main page
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sky-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-200 backdrop-blur-none shadow-sm rounded-lg">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email :</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password :</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm text-black">Remember me</label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
