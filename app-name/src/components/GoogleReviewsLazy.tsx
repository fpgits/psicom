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
    if (!showWidget) return

    // Insert Elfsight script if it doesn't exist
    const existingScript = document.getElementById('elfsight-script')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://static.elfsight.com/platform/platform.js'
      script.async = true
      script.id = 'elfsight-script'
      document.body.appendChild(script)
    }

    // Wait for Elfsight iframe to load and detect the load event
    const interval = setInterval(() => {
      const iframe = containerRef.current?.querySelector('iframe')
      if (iframe) {
        iframe.addEventListener('load', () => {
          setIsLoaded(true)
        })
        clearInterval(interval)
      }
    }, 300)

    // Cleanup interval after 10 seconds just in case
    const timeout = setTimeout(() => clearInterval(interval), 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [showWidget])

  return (
    <div ref={containerRef} className="relative min-h-[200px]">
      {/* Loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg
              className="animate-spin h-5 w-5 text-[#78AAC3]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              />
            </svg>
            Cargando opiniones...
          </div>
        </div>
      )}

      {/* Widget */}
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {showWidget && (
          <div className="elfsight-app-2b731141-603a-417a-b522-635b3eba1da4" />
        )}
      </div>
    </div>
  )
}