'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Brain, TrendingUp, Calendar, Smile, Users, Book, Menu, X, Star, Heart, MessageCircle, Bookmark, ChevronRight, Phone, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Head from 'next/head'
import GoogleReviewsLazy from '@/components/GoogleReviewsLazy'

interface TestimonialProps {
  number: number;
  date: string;
  rating: number;
  comment: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ number, date, rating, comment }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
    <CardHeader className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-300">{number}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-sm mb-4">{comment}</p>
    </CardContent>
  </Card>
)

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  )
}

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isLoading && isOpen) {
      const redirectTimer = setTimeout(() => {
        router.push('https://wa.me/584245157059?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n')
      }, 1000)

      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, isOpen, router])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLoading ? 'Verificando disponibilidad' : 'Disponible!'}</DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">Verificando si hay disponibilidad de cita</span>
              </div>
            ) : (
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="w-8 h-8 mr-2" />
                <span>Cita disponible! Redirigiendo...</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAppointmentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="bg-gradient-to-b from-[#C4DDF5] to-white min-h-screen">
      <Head>
        <title>Tu Bienestar Mental | Psicóloga Mariany Rodríguez en Venezuela</title>
        <meta name="description" content="Mejora tu salud mental con la psicóloga Mariany Rodríguez. Ofrecemos terapia online, individual y de pareja en Venezuela. Especialistas en TDAH, autismo, ansiedad y depresión." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "PsychologicalTreatment",
              "name": "Tu Bienestar Mental",
              "provider": {
                "@type": "Person",
                "name": "Mariany Rodríguez",
                "jobTitle": "Psicóloga Clínica"
              },
              "areaServed": "Venezuela",
              "serviceType": "Terapia online, individual y de pareja"
            }
          `}
        </script>
      </Head>

      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header className="bg-white shadow-sm sticky top-0 z-10 transition-all duration-500 ease-in-out">
        {/* Banner de Consultas Online */}
        <div className="top-bar">
          <div className="top-bar-content">
            <span className="icon" aria-hidden="true">💻</span>
            <span>
              Durante <span className="highlight">Octubre y Noviembre</span> sólo se atienden <span className="highlight">consultas online</span>
            </span>
          </div>
        </div>

        {/* estilos del banner, aislados al componente */}
        <style jsx>{`
          .top-bar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
          }
          .top-bar::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shine 3s infinite;
          }
          @keyframes shine {
            to { left: 100%; }
          }
          .top-bar-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: relative;
            z-index: 1;
          }
          .icon {
            font-size: 16px;
          }
          .highlight {
            font-weight: 700;
            text-transform: uppercase;
            background: rgba(255, 255, 255, 0.2);
            padding: 2px 8px;
            border-radius: 4px;
          }
          @media (max-width: 640px) {
            .top-bar {
              padding: 10px 16px;
              font-size: 12px;
            }
            .top-bar-content {
              gap: 6px;
              flex-wrap: wrap;
            }
            .icon {
              font-size: 14px;
            }
          }
        `}</style>

        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-bold text-sm md:text-xl text-[#78AAC3]">Tu Bienestar Mental</span>
            </div>
            <ul className="hidden md:flex items-center space-x-6">
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Dialog>
                  <DialogTrigger asChild>
                    <a className="text-gray-600 hover:text-[#78AAC3] transition-colors cursor-pointer">Mindful</a>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>¡Próximamente!</DialogTitle>
                      <DialogDescription>
                        Estamos trabajando en algo emocionante. ¡Mantente atento para más novedades!
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <a href="/servicios" className="text-gray-600 hover:text-[#78AAC3] transition-colors">Servicios</a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Dialog>
                  <DialogTrigger asChild>
                    <a className="text-gray-600 hover:text-[#78AAC3] transition-c
