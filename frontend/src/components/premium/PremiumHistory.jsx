import { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { chapters as fallbackChapters } from "../../data/historyChapter";

const PremiumHistory = ({ site }) => {
  const [current, setCurrent] = useState(-1);

  // Use the site's own chapters from the database if it has any,
  // otherwise fall back to the bundled Bagh Bhairav story.
  const chapters =
    site?.chapters && site.chapters.length > 0
      ? site.chapters
      : fallbackChapters;

  const nextChapter = () => {
    if (current < chapters.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <section className="bg-[#F8F4EE] px-6 py-16">

      {current === -1 ? (
        <div className="text-center">

          <BookOpen
            size={55}
            className="mx-auto text-[#D6A94F]"
          />

          <h2 className="mt-6 text-4xl font-bold text-[#4B2E2A]">
            Hidden Story
          </h2>

          <p className="mt-5 text-[#6B5A48] leading-8">
            Discover the untold legends of
            {" "}{site?.name || "this heritage site"} preserved
            through generations.
          </p>

          <button
            onClick={() => setCurrent(0)}
            className="mt-8 bg-[#7B1E23] text-white px-8 py-3 rounded-full hover:bg-[#65161B] transition"
          >
            Begin Journey
          </button>

        </div>
      ) : (
        <div>

          <p className="text-[#B08D57] font-semibold">
            {chapters[current].title}
          </p>

          <h2 className="text-3xl font-bold text-[#4B2E2A] mt-2">
            {chapters[current].heading}
          </h2>

          {/* Story */}

          {chapters[current].content && (
            <p className="mt-6 leading-8 text-[#6B5A48]">
              {chapters[current].content}
            </p>
          )}

          {/* Timeline */}

          {chapters[current].timeline && chapters[current].timeline.length > 0 && (
            <div className="mt-8 space-y-5">

              {chapters[current].timeline.map((item, index) => (

                <div
                  key={index}
                  className="border-l-4 border-[#D6A94F] pl-5"
                >
                  <p className="font-bold text-[#7B1E23]">
                    {item.year}
                  </p>

                  <p className="text-[#6B5A48]">
                    {item.title}
                  </p>

                </div>

              ))}

            </div>
          )}

          {current !== chapters.length - 1 ? (

            <button
              onClick={nextChapter}
              className="mt-10 bg-[#D6A94F] text-white px-7 py-3 rounded-full flex items-center gap-2"
            >
              Continue

              <ArrowRight size={18} />

            </button>

          ) : (

            <button
              className="mt-10 bg-[#7B1E23] text-white px-7 py-3 rounded-full"
            >
              Continue to Gallery
            </button>

          )}

        </div>
      )}

    </section>
  );
};

export default PremiumHistory;