'use client'

import { motion } from 'framer-motion'
import { Code, Crop, AppWindow } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  { 
    icon: Code, 
    title: 'Web Design', 
    description: 'Designing and building websites that look great and work well for users.' 
  },
  { 
    icon: Crop, 
    title: 'Web Development', 
    description: 'Creating functional websites for optimal user experience.' 
  },
  { 
    icon: AppWindow, 
    title: 'App Development', 
    description: 'Developing mobile applications that meet user needs and expectations.' 
  },
]

export default function Services() {
  return (
    <section id="services" className="py-5 bg-gradient-to-br from-primary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full transition-colors duration-300 bg-black text-white hover:bg-red-600 group">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <service.icon className="mr-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-white/90">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
