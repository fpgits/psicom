'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviewsLazy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

  return (
    <div ref={containerRef} className="w-full flex justify-center min-h-[300px]">
      {isVisible && (
        <div dangerouslySetInnerHTML={{ __html: `
          <script src="https://static.elfsight.com/platform/platform.js" async></script>
          <div class="elfsight-app-2b731141-603a-417a-b522-635b3eba1da4" data-elfsight-app-lazy></div>
        ` }} />
      )}
    </div>
  )
}