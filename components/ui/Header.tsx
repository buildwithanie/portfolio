'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = ['Home', 'About', 'Services', 'Work', 'Contact']

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed w-full bg-background/80 backdrop-blur-sm z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold">Your Name</h1>
        </motion.div>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/80 hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background py-4"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}