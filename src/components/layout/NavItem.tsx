'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

export default function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors pb-1",
        isActive ? "font-semibold text-primary border-b-2 border-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
