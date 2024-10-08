'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Student Management System',
    description: 'A comprehensive system for managing student data and academic records.',
    image: '/images/work-1.png?height=400&width=600'
  },
  {
    title: 'Hypertension Chatbot',
    description: 'An AI-powered chatbot for providing information and support related to hypertension.',
    image: '/images/work-2.png?height=400&width=600'
  },
  {
    title: 'University of Embu Homepage',
    description: 'A modern and responsive homepage design for the University of Embu.',
    image: '/images/work-3.png?height=400&width=600'
  }
]

export default function Work() {
  return (
    <section id="work" className="py-16 bg-gradient-to-br from-primary/20 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-4">Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}


function ProjectCard({ title, description, image }: Project) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <motion.div
        className="absolute inset-0 bg-red-600 bg-opacity-80"
        initial={{ y: '100%' }}
        animate={{ y: isHovered ? '0%' : '100%' }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-white p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-center">{description}</p>
      </motion.div>
    </motion.div>
  )
}