import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden">

      {/* Shared Background for both sides */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* LEFT SIDE - Logo */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center border-r border-white/20">
        <div className="text-center">
          <img
            src={assets.logo_big}
            alt="Logo"
            className="w-[220px] md:w-[280px] mx-auto drop-shadow-2xl"
          />
          <br />
          {/* <h1 className="text-white text-3xl md:text-4xl font-semibold mt-6 drop-shadow-lg">
            Welcome to Smart Home Portal
          </h1> */}
          {/* <p className="text-gray-200 mt-2 text-sm md:text-base">
            Control. Connect. Automate — All in one place.
          </p> */}
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center">
        <form 
          onSubmit={onSubmitHandler} 
          className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 flex flex-col gap-6 text-white"
        >
          <h2 className="text-3xl font-semibold flex justify-between items-center">
            {currState}
            {isDataSubmitted && (
              <img 
                onClick={() => setIsDataSubmitted(false)} 
                src={assets.arrow_icon} 
                alt="Back" 
                className="w-5 cursor-pointer"
              />
            )}
          </h2>

          {/* Full Name */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input 
              onChange={(e) => setFullName(e.target.value)} 
              value={fullName}
              type="text" 
              placeholder="Full Name"
              required
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}

          {/* Email + Password */}
          {!isDataSubmitted && (
            <>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                type="email" 
                placeholder="Email Address"
                required
                className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                type="password" 
                placeholder="Password"
                required
                className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </>
          )}

          {/* Bio */}
          {currState === "Sign up" && isDataSubmitted && (
            <textarea 
              onChange={(e) => setBio(e.target.value)} 
              value={bio} 
              rows={4} 
              placeholder="Provide a short bio..."
              required
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}

          {/* Button */}
          <button 
            type="submit" 
            className="py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-medium text-white hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          {/* Switch Sign up/Login */}
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <span 
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }} 
                className="text-indigo-300 font-medium cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              Create an account{" "}
              <span 
                onClick={() => setCurrState("Sign up")} 
                className="text-indigo-300 font-medium cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
