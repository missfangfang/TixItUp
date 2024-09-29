'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Users', href: '/users' },
  ];

  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link ${
            currentPath === link.href &&
            'cursor-default text-primary hover:text-primary/70'
          }`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
