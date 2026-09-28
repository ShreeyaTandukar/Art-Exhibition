import React from "react";
import { useParams, Navigate } from "react-router-dom";

// The old "/site/:slug" teaser page (Home.jsx) showed a locked preview
// that required an activation code to unlock. That flow is no longer
// wanted — every link, including old QR codes or bookmarks pointing at
// /site/:slug, should land straight on the unlocked premium experience.
// Home.jsx itself is left untouched (not deleted), this route just no
// longer sends visitors there.
const SiteRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/premium/${slug}`} replace />;
};

export default SiteRedirect;
