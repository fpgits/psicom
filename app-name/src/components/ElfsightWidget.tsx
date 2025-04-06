'use client'

import { useEffect } from 'react'

export default function ElfsightWidget() {
  useEffect(() => {
    // Carga el script de Elfsight solo una vez
    const scriptId = 'elfsight-platform-script'

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://static.elfsight.com/platform/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="elfsight-app-2b731141-603a-417a-b522-635b3eba1da4" data-elfsight-app-lazy></div>
  )
}
