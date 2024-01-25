import Link from "next/link";
import { ReactNode } from "react";

export default function Header() {
    return (
        <nav className="flex justify-center px-20 py-3 border-b">
            <NavLink href="/">Home</NavLink>
        </nav>
    );
}

function NavLink({ children, href }: { children: ReactNode, href: string }) {
    return <Link className="font-medium text-stone-600 hover:text-pink-600" href={href}>{children}</Link>;
}