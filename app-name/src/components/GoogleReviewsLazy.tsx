'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviewsLazy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true)
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
    if (hasLoaded && typeof window !== 'undefined') {
      const scriptId = 'elfsight-platform-script'
      const scriptAlreadyExists = document.getElementById(scriptId)

      if (!scriptAlreadyExists) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        script.onload = () => {
          if (window.ELFSIGHT_WIDGETS) {
            window.ELFSIGHT_WIDGETS.init()
          }
        }
        document.body.appendChild(script)
      } else {
        if (window.ELFSIGHT_WIDGETS) {
          window.ELFSIGHT_WIDGETS.init()
        }
      }
    }
  }, [hasLoaded])

  return (
    <div
      ref={containerRef}
      className={`transition-opacity duration-1000 ${
        hasLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-5xl mx-auto">
        <div
          className="elfsight-app-2b731141-603a-417a-b522-635b3eba1da4"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  )
}