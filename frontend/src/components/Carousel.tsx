import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import Button from './Button'
// import { Play } from 'lucide-react'

interface CarouselProps {
    children: React.ReactNode[]
    autoSlide?: boolean
    autoSlideInterval?: number
}

const Carousel:React.FC<CarouselProps> = ({ children: slides, autoSlide = false, autoSlideInterval = 8000 }) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [autoSlide, autoSlideInterval, next])


    return (
        <div className='overflow-hidden relative h-3/4 mx-auto'>
            <div className='flex w-full justify-end'>
            
            </div>
            <div className='bg-black absolute h-full opacity-40 w-full z-10'></div>
            <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
                <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <ChevronLeft />
                </button>
                <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <ChevronRight />
                </button>
            </div>
            <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {slides.map((s, i) => (
                        <div key={i} className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
