"use client"

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
 {name:'Work',href:'#work'},
  { name: 'Contact', href: '#contact' }
]

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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
          <nav className="hidden md:flex md:space-x-4">
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
          <div className="relative flex items-center space-x-3">
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
        {isMenuOpen && (
          <nav className="md:hidden absolute right-0 top-14 bg-background shadow-md rounded-md p-3">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16 md:pt-0">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-center">
          <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-8 md:mb-0 md:mr-12"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/background.png?height=500&width=500"
              alt="Profile picture"
              fill
              sizes="(max-width: 768px) 256px, 384px"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left md:flex-1"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-10 text-primary">
              Welcome to My Portfolio
            </h1>

            <p className="text-lg md:text-xl mb-6 text-white-600 font-serif"
               style={{
                 textAlign: 'justify',        // Aligned text
                 color: '#ffffff',           // Custom blue color
                 fontSize: '1.25rem',        // 20px font size
                 fontStyle: 'italic',        // Italic style
                 lineHeight: '2.0',         // Improved readability
               }}>
             Hello there 👋! I&apos;m Ann Githinji, a passionate web and Android mobile application developer dedicated to crafting innovative, user-friendly digital experiences. Known for my attention to detail and ability to tackle complex challenges, I specialize in Kotlin and Next.js. Let&apos;s build something amazing together—feel free to connect! 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Button size="lg" className="group">
  <Link href="#contact" className="inline-flex items-center">
    Get in Touch
    <ArrowRight className="ml-5 h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>
</Button>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}