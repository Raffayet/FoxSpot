"use client"; // Important for using hooks in client components
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link"; // Import Link
import Button from "./Button";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { usePathname } from "next/navigation"; // Import usePathname

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flexBetween max-container padding-container relative z-30 py-5 transition-all ${
        isSticky ? "sticky top-0 bg-white/80 backdrop-blur-lg" : ""
      }`}
    >
      <Link href="/" className="flex items-center">
        <Image
          src="https://media.licdn.com/dms/image/v2/D4D0BAQFruZNOGtgpzQ/company-logo_100_100/company-logo_100_100/0/1737536019682/foxspot_logo?e=1747872000&v=beta&t=MZuQ-EZbajZaeqMVsN1dHSkMA0tD4IJ_vJP4sPKw3fw"
          alt="logo"
          width={74}
          height={29}
        />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className={`regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold ${
                pathname === link.href ? "font-bold" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Contact us"
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={() => {
            // Add onClick handler
            const footer = document.querySelector("footer"); // Select your footer element
            if (footer) {
              footer.scrollIntoView({ behavior: "smooth" }); // Scroll to footer
            } else {
              console.error("Footer element not found!"); // Handle if footer doesn't exist
            }
          }}
        />
      </div>

      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
