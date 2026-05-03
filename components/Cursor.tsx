'use client'

import { useEffect, useState } from 'react'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let idCounter = 0

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: idCounter++ }]
        if (newTrail.length > 15) newTrail.shift()
        return newTrail
      })

      // Clear old trail if mouse stops moving
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setTrail([])
      }, 100)
    }

    window.addEventListener('mousemove', updatePosition)
    return () => {
      window.removeEventListener('mousemove', updatePosition)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          transform: `translate(${position.x - 5}px, ${position.y - 5}px)`,
          width: '10px', height: '10px',
          backgroundColor: 'var(--color-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px var(--color-gold)'
        }}
      />
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div 
          key={point.id}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            transform: `translate(${point.x - 3}px, ${point.y - 3}px)`,
            width: '6px', height: '6px',
            backgroundColor: 'var(--color-gold)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: index / trail.length,
            boxShadow: '0 0 5px var(--color-gold)'
          }}
        />
      ))}
    </>
  )
}
