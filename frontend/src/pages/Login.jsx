import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null)
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login',
        {email, password}
        );
        if(response.data.success){
            login(response.data.user)
            console.log(response.data.user)
            localStorage.setItem("token", response.data.token)
            if (response.data.user.role==='admin'){
                navigate('/admin-dashboard')
            }
            else{
                navigate('/employee-dashboard')
            }
        }
    } catch (error) 
    {
        if(error.response && !error.response.data.success){
            setError(error.response.data.error)
        } else{
            setError("Server Error")
        }
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
        {error && <p className='text-red-500'>{error}</p>}
      <h1 className="text-5xl font-extrabold text-white mb-10 tracking-wide text-center">
        Employee Management System
      </h1>
      <div className="bg-gradient-to-r from-white via-gray-100 to-gray-50 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-red-700 text-center mb-6">
            Login
          </h3>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition duration-200 ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition duration-200 ease-in-out"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                Remember Me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-purple-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
