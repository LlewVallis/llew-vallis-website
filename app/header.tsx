import Link from "next/link";
import { ReactNode } from "react";

export default function Header() {
  return (
    <nav className="flex justify-center py-3 border-b">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/posts">Blog</NavLink>
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
