"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Dummy credentials for demonstration
const DUMMY_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Simulate API call delay
    setTimeout(() => {
      if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        
        // Try this alternative navigation approach
        window.location.href = '/dashborad';
        // Instead of: router.push('/dashboard');
      } else {
        // Failed login
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f2] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg ">
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
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Username"
                    className="flex-1 bg-transparent outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="bg-[#f3f0ff] rounded-lg">
                <div className="flex items-center px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
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
              
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-[#2c2c34] text-white py-3 rounded-lg font-medium transition duration-300 hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
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
              "When you set an object to fixed, Figma will move it above the other
              layers in the frame and label them as Fixed in the Layer's section of the
              left navigation panel. It's not possible to position scrolling objects above
              fixed layers"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}