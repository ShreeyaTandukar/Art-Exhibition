import React from "react";
import { Award, ArrowRight, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">

        {/* Badge */}

        <div className="mx-auto w-28 h-28 rounded-full bg-[#FFF5D8] flex items-center justify-center shadow-lg">

          <Award
            size={60}
            className="text-[#D6A94F]"
          />

        </div>

        {/* Heading */}

        <h1 className="mt-8 text-4xl font-bold text-[#4B2E2A]">

          Congratulations!

        </h1>

        {/* Description */}

        <p className="mt-5 text-[#6B5A48] leading-8">

          You've successfully completed the

          <span className="font-semibold">
            {" "}Bagh Bhairav Heritage Journey.
          </span>

          <br /><br />

          Your Heritage Badge is ready.

          Create a Heritage Passport to permanently
          save your badge and continue discovering
          Nepal's cultural heritage.

        </p>

        {/* Register */}

        <button
          onClick={() => navigate("/register")}
          className="mt-10 w-full bg-[#7B1E23] hover:bg-[#65161B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105"
        >

          <Award size={20} />

          Create Heritage Passport

        </button>

        {/* Divider */}

        <div className="flex items-center my-8">

          <div className="flex-1 border-t border-gray-300"></div>

          <span className="mx-4 text-gray-400 text-sm">

            OR

          </span>

          <div className="flex-1 border-t border-gray-300"></div>

        </div>

        {/* Login */}

        <button
          onClick={() => navigate("/login")}
          className="w-full border-2 border-[#D6A94F] hover:bg-[#FFF5D8] text-[#7B1E23] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition"
        >

          <UserRound size={20} />

          Continue Journey

          <ArrowRight size={18} />

        </button>

        {/* Bottom */}

        <p className="mt-8 text-sm text-[#8B7355]">

          Your achievements will be securely stored
          inside your Heritage Passport.

        </p>

      </div>

    </div>
  );
};

export default AuthLanding;