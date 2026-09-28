import React, { useState } from "react";

import {
  User,
  Mail,
  Lock,
  ScrollText,
  ArrowRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE8DE] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md bg-[#F8F4EE] rounded-[35px] shadow-2xl overflow-hidden border border-[#E7DCC7]">

        {/* Header */}
        <div className="bg-[#7B1E23] px-8 py-10 text-center text-white">

          {/* Circular MBA-Pulse Logo */}
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
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-20">
              <div className="bg-white text-[#7B1E23] text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
                Click the logo to return to the artwork list
              </div>
            </div>
          </div>

          <p className="mt-5 tracking-[5px] uppercase text-sm text-[#F5E6B8]">
            MBA-Pulse
          </p>

          <h1 className="text-3xl font-bold tracking-[4px] mt-2">
            ART
          </h1>

          <h1 className="text-3xl font-bold tracking-[4px]">
            COLLECTION
          </h1>

          <div className="w-20 h-[2px] bg-[#D6A94F] mx-auto my-5"></div>

          <p className="italic text-[#F5E6B8]">
            Explore • Connect • Discover
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">

          <div className="flex items-center justify-center gap-2 text-[#7B1E23]">
            <ScrollText size={22} />

            <h2 className="text-2xl font-bold">
              Join the Art Collection
            </h2>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5 mt-8"
          >
            <Input
              icon={<User size={18} />}
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              icon={<Mail size={18} />}
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              icon={<Lock size={18} />}
              label="Create Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Input
              icon={<Lock size={18} />}
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-[#7B1E23] hover:bg-[#65161B] text-white py-3 rounded-2xl font-bold flex justify-center items-center gap-2 transition"
            >
              Join the Collection
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Login Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-[#D6A94F]" />

            <span className="mx-4 text-sm text-[#7B1E23] text-center">
              ALREADY A MEMBER?
            </span>

            <div className="flex-1 border-t border-[#D6A94F]" />
          </div>

          <Link to="/login">
            <button
              type="button"
              className="w-full border-2 border-[#D6A94F] py-3 rounded-2xl text-[#7B1E23] font-bold hover:bg-[#FFF5D8] transition"
            >
              Continue Exploring
            </button>
          </Link>

          {/* Footer */}
          <div className="text-center mt-10 text-sm text-[#8B7355]">

            <p className="uppercase tracking-[3px]">
              Collection Member
            </p>

            <p className="mt-1">
              Your art collection journey begins here
            </p>

            <div className="w-16 h-[1px] bg-[#D6A94F] mx-auto my-4"></div>

            <p>Presented by</p>

            <p className="font-semibold">
              MBA-Pulse
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  icon,
  label,
  type = "text",
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="font-semibold text-[#4B2E2A]">
      {label}
    </label>

    <div className="relative mt-2">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D6A94F]">
        {icon}
      </div>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#D6A94F] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#D6A94F]"
      />
    </div>
  </div>
);

export default Register;