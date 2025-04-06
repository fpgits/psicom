'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviewsLazy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showWidget, setShowWidget] = useState(false)

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
    if (showWidget) {
      const existing = document.getElementById('elfsight-script')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        script.id = 'elfsight-script'
        document.body.appendChild(script)
      }
    }
  }, [showWidget])

  return (
    <div
      ref={containerRef}
      className={`transition-opacity duration-1000 ${
        showWidget ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {showWidget && (
        <div className="elfsight-app-2b731141-603a-417a-b522-635b3eba1da4"></div>
      )}
    </div>
  )
}