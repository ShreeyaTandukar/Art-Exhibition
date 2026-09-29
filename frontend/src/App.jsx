import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PremiumDiscover from "./pages/PremiumDiscover";
import PremiumStory from "./pages/PremiumStory";
import SiteRedirect from "./pages/SiteRedirect";
import HeritagePassport from "./components/premium/HeritagePassport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLanding from "./pages/AuthLanding";
import ScanQR from "./pages/ScanQR";
import ProtectedRoute from "./components/ProtectedRoute";
import HeritageHome from "./pages/HeritageHome";
import ArtworkQRCodes from "./pages/ArtworkQRCodes";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#EFE8DE] min-h-dvh">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-[#F8F4EE] min-h-screen shadow-xl flex flex-col">
          <div className="flex-1 flex flex-col">
            <Routes>

              {/* Homepage / catalogue of ALL heritage arts */}
              <Route path="/" element={<HeritageHome />} />

              <Route path="/explore" element={<HeritageHome />} />

              {/* Old "/site/:slug" links redirect into the premium experience */}
              <Route path="/site/:slug" element={<SiteRedirect />} />

              {/* Premium Heritage Detail Pages */}
              <Route path="/premium/:slug" element={<PremiumDiscover />} />

              <Route
                path="/premium/:slug/story"
                element={<PremiumStory />}
              />

              {/* FEATURE 1 — Scan More QR */}
              <Route
                path="/scan"
                element={
                  <ProtectedRoute>
                    <ScanQR />
                  </ProtectedRoute>
                }
              />

              {/* FEATURE 2 — Individual Artwork QR Codes */}
              <Route
                path="/artwork-qrcodes"
                element={<ArtworkQRCodes />}
              />

              {/* FEATURE 2 — persistent badge / passport */}
              <Route
                path="/passport"
                element={
                  <ProtectedRoute>
                    <HeritagePassport />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/badge"
                element={
                  <ProtectedRoute>
                    <HeritagePassport />
                  </ProtectedRoute>
                }
              />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/auth" element={<AuthLanding />} />

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;