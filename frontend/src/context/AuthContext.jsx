import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../utils/api";

// PERSISTENT LOGIN
//
// This is NOT a second authentication system. It is a thin React wrapper
// around the JWT flow the project already had: the token still lives in
// localStorage under "token", api.js still attaches it to every request,
// and the backend still issues it from /auth/login.
//
// What this adds is session *restoration*: on a page refresh the token is
// read back and verified once against /auth/profile, so the user stays
// logged in while moving between the home page, the scanner, a heritage
// page and their badge. They are only logged out when they press logout
// or when the token itself has actually expired.

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

const readCachedUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  // Seed from the cached user so a refresh doesn't flash a logged-out UI
  // for a moment before the profile request comes back.
  const [user, setUser] = useState(readCachedUser);

  // "Still working out whether this person is logged in." Protected routes
  // wait for this rather than bouncing people to /login on every refresh.
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Pulls the authoritative user record from the backend.
  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setUser(null);
      return null;
    }

    try {
      const response = await api.get("/auth/profile");
      const freshUser = response.data.user;

      setUser(freshUser);
      localStorage.setItem(USER_KEY, JSON.stringify(freshUser));

      return freshUser;
    } catch (error) {
      // Only a genuine auth failure ends the session. A network blip or a
      // backend hiccup must not throw the user out.
      if (error.response?.status === 401) {
        logout();
      }
      return null;
    }
  }, [logout]);

  // Runs once on mount — this is what survives a page refresh.
  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      if (!localStorage.getItem(TOKEN_KEY)) {
        if (!cancelled) setLoading(false);
        return;
      }

      await refreshUser();

      if (!cancelled) setLoading(false);
    };

    restore();

    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  // Called by the login page after /auth/login succeeds.
  const login = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);

    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }

    setToken(newToken);
    setUser(newUser || null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout,
    refreshUser,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
