"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          className={`navbar-link ${
            currentPath === link.href &&
            "cursor-default text-primary hover:text-primary/70"
          }`}
          key={link.label}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
