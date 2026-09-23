"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNavigation } from "./MobileNavigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ACTIVITIES", href: "/activities" },
  { label: "DESTINATIONS", href: "/destinations" },
  { label: "STAY", href: "/accommodation" },
  { label: "SPECIALS", href: "/specials" },
  { label: "ABOUT", href: "/about" },
  { label: "GALLERY", href: "/gallery" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logo = isScrolled
    ? "/images/general/logo-1.png"
    : "/images/general/logo-2.png";

  return (
    <header
      className={`absolute left-0 top-0 z-100 w-full transition-all duration-300 ${
        isScrolled
          ? "fixed bg-white shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Travel Asambe Africa home"
          className="flex shrink-0 items-center"
        >
          <Image
            src={logo}
            alt="Travel Asambe Africa"
            width={2080}
            height={1050}
            className="h-auto w-37.5 object-contain sm:w-32.5 lg:w-35"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden items-center gap-8 md:flex lg:gap-10`}
        >
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-7 lg:gap-9"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative py-2 text-[11px] font-medium tracking-[0.16em] transition-colors duration-200 ${
                  isScrolled
                    ? "text-earth hover:text-brand"
                    : "text-white hover:text-brand"
                }`}
              >
                {item.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Enquire */}
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center px-5 py-2.5 text-[11px] font-medium tracking-[0.14em] transition-colors duration-200 ${
              isScrolled
                ? "bg-earth text-white hover:bg-brand"
                : "bg-white text-black hover:bg-brand hover:text-white"
            }`}
          >
            ENQUIRE
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavigation
            items={navItems}
            isScrolled={isScrolled}
          />
        </div>
      </div>
    </header>
  );
}