import Link from "next/link";
const menuItems = [
  { name: "Home", link: "#home" },
  { name: "We Repair", link: "#we-repair" },
  { name: "Services", link: "#services" },
  { name: "Why Us", link: "#why-us" },
  { name: "About", link: "#about" },
  { name: "Gallery", link: "#gallery" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
];
export function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-8 w-[100vw]">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Life Cool Air Conditioner
            </h2>
            <p>Your trusted partner for all air conditioning needs.</p>
            <div className="mt-4">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-[#ffc300]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-sm text-gray-600 hover:text-[#ffc300]"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.463725560107!2d73.87673507519024!3d18.46264258261976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf2cd486d8b%3A0xb2ae810e77ee6756!2sLife%20Cool%20Air%20Conditioner!5e0!3m2!1sen!2sin!4v1730839448929!5m2!1sen!2sin"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p>&copy; 2024 Life Cool Air Conditioner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
