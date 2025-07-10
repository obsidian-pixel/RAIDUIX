'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedCarousel({ 
  items = [
    { title: 'Slide 1', content: 'This is the first slide content.' },
    { title: 'Slide 2', content: 'This is the second slide content.' },
    { title: 'Slide 3', content: 'This is the third slide content.' }
  ],
  autoPlay = true,
  interval = 3000,
  showDots = true,
  showArrows = true,
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (!autoPlay) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])
  
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'relative w-full overflow-hidden rounded-lg'
    const sizeClasses = {
      sm: 'h-32',
      default: 'h-48',
      lg: 'h-64'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} material-card`,
          slide: 'absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-transform duration-300',
          arrow: 'absolute top-1/2 transform -translate-y-1/2 p-2 material-button text-white rounded-full z-10',
          dot: 'w-3 h-3 rounded-full transition-all cursor-pointer'
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} glass-panel border border-white/20`,
          slide: 'absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-transform duration-300',
          arrow: 'absolute top-1/2 transform -translate-y-1/2 p-2 glass-button rounded-full z-10',
          dot: 'w-3 h-3 rounded-full transition-all cursor-pointer glass-panel border border-white/30'
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} ${colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'}`,
          slide: 'absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-transform duration-300',
          arrow: `absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 ${colorMode === 'dark' ? 'skeuo-button-dark' : 'skeuo-button'}`,
          dot: `w-3 h-3 rounded-full transition-all cursor-pointer ${colorMode === 'dark' ? 'skeuo-button-dark' : 'skeuo-button'}`
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass} bg-card border border-border`,
          slide: 'absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-transform duration-300',
          arrow: 'absolute top-1/2 transform -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full z-10',
          dot: 'w-3 h-3 rounded-full transition-all cursor-pointer bg-muted'
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <div className={classes.container} {...props}>
      {/* Slides */}
      {items.map((item, index) => (
        <div
          key={index}
          className={classes.slide}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`
          }}
        >
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.content}</p>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className={`${classes.arrow} left-4 hover:opacity-80`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className={`${classes.arrow} right-4 hover:opacity-80`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      
      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${classes.dot} ${
                index === currentIndex 
                  ? activeTheme === 'glass' ? 'bg-white/80' : 'bg-primary' 
                  : activeTheme === 'glass' ? 'bg-white/30' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}