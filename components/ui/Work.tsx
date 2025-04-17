"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  tags?: string[]
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    title: "Student Management System",
    description: "A comprehensive system for managing student data and academic records.",
    image: "/images/work-1.png",
    tags: ["Hack", "PHP", ],
  },
  {
    title: "Hypertension Web",
    description: "An AI-powered chatbot providing information and support related to hypertension.",
    image: "/images/work-2.png",
    tags: ["Typescript", "CSS", "Javascript"],
  },
  {
    title: "University of Embu Homepage",
    description: "A modern and responsive homepage design for the University of Embu.",
    image: "/images/work-3.png",
    tags: ["UI/UX", "PHP","Hack"],
  },
  {
    title: "Hypertension Chatbot",
    description: "Modernized bot that provides more information about hypertension",
    image: "/images/work-4.png",
    tags: ["Kotlin", "Healthcare", "Chatbot"],
  },
]

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="work" className="py-12 bg-gradient-to-br from-primary/20 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Work</h2>

        {/* Horizontal Scrolling Row with Larger Cards */}
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div className="relative max-w-5xl w-full bg-gray-900 rounded-lg overflow-hidden">
            {/* Browser Frame */}
            <div className="h-8 bg-gray-800 flex items-center px-3 border-b border-gray-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 flex-1 bg-gray-700 h-5 rounded-md"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                }}
                className="ml-2 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Full Screenshot */}
            <div className="relative aspect-[16/9]">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>

              {/* Tags */}
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} className="text-sm bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ title, description, image, tags = [], onClick }: Project & { onClick: () => void }) {
  return (
    <motion.div
      className="bg-gray-900/60 rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-[380px] snap-center cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Browser Frame with Screenshot */}
      <div className="relative overflow-hidden">
        {/* Browser Top Bar */}
        <div className="h-7 bg-gray-800 flex items-center px-3 border-b border-gray-700">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-3 flex-1 bg-gray-700 h-4 rounded-sm"></div>
        </div>

        {/* Screenshot - Slightly Taller */}
        <div className="relative aspect-[16/6]">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="380px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Project Info - More Spacious */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
