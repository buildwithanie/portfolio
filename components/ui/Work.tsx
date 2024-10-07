import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { useState, useCallback } from 'react';

interface Project {
  image: string;
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    image: '/images/work-1.png',
    title: 'School Management Web Application',
    description: 'This is a simple school management system that enhances communication between the students and the administrator',
    link: '#',
  },
  {
    title: 'Hypertension Application',
    description: 'This is a chatbot application for hypertension patients',
    image: '/images/work-2.png',
    link: '#',
  },
  {
    title: 'Home Page',
    description: 'The University of Embu home page',
    image: '/images/work-3.png',
    link: '#',
  },
];

const Work: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section id="work" className="py-5 bg-gradient-to-br from-primary/20 to-background">
      <div className="container mx-auto px-4 max-w-screen-md">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          My Work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[400px] group"
            >
              <Card className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Dark overlay always present */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Red overlay that slides up */}
                <div 
                  className={`absolute inset-0 bg-red-600/70 transform transition-transform duration-500 ease-in-out ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'
                  }`}
                />

                <motion.div 
                  className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <CardTitle className="text-white text-lg mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-white">
                    {project.description}
                  </CardDescription>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;