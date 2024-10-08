import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'School Management Web Application',
    description: 'This is a simple school management system that enhances communication between students and administrators',
    image: '/images/work-1.png'
  },
  {
    title: 'Hypertension Application',
    description: 'This is a chatbot application for hypertension patients',
    image: '/images/work-2.png'
  },
  {
    title: 'University Home Page',
    description: 'A responsive and modern university homepage design',
    image: '/images/work-3.png'
  },
];

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section className="py-5 bg-gradient-to-br from-red-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[850px] group"
            >
              <Card className="relative w-full h-full overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Dark overlay always present */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Red overlay that slides up */}
                <div 
                  className={`absolute inset-0 bg-red-600/70 transform transition-all duration-500 ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'
                  }`}
                />

                <div 
                  className={`absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <CardTitle className="text-white text-lg mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-white">
                    {project.description}
                  </CardDescription>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}