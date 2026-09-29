import React, { useEffect, useState } from "react";
import { Puzzle, RotateCcw, X, Trophy } from "lucide-react";

const DiscoverGallery = ({ site }) => {
  const [lightbox, setLightbox] = useState(false);
  const [pieces, setPieces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);

  const mainImage =
    site?.heroImage ||
    site?.image ||
    "/images/Handpainted/Rikma-Thapa.jpeg";

  const cols = 3;
  const rows = 3;

  // Create the 9 puzzle pieces
  const createPieces = () => {
    const newPieces = Array.from({ length: 9 }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      return {
        id: i,
        correctPosition: i,
        posX: (col / (cols - 1)) * 100,
        posY: (row / (rows - 1)) * 100,
      };
    });

    // Shuffle the pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [newPieces[i], newPieces[randomIndex]] = [
        newPieces[randomIndex],
        newPieces[i],
      ];
    }

    // Make sure it doesn't accidentally start solved
    const isAlreadySolved = newPieces.every(
      (piece, index) => piece.correctPosition === index
    );

    if (isAlreadySolved) {
      [newPieces[0], newPieces[1]] = [newPieces[1], newPieces[0]];
    }

    return newPieces;
  };

  // Start a new puzzle whenever the artwork changes
  useEffect(() => {
    setPieces(createPieces());
    setSelected(null);
    setSolved(false);
  }, [mainImage]);

  // Check whether the puzzle is solved
  const checkSolved = (currentPieces) => {
    const completed = currentPieces.every(
      (piece, index) => piece.correctPosition === index
    );

    if (completed) {
      setSolved(true);
    }
  };

  // Handle clicking a puzzle piece
  const handlePieceClick = (index) => {
    if (solved) {
      return;
    }

    // First piece selected
    if (selected === null) {
      setSelected(index);
      return;
    }

    // Click the same piece again
    if (selected === index) {
      setSelected(null);
      return;
    }

    // Swap the two pieces
    const updatedPieces = [...pieces];

    [updatedPieces[selected], updatedPieces[index]] = [
      updatedPieces[index],
      updatedPieces[selected],
    ];

    setPieces(updatedPieces);
    setSelected(null);

    checkSolved(updatedPieces);
  };

  // Reset puzzle
  const resetPuzzle = () => {
    setPieces(createPieces());
    setSelected(null);
    setSolved(false);
  };

  return (
    <section className="bg-[#F8F4EE] px-5 py-8">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
        <Puzzle size={18} className="text-[#D6A94F]" />

        <h2 className="text-lg font-bold text-[#4B2E2A]">
          Gallery Puzzle
        </h2>
      </div>

      {!solved ? (
        <>
          <p className="text-xs text-[#8B7355] mb-4">
            Rearrange the pieces to reveal the complete artwork.
          </p>

          {/* Puzzle */}
          <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[#E8DFD0] shadow-md bg-[#E8DFD0] p-1.5">
            {pieces.map((piece, index) => (
              <button
                key={piece.id}
                type="button"
                onClick={() => handlePieceClick(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                  selected === index
                    ? "ring-4 ring-[#D6A94F] scale-[0.96]"
                    : "hover:scale-[1.02]"
                }`}
                aria-label={`Puzzle piece ${index + 1}`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${piece.posX}% ${piece.posY}%`,
                  }}
                />

                {/* Selected indicator */}
                {selected === index && (
                  <div className="absolute inset-0 bg-[#D6A94F]/20 flex items-center justify-center">
                    <div className="bg-white/90 text-[#4B2E2A] rounded-full px-3 py-1 text-xs font-bold shadow">
                      Selected
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-[#8B7355]">
              Tap two pieces to swap them.
            </p>

            <button
              type="button"
              onClick={resetPuzzle}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#7B1E23] hover:underline"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Celebration */}
          <div className="rounded-3xl bg-[#FFF5D8] border border-[#E7C76A] p-6 text-center shadow-md">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#D6A94F] flex items-center justify-center">
              <Trophy size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-[#4B2E2A]">
              Puzzle Solved! 🎉
            </h3>

            <p className="mt-2 text-sm text-[#8B7355] leading-6">
              Beautiful! You revealed the complete artwork.
            </p>

            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="mt-5 bg-[#7B1E23] hover:bg-[#65161B] text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              View Full Artwork
            </button>

            <button
              type="button"
              onClick={resetPuzzle}
              className="mt-3 mx-auto flex items-center gap-2 text-sm font-semibold text-[#7B1E23] hover:underline"
            >
              <RotateCcw size={16} />
              Play Again
            </button>
          </div>

          {/* Solved artwork */}
          <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-2xl border border-[#E8DFD0] shadow-md bg-[#E8DFD0] p-1.5">
            {pieces.map((piece) => (
              <div
                key={piece.id}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${piece.posX}% ${piece.posY}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Full image lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center px-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <img
            src={mainImage}
            alt={site?.name || "Artwork"}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default DiscoverGallery;