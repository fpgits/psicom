'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviewsLazy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showWidget, setShowWidget] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowWidget(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (showWidget && typeof window !== 'undefined') {
      const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        document.body.appendChild(script)
      }

      // Detect when the Elfsight iframe is actually loaded
      const checkIframeLoaded = setInterval(() => {
        const iframe = containerRef.current?.querySelector('iframe')
        if (iframe) {
          setIsLoaded(true)
          clearInterval(checkIframeLoaded)
        }
      }, 300)

      return () => clearInterval(checkIframeLoaded)
    }
  }, [showWidget])

  return (
    <div ref={containerRef} className="relative min-h-[150px]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10 rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 text-sm animate-pulse">
            <svg className="animate-spin h-5 w-5 text-[#78AAC3]" view