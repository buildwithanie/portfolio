"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, FileText, MapPin } from "lucide-react"
import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      })
      
      const result = await response.json()

      setIsSubmitting(false)

      if (result.success) {
        setMessage("Message sent successfully. Thank you!")
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon!",
        })
        formRef.current?.reset()
      } else {
        throw new Error(result.error || result.message)
      }
    } catch (error) {
      setIsSubmitting(false)
      setMessage("There was a problem sending your message. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    }

    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <section id="contact" className="py-5">
      <div className="container mx-auto px-4 bg-gradient-to-br from-primary/20 to-background">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Get in Touch
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Here are the ways you can reach me.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="text-primary" />
                  <a href="mailto:buildwithanie@gmail.com" className="text-primary hover:underline">
                    buildwithanie@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary" />
                  <span>Embu, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="text-primary" />
                  <a
                    href="/images/CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Download CV
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below to get in touch.</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input name="name" type="text" placeholder="Your Name" required />
                  </div>
                  <div>
                    <Input name="email" type="email" placeholder="Your Email" required />
                  </div>
                  <div>
                    <Textarea name="message" placeholder="Your Message" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>

                {message && (
                  <div className="mt-4 text-center">
                    <p className={message.includes("successfully") ? "text-green-600" : "text-red-600"}>{message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}