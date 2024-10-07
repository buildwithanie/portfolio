'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' }
]

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false) // State to track menu visibility

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev) // Toggle menu visibility
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                <path
                  d="M50 10 L90 90 L10 90 Z"
                  fill="currentColor"
                  className="text-primary-foreground"
                />
                <text
                  x="50"
                  y="70"
                  fontSize="50"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-primary"
                >
                  A
                </text>
              </svg>
            </div>
            <span className="text-xl font-semibold">Ann</span>
          </Link>
          <nav className="hidden md:flex md:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="relative flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {mounted && (theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              ))}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {/* Vertical menu for small devices */}
        {isMenuOpen && (
          <nav className="md:hidden absolute right-0 top-16 bg-background shadow-md rounded-md p-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)} // Close menu on item click
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="container px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto mb-8">
              <Image
                src="/images/background.png?height=320&width=320"
                alt="Profile picture"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
              Welcome to My Portfolio
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
  I&apos;m a passionate web developer creating amazing digital experiences.
</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Link href="#work" className="inline-flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home;
