// Turns whatever text a QR code contains into an identifier the backend
// can resolve. Deliberately permissive — the backend is the authority on
// what is actually valid, this only strips away packaging.
//
// Handles:
//   "HL-001"
//   "hl001" / "QR-001" / "HL 1"
//   "https://heritagelink.app/scan?qr=HL-001"
//   "https://heritagelink.app/premium/bagh-bhairav"  (older QR codes)
export const extractQrId = (rawValue) => {
  if (!rawValue) return null;

  let text = String(rawValue).trim();

  if (!text) return null;

  if (/^https?:\/\//i.test(text)) {
    try {
      const url = new URL(text);
      const param =
        url.searchParams.get("qr") ||
        url.searchParams.get("qrId") ||
        url.searchParams.get("code");

      if (param) {
        text = param;
      } else {
        const segments = url.pathname.split("/").filter(Boolean);
        text = segments[segments.length - 1] || "";
      }
    } catch {
      // Not a parseable URL — fall through and use the raw text.
    }
  }

  text = text.trim();

  if (!text) return null;

  // Normalise the HeritageLink code family to a canonical "HL-001".
  const codeMatch = text.match(/^(?:HL|QR)[-_\s]?(\d{1,4})$/i);

  if (codeMatch) {
    return `HL-${codeMatch[1].padStart(3, "0")}`;
  }

  // Anything else (a slug, a legacy code prefix) is passed through for the
  // backend to resolve — but reject obvious noise early.
  if (/^[A-Za-z0-9][A-Za-z0-9-_]{0,63}$/.test(text)) {
    return text;
  }

  return null;
};
