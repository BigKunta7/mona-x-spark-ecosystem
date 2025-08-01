'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// NOTE: La liste des liens a été volontairement simplifiée pour le design.
// On pourra la complexifier plus tard avec un menu déroulant "Produits" par exemple.
const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/mona', label: 'MONA' },
  { href: '/spark', label: 'SPARK' },
  { href: '/marketplace', label: 'Marketplace' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">MS</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-foreground">
              MONA x SPARK
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* TODO: Ajouter un menu mobile ici */}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href="/login"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors hover:text-accent',
                'text-foreground/80'
              )}
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md',
                'bg-accent text-accent-foreground hover:bg-accent/90'
              )}
            >
              Inscription
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 