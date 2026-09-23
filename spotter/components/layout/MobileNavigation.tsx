"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type MobileNavigationProps = {
  items: Array<{ href: string; label: string }>;
  isScrolled: boolean;
};

export function MobileNavigation({ items, isScrolled }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-menu-open");
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.documentElement.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls={menuId}
        aria-expanded={isOpen}
        className={`relative z-10001 flex h-11 w-11 shrink-0 touch-manipulation select-none items-center justify-center ${
          isOpen || isScrolled ? "text-earth" : "text-white"
        }`}
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span className="relative flex h-5 w-6 items-center justify-center">
          {/* Top */}
          <span
            className={`absolute block h-px w-6 bg-current transition-transform duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />

          {/* Middle */}
          <span
            className={`absolute block h-px w-6 bg-current transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Bottom */}
          <span
            className={`absolute block h-px w-6 bg-current transition-transform duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </span>
      </button>

      {/* Mobile Menu */}
      <div
        id={menuId}
        className={`fixed left-0 right-0 top-0 z-10000 h-dvh w-full bg-white ${
          isOpen
            ? "pointer-events-auto translate-y-0"
            : "pointer-events-none -translate-y-full"
        } transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        aria-hidden={!isOpen}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <nav
          aria-label="Mobile navigation"
          className="h-full w-full overflow-y-auto overscroll-contain"
        >
          {/* Header space */}
          <div className="h-18.25 shrink-0 sm:h-19.5" />

          <ul className="flex min-h-[calc(100%-73px)] flex-col px-6 pb-8 pt-4 sm:min-h-[calc(100%-78px)]">
            {items.map((item) => (
              <li key={item.label} className="border-b border-black/5">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-5 text-sm font-medium tracking-[0.12em] text-earth active:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="mt-auto pt-6">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center bg-earth px-5 py-3 text-[11px] font-medium tracking-[0.14em] text-white active:bg-brand"
              >
                ENQUIRE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
