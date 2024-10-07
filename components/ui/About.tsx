'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type TabItem = {
  title: string
  description: string
}

type TabContent = {
  skills: TabItem[]
  education: TabItem[]
}

type TabType = keyof TabContent

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('skills')

  const tabContent: TabContent = {
    skills: [
      { title: 'UI', description: 'Designing Web/App Interfaces' },
      { title: 'Web Development', description: 'Designing Web Development' },
      { title: 'App Development', description: 'Building Android App' },
    ],
    education: [
      { title: '2020-2024', description: 'University of Embu' },
      { title: '2016-2019', description: 'Kiambogo Secondary School' },
      { title: '2008-2015', description: 'Kianjogu Primary School' },
    ],
  }

  return (
    <section id="about" className="py-5 bg-gradient-to-br from-primary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Me</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  I recently completed my fourth-year ICT degree, equipping me with comprehensive knowledge in information and communication technology. With a strong foundation in ICT, Im ready to tackle diverse challenges and contribute effectively to the tech industry.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="flex mb-6 space-x-4">
              <Button
                variant={activeTab === 'skills' ? 'default' : 'outline'}
                onClick={() => setActiveTab('skills')}
                className="flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Skills
              </Button>
              <Button
                variant={activeTab === 'education' ? 'default' : 'outline'}
                onClick={() => setActiveTab('education')}
                className="flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Education
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {tabContent[activeTab].map((item, index) => (
                        <motion.li
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex flex-col"
                        >
                          <span className="font-semibold text-lg text-primary">{item.title}</span>
                          <span className="text-muted-foreground">{item.description}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}