import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-20">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        {/* Company */}
        <div className="md:col-span-1">
          <h2 className="mb-4 text-2xl font-extrabold uppercase">Pharmexa</h2>

          <p className="text-sm leading-7 text-white/75">
            We are a pharmaceutical manufacturing company committed to
            developing and producing high-quality healthcare solutions through
            innovation, quality, and advanced manufacturing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a href="#about" className="transition hover:text-white">
                About Us
              </a>
            </li>

            <li>
              <a href="#services" className="transition hover:text-white">
                What We Do
              </a>
            </li>

            <li>
              <a href="#news" className="transition hover:text-white">
                Latest News
              </a>
            </li>

            <li>
              <a href="#contact" className="transition hover:text-white">
                Get Started
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Our Services</h3>

          <ul className="space-y-3 text-sm text-white/75">
            <li>Pharmaceutical Manufacturing</li>
            <li>Product Development</li>
            <li>Quality & Testing</li>
            <li>Contract Manufacturing</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 shrink-0" />
              <span>info@arvionpharma.com</span>
            </li>

            <li className="flex items-start gap-3">
              <FaPhone className="mt-1 shrink-0" />
              <span>+00 123 456 789</span>
            </li>

            <li className="flex items-start gap-3">
              <FaLocationDot className="mt-1 shrink-0" />
              <span>
                Pharmaceutical Manufacturing Facility, Global Operations
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-white/60 md:flex-row">
          <p>© 2026 ARVION PHARMA. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
