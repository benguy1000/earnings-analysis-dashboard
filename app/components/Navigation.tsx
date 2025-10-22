'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, MessageSquare, Home } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/dashboard',
    },
    {
      href: '/transcript',
      label: 'Transcript Analysis',
      icon: MessageSquare,
      active: pathname === '/transcript',
    },
    {
      href: '/opportunities',
      label: 'Opportunities',
      icon: FileText,
      active: pathname === '/opportunities',
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${
                  link.active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
