'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Menu, Sparkles } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  onAppointmentClick: () => void
  activePage?: 'home' | 'servicios'
}

const navLinks = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre Mi' },
  { href: '/#testimonios', label: 'Testimonios' },
]

export default function Header({ onAppointmentClick, activePage = 'home' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-serif text-xl font-semibold text-foreground">Tu Bienestar Mental</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/servicios" 
                className={`transition-colors font-medium ${activePage === 'servicios' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Planes
              </Link>
            </li>
            <li>
              <a
                href="https://mindful.tubienestarmental.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rainbow-button inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                Mindful
              </a>
            </li>
            <li>
              <Button onClick={onAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Agendar Cita
              </Button>
            </li>
          </ul>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background border-border">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                <Link href="/servicios" className={`text-lg font-medium ${activePage === 'servicios' ? 'text-primary' : 'text-foreground hover:text-primary'} transition-colors`}>
                  Planes
                </Link>
                <a
                  href="https://mindful.tubienestarmental.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rainbow-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold"
                >
                  <Sparkles className="w-5 h-5" />
                  Mindful
                </a>
                <Button onClick={onAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2">
                  Agendar Cita
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
