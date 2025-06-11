"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import config from "@/config";
import { useLoader } from "@/app/context/LoaderContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setLoading(true);

    try {
      const res = await axios.post(`${config.API_BASE_URL}/user/login`, {
        email,
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("institute_name", res.data.user.institute_name);
        localStorage.setItem("institute_address", res.data.user.institute_address);
        localStorage.setItem("user_id", res.data.user.id);
        window.location.href = "/dashboard";
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Login failed:", error);
      const message = error.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message); // ✅ Show toast error
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f2] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Login Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Login</h1>
              <p className="text-gray-600">Login to the Dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#f3f0ff] rounded-lg">
                <div className="flex items-center px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 bg-transparent outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bg-[#f3f0ff] rounded-lg">
                <div className="flex items-center px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    className="flex-1 bg-transparent outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <button
                type="submit"
                className="w-full bg-[#2c2c34] text-white py-3 rounded-lg font-medium transition duration-300 hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </form>
          </div>

          {/* Right side - Logo and Info */}
          <div className="w-full md:w-1/2 bg-[#2c2c34] text-white p-8 flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg p-6 mb-8 w-64">
              <Image
                src="/assets/images/logo.png"
                alt="United Kingdom College of Advanced Studies"
                width={150}
                height={150}
                className="mx-auto"
              />
            </div>
            <p className="text-sm text-gray-300 max-w-sm">
              &quot;Transform your life through knowledge and skills. Raise your standards by acquiring internationally verifiable credentials from the UK.&quot;
            </p>
          </div>
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
