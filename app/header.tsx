import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

import Icon from "./icon.png";

export default function Header() {
  return (
    <nav className="sticky top-0 z-10 bg-[rgba(255,255,255,0.9)] backdrop-blur shadow-sm border-b">
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center px-20 py-3 select-none">
        <div>
          <Link
            href="/"
            className="hidden sm:inline-flex gap-2 items-center text-xl"
          >
            <div className="relative w-[1.25em] h-[1.25em]">
              <Image src={Icon} alt="" fill />
            </div>
            <span className="fredoka font-semibold text-stone-700">
              Llew's site
            </span>
          </Link>
        </div>
        <div className="flex justify-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/posts">Blog</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="font-medium text-stone-600 hover:text-pink-600 px-3 border-stone-300 border-r last:border-r-0"
      href={href}
    >
      {children}
    </Link>
  );
}
