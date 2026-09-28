import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collectHeritage } from "../services/badgeService";

// The single bridge between FEATURE 1 and FEATURE 2.
//
// Given a heritage place that is already open on screen, this quietly tells
// the badge API that the logged-in explorer has now seen it. The server is
// idempotent, so a second or third visit changes nothing.
//
// The heritage content never waits on this and never breaks if it fails —
// reading about a temple does not depend on the badge system being up.
//
// Returns { collecting, alreadyCollected, justCollected, badge }.
export const useHeritageCollection = (heritageId) => {
  const { isAuthenticated } = useAuth();

  const [collecting, setCollecting] = useState(false);
  const [alreadyCollected, setAlreadyCollected] = useState(false);
  const [justCollected, setJustCollected] = useState(false);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Anonymous visitors can read everything; they just have nothing to
    // collect it into yet.
    if (!heritageId || !isAuthenticated) return;

    const record = async () => {
      setCollecting(true);

      try {
        const result = await collectHeritage(heritageId);

        if (cancelled) return;

        setAlreadyCollected(Boolean(result.alreadyCollected));
        setJustCollected(!result.alreadyCollected);
        setBadge(result.badge || null);
      } catch {
        // Silent on purpose: a failed collection must never block or
        // disrupt the heritage content the visitor came for.
      } finally {
        if (!cancelled) setCollecting(false);
      }
    };

    record();

    return () => {
      cancelled = true;
    };
  }, [heritageId, isAuthenticated]);

  return { collecting, alreadyCollected, justCollected, badge };
};

export default useHeritageCollection;
