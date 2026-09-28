import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  UserCircle2,
  Award,
  MapPinned,
  Lock,
  QrCode,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import PremiumFooter from "./PremiumFooter";
import { useAuth } from "../../context/AuthContext";
import { fetchMyBadge } from "../../services/badgeService";
import { fetchAllHeritage } from "../../services/heritageService";

import badgeFallbackImage from "/images/badge.jpg";

const HeritagePassport = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const [profileImage, setProfileImage] = useState(null);
  const [badge, setBadge] = useState(null);
  const [sites, setSites] = useState([]);
  const [loadingBadge, setLoadingBadge] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [saving, setSaving] = useState(false);

  const loadBadge = useCallback(async () => {
    setLoadingBadge(true);
    setLoadError("");

    try {
      const [badgeData, allSites] = await Promise.all([
        fetchMyBadge(),
        fetchAllHeritage(),
      ]);

      setBadge(badgeData);
      setSites(allSites);
    } catch (error) {
      setLoadError(
        error.response?.data?.message ||
          "We couldn't load your profile right now."
      );
    } finally {
      setLoadingBadge(false);
    }
  }, []);

  useEffect(() => {
    loadBadge();
  }, [loadBadge]);

  const startEditing = () => {
    setEditedName(user?.name || "");
    setEditing(true);
  };

  const handleSaveName = async () => {
    const trimmedName = editedName.trim();

    if (trimmedName === "") {
      alert("Name cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const response = await api.put("/auth/profile", {
        name: trimmedName,
      });

      setUser(response.data.user);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setEditing(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Could not update your name."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const collectedCount = badge?.collectedCount ?? 0;
  const totalCount = badge?.totalCount ?? 0;
  const percentage = badge?.percentage ?? 0;
  const collectedHeritage = badge?.collectedHeritage || [];

  const collectedIds = new Set(
    collectedHeritage.map((item) => String(item._id))
  );

  const remainingSites = sites.filter(
    (site) => !collectedIds.has(String(site._id))
  );

  return (
    <div className="min-h-screen bg-[#EFE8DE]">
      <div className="bg-[#4B2E2A] rounded-b-3xl px-8 py-6 text-white">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-[#D6A94F]"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#D6A94F]"
              />
            ) : (
              <UserCircle2
                size={95}
                className="text-[#D6A94F]"
              />
            )}

            <label className="absolute bottom-0 right-0 bg-[#D6A94F] p-2 rounded-full cursor-pointer">
              📷

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setProfileImage(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />
            </label>
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Explorer Profile
          </h1>

          {editing ? (
            <div className="mt-4 flex flex-col items-center gap-3">
              <input
                value={editedName}
                onChange={(e) =>
                  setEditedName(e.target.value)
                }
                disabled={saving}
                className="bg-white text-black rounded-xl px-4 py-2 text-center outline-none disabled:opacity-60"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSaveName}
                  disabled={saving}
                  className="bg-[#D6A94F] text-[#4B2E2A] px-5 py-2 rounded-full font-semibold disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  className="bg-white/20 text-white px-5 py-2 rounded-full font-semibold disabled:opacity-70"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-[#D6A94F] text-xl font-semibold">
                {user?.name}
              </p>

              <button onClick={startEditing}>
                ✏️
              </button>
            </div>
          )}

          <p className="mt-3 text-sm text-gray-300">
            {badge?.title || "New Explorer"}
          </p>

          <p className="mt-2 text-sm text-gray-300">
            Badge No:{" "}
            <span className="font-semibold text-[#D6A94F]">
              {badge?.badgeNumber ||
                user?.badgeNumber ||
                "—"}
            </span>
          </p>

          <div className="w-full mt-6">
            <div className="flex items-center justify-between gap-3 text-xs text-[#E8DCC8] mb-2">
              <span className="font-medium">
                Explorer Progress
              </span>

              <span className="font-medium">
                {loadingBadge
                  ? "Loading..."
                  : `${collectedCount} / ${totalCount} Places Explored`}
              </span>
            </div>

            <div className="w-full bg-[#8B6C67] rounded-full h-3">
              <div
                className="bg-[#D6A94F] h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            {!loadingBadge && totalCount > 0 && (
              <p className="mt-2 text-xs text-[#E8DCC8]">
                {badge?.remainingCount} still to discover ·{" "}
                {percentage}% complete
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/scan")}
            className="mt-6 w-full bg-[#D6A94F] text-[#4B2E2A] font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:brightness-105 transition"
          >
            <QrCode size={20} />
            Scan More QR
          </button>
        </div>
      </div>

      <div className="px-5 py-2 space-y-5">
        {loadError && (
          <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
            <p className="text-[#7B1E23] font-semibold">
              {loadError}
            </p>

            <button
              onClick={loadBadge}
              className="mt-4 bg-[#7B1E23] text-white px-6 py-2 rounded-full font-semibold"
            >
              Try again
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-5">
          <h2 className="text-xl font-bold text-[#4B2E2A]">
            Explorer Stats
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <Award
                className="mx-auto text-[#D6A94F]"
                size={30}
              />

              <h3 className="text-2xl font-bold mt-2">
                {collectedCount}
              </h3>

              <p className="text-sm text-gray-500">
                Badges
              </p>
            </div>

            <div>
              <MapPinned
                className="mx-auto text-[#D6A94F]"
                size={30}
              />

              <h3 className="text-2xl font-bold mt-2">
                {totalCount}
              </h3>

              <p className="text-sm text-gray-500">
                Places
              </p>
            </div>

            <div>
              <Lock
                className="mx-auto text-[#D6A94F]"
                size={30}
              />

              <h3 className="text-2xl font-bold mt-2">
                {badge?.remainingCount ?? 0}
              </h3>

              <p className="text-sm text-gray-500">
                Remaining
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-5">
          <h2 className="text-xl font-bold text-[#4B2E2A] mb-5">
            My Collection
          </h2>

          {loadingBadge && (
            <p className="text-sm text-gray-400">
              Loading your collection...
            </p>
          )}

          {!loadingBadge && collectedCount === 0 && (
            <p className="text-sm text-gray-400">
              Nothing collected yet — scan your first QR code
              to begin.
            </p>
          )}

          {!loadingBadge &&
            collectedHeritage.map((site, index) => (
              <button
                key={site._id}
                onClick={() =>
                  navigate(`/premium/${site.slug}`)
                }
                className={`w-full text-left flex items-center gap-4 rounded-2xl p-4 bg-gradient-to-r from-[#FFF8E8] to-[#FFF3D5] border border-[#EED7A0] hover:brightness-[0.98] transition ${
                  index > 0 ? "mt-4" : ""
                }`}
              >
                <img
                  src={
                    site.badge?.image ||
                    badgeFallbackImage
                  }
                  alt={
                    site.badge?.title ||
                    site.name
                  }
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <h3 className="font-bold text-[#4B2E2A]">
                    ✓{" "}
                    {site.badge?.title ||
                      site.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {site.locationLabel || "Nepal"}
                  </p>
                </div>
              </button>
            ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-5">
          <h2 className="text-xl font-bold text-[#4B2E2A] mb-5">
            Still to Explore
          </h2>

          {!loadingBadge &&
          remainingSites.length === 0 ? (
            <p className="text-sm text-gray-400">
              Every available place has been explored.
              New ones will appear here automatically.
            </p>
          ) : (
            remainingSites.map((site, index) => (
              <div
                key={site._id}
                className={`flex items-center gap-4 rounded-2xl p-4 bg-[#F8F8F8] border border-gray-200 ${
                  index > 0 ? "mt-4" : ""
                }`}
              >
                <Lock className="text-gray-400" />

                <div>
                  <h3 className="font-bold text-gray-500">
                    {site.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {site.locationLabel || "Nepal"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-[#7B1E23] rounded-3xl p-5 text-white mb-8">
          <h2 className="text-2xl font-bold">
            Next Destination
          </h2>

         <p className="mt-3 leading-7 text-white/90">
          Keep exploring and discover something new.
        </p>

          <button
            onClick={() => navigate("/scan")}
            className="mt-6 bg-[#D6A94F] text-[#4B2E2A] font-semibold px-6 py-3 rounded-full hover:scale-105 transition flex items-center gap-2"
          >
            <QrCode size={18} />
            Scan More QR
          </button>
        </div>
      </div>

      <PremiumFooter />
    </div>
  );
};

export default HeritagePassport;