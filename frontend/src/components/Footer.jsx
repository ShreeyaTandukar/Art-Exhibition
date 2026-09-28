import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#4B2E2A] text-white mt-16" >

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Brand */}
        <div className="text-center mb-10">
          <a href="#home">
                <h2 className="text-3xl font-bold text-[#D6A94F] hover:text-white transition">
                HeritageLink
                </h2>
            </a>

          <p className="text-gray-300 mt-3 max-w-xl mx-auto">
            Connecting visitors with Nepal's living heritage through
            authentic stories, local artisans, and meaningful cultural
            experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#D6A94F] mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-300">
              <p>📍 Kathmandu, Nepal</p>
              <a
                href="mailto:info@heritagelink.com"
                className="flex items-center gap-3 hover:text-[#D6A94F] transition"
            >
                📧 info@heritagelink.com
            </a>
              <a
                href="tel:+9779847360542"
                className="flex items-center gap-3 hover:text-[#D6A94F] transition"
                >
                📞 +977 9800000000
                </a>
            </div>
          </div>

          {/* Quick Links */}
       

        <div>

          <h3 className="text-xl font-semibold text-[#D6A94F] mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>
              <a href="#home" className="hover:text-[#D6A94F] transition">
                Home
              </a>
            </li>

            <li>
              <a href="#audio" className="hover:text-[#D6A94F] transition">
                Audio Guide
              </a>
            </li>

            <li>
              <a href="#artisan" className="hover:text-[#D6A94F] transition">
                Meet the Artisan
              </a>
            </li>

            <li>
              <a href="#gallery" className="hover:text-[#D6A94F] transition">
                Heritage Gallery
              </a>
            </li>

            <li>
              <a href="#story" className="hover:text-[#D6A94F] transition">
                Hidden Story
              </a>
            </li>

            <li>
              <a href="#badge" className="hover:text-[#D6A94F] transition">
                Collect Badge
              </a>
            </li>

            <li>
              <a href="#why" className="hover:text-[#D6A94F] transition">
                Why Choose Us
              </a>
            </li>

          </ul>

        </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-[#D6A94F] mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">
              <span className="cursor-pointer hover:scale-110 transition">
                📘
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                📸
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                💼
              </span>
            </div>

            <p className="text-gray-300 mt-5">
              Join us in preserving Nepal's heritage,
              one story at a time.
            </p>
          </div>

        </div>

      </div>

      <div className="border-t border-[#6A4A46] py-5 text-center text-gray-400 text-sm">
        © 2026 HeritageLink. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;