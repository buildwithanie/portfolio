"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'School Management System',
    description: 'A comprehensive platform that streamlines communication between students, teachers, and administrators.',
    image: '/images/work-1.png',
  },
  {
    title: 'Hypertension Assistant',
    description: 'An AI-powered chatbot application helping hypertension patients monitor their condition.',
    image: '/images/work-2.png',
  },
  {
    title: 'University of Embu Home Page',
    description: 'Modern university homepage with dynamic content management and student resources.',
    image: '/images/work-3.png',
  }
];

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group h-[700px] relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 w-full h-[800px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-red-500 to-transparent 
                    transition-all duration-700 ${hoveredIndex === index ? 'h-full' : 'h-0'} ease-in-out`}
                  />
                </div>

                <CardContent className="relative h-full flex flex-col justify-end p-6 z-10">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <motion.p
                    className={`text-gray-200 mb-4 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-0' : 'opacity-0'}`} // Keep it hidden
                  >
                    {project.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
