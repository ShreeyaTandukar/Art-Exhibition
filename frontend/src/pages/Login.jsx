import React, { useState } from "react";

import {
  Mail,
  Lock,
  ArrowRight,
  ScrollText,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import UnlockLoader from "../components/premium/UnlockLoader";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // If a protected page sent them here, go back there after logging in.
  const redirectTo = location.state?.from?.pathname || "/passport";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Hand the token and user to the auth context.
      login(response.data.token, response.data.user);

      // If the user unlocked something earlier, claim it after login.
      const pendingCode = localStorage.getItem("activationCode");

      if (pendingCode) {
        try {
          const claimResponse = await api.post(
            "/activation/claim",
            { code: pendingCode },
            {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            }
          );

          if (claimResponse.data.alreadyOwned) {
            alert(claimResponse.data.message);
          }
        } catch (claimError) {
          alert(
            claimError.response?.data?.message ||
              "Login successful, but the account benefit could not be claimed."
          );
        } finally {
          localStorage.removeItem("activationCode");
          localStorage.removeItem("activationSite");
        }
      }

      // Show the branded loading screen.
      setShowLoader(true);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  if (showLoader) {
    return (
      <UnlockLoader
        messages={[
          "Verifying Credentials",
          "Authenticating User",
          "Syncing Your Profile",
          "Loading MBA-Pulse",
        ]}
        subtitle="Welcome Back"
        loadingCaption="Preparing your MBA-Pulse experience..."
        finishedTitle="Login Successful"
        finishedMessage="Your MBA-Pulse account is ready. Continue exploring your personalized experience."
        finishedTag="Access Granted"
        onComplete={() => navigate(redirectTo, { replace: true })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE8DE] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md bg-[#F8F4EE] rounded-[35px] shadow-2xl overflow-hidden border border-[#E7DCC7]">

        {/* MBA-Pulse Header */}
        <div className="bg-[#7B1E23] px-8 py-10 text-center text-white">

          {/* Clickable MBA-Pulse Logo */}
          <div className="relative group inline-block">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer focus:outline-none"
              aria-label="Return to artwork list"
            >
              <img
                src="/images/logos/mba-pulse.png"
                alt="MBA-Pulse"
                className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-[#D6A94F] transition duration-300 group-hover:scale-105"
              />
            </button>

            {/* Hover Hint */}
            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                top-full
                mt-3
                opacity-0
                group-hover:opacity-100
                pointer-events-none
                transition-all
                duration-300
                whitespace-nowrap
                z-20
              "
            >
              <div className="bg-white text-[#7B1E23] text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
                Click the logo to return to the artwork list
              </div>
            </div>
          </div>

          <p className="mt-4 tracking-[5px] uppercase text-sm text-[#F5E6B8]">
            MBA-Pulse
          </p>

          <h1 className="text-3xl font-bold tracking-[4px] mt-2">
            MBA
          </h1>

          <h1 className="text-3xl font-bold tracking-[4px]">
            PULSE
          </h1>

          <div className="w-20 h-[2px] bg-[#D6A94F] mx-auto my-5"></div>

          <p className="italic text-[#F5E6B8] leading-7">
            Connect
            <br />
            Learn. Grow. Lead.
          </p>
        </div>

        {/* Login Form */}
        <div className="px-8 py-8">

          {/* Title */}
          <div className="flex items-center gap-2 justify-center text-[#7B1E23]">
            <ScrollText size={20} />

            <h2 className="text-2xl font-bold">
              Art Collection Login
            </h2>
          </div>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-6"
          >

            {/* Email */}
            <div>
              <label className="text-[#4B2E2A] font-semibold">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D6A94F]"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#D6A94F]
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    focus:ring-2
                    focus:ring-[#D6A94F]
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[#4B2E2A] font-semibold">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D6A94F]"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#D6A94F]
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    focus:ring-2
                    focus:ring-[#D6A94F]
                  "
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                bg-[#7B1E23]
                hover:bg-[#64161B]
                text-white
                py-3
                rounded-2xl
                font-bold
                flex
                justify-center
                items-center
                gap-2
                transition
                duration-300
              "
            >
              Continue
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-[#D6A94F]"></div>

            <span className="mx-4 text-[#7B1E23] text-sm">
              NEW USER
            </span>

            <div className="flex-1 border-t border-[#D6A94F]"></div>
          </div>

          {/* Register */}
          <Link to="/register">
            <button
              type="button"
              className="
                w-full
                border-2
                border-[#D6A94F]
                rounded-2xl
                py-3
                text-[#7B1E23]
                font-bold
                hover:bg-[#FFF5D8]
                transition
              "
            >
              Join the Art Collection
            </button>
          </Link>

          {/* Footer */}
          <div className="mt-10 text-center text-[#8B7355] text-sm">

            <p className="uppercase tracking-[3px]">
              Member ID
            </p>

            <p className="font-bold text-[#4B2E2A] mt-1">
              MBA-PULSE
            </p>

            <div className="w-16 h-[1px] bg-[#D6A94F] mx-auto my-4"></div>

            <p>
              Powered by
            </p>

            <p className="font-semibold">
              MBA-Pulse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;