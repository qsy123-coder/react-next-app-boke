"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DropdownLink from "./DropdownLink";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/blogs" },
  { name: "分类", href: "/categories" },
  { name: "标签", href: "/tags" },
  { name: "归档", href: "/archives" },
  { name: "关于", href: "/about" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={`md:hidden fixed top-24 left-4 right-4 z-40 rounded-2xl bg-[#1a1a1c] border border-white/[0.08] shadow-xl overflow-hidden transition-all duration-300 ease-out origin-top ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-white/[0.08]">
              <DropdownLink />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
