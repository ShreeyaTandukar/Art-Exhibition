import React from "react";

import { Award, Gift, Trophy } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const PremiumBadge = ({ site, groupType }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  // Get the group type without assuming HeritageLink
  const currentGroup =
    groupType ||
    site?.groupType ||
    site?.group ||
    site?.type ||
    "";

  const normalizedGroup = currentGroup.toLowerCase().trim();

  const isMoneyMaze =
    normalizedGroup.includes("moneymaze") ||
    normalizedGroup.includes("money maze");

  // -----------------------------------------
  // TEXT BASED ON GROUP
  // -----------------------------------------

  const journeyText = isMoneyMaze
    ? "You have completed the MoneyMaze Challenge of"
    : "You have completed the journey of";

  const descriptionText = isMoneyMaze
    ? "Keep exploring MoneyMaze challenges and building your achievements."
    : "Your achievement has been successfully recorded. Keep exploring and discovering more.";

  const buttonText = isMoneyMaze
    ? isAuthenticated
      ? "View My Achievement"
      : "Save Achievement"
    : isAuthenticated
    ? "View My Achievement"
    : "Save Achievement";

  const bottomMessage = isMoneyMaze
    ? isAuthenticated
      ? "This challenge has been saved to your MoneyMaze Club achievements."
      : "Your achievement will be securely stored after signing in."
    : isAuthenticated
    ? "Your achievement has been saved to your profile."
    : "Your achievement will be securely stored after signing in.";

  return (
    <section className="bg-[#F8F4EE] px-6 py-16">
      <div className="text-center">

        {/* Achievement Icon */}
        <div className="mx-auto w-28 h-28 rounded-full bg-[#FFF5D8] flex items-center justify-center shadow-lg">
          {isMoneyMaze ? (
            <Trophy
              size={60}
              className="text-[#D6A94F]"
            />
          ) : (
            <Award
              size={60}
              className="text-[#D6A94F]"
            />
          )}
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-4xl font-bold text-[#4B2E2A]">
          Congratulations!
        </h2>

        {/* Description */}
        <p className="mt-4 text-[#6B5A48] leading-8 max-w-xl mx-auto">
          {journeyText}

          <span className="font-semibold">
            {" "}
            {site?.name ||
              (isMoneyMaze
                ? "this challenge"
                : "this activity")}
          </span>
          .

          <br />
          <br />

          {descriptionText}
        </p>

        {/* Button */}
        <button
          onClick={() =>
            navigate(
              isAuthenticated
                ? isMoneyMaze
                  ? "/achievements"
                  : "/achievements"
                : "/login"
            )
          }
          className="mt-10 bg-[#7B1E23] hover:bg-[#65161B] text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto transition duration-300 hover:scale-105 shadow-lg"
        >
          {isMoneyMaze ? (
            <Trophy size={22} />
          ) : (
            <Gift size={22} />
          )}

          {buttonText}
        </button>

        {/* Small Note */}
        <p className="mt-5 text-sm text-[#8B7355]">
          {bottomMessage}
        </p>

      </div>
    </section>
  );
};

export default PremiumBadge;