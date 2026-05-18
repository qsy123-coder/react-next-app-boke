import Link from "next/link";
import { PenLine } from "lucide-react";
import DropdownLink from "./DropdownLink";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/blogs" },
  { name: "分类", href: "/categories" },
  { name: "标签", href: "/tags" },
  { name: "归档", href: "/archives" },
  { name: "关于", href: "/about" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="flex h-16 w-full max-w-6xl items-center justify-between rounded-full bg-[#1a1a1c] border border-white/[0.08] px-4 sm:px-6">
        {/* Left - Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-rose-600">
            <PenLine className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-white tracking-tight">Inkwell</span>
        </Link>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right - Auth Dropdown & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <DropdownLink />
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
