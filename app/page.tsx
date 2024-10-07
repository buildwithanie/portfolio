'use client'

import { motion } from 'framer-motion'
import Header from '@/components/ui/Header'
import Home from '@/components/ui/Home'
import About from '@/components/ui/About'
import Services from '@/components/ui/Services'
import Work from '@/components/ui/Work'
import Contact from '@/components/ui/Contact'
import Footer from '@/components/ui/Footer'

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main>
        <Home />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}