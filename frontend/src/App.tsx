// import { useState } from 'react'
import './App.css'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'


const slides = [
  'https://images8.alphacoders.com/736/thumb-1920-736903.jpg',
  'https://images3.alphacoders.com/614/thumb-1920-614743.png',
  'https://images8.alphacoders.com/891/thumb-1920-891590.png'
]
function App() {
  return (
    <div className='bg-[#11111a] h-screen'>
      <Navbar />
      <Carousel autoSlide>
          {[...slides.map((s) => (
            <img src={s} />
          ))]}
        </Carousel>
    </div>
  )
}

export default App
