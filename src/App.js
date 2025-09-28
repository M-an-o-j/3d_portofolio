import React from 'react'
import TextScene from './components/title'
import Hero from './sections/hero'
import Aboutme from './sections/aboutme'


const App = () => {
  return (
    <div 
      className='w-full h-full bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]'
      style={{ 
        background: 'linear-gradient(to bottom right, #0F0F23, #1A1A2E, #16213E)',
        minHeight: '100vh' 
      }}
    >
      <div className="w-full">
        <Hero />
        <Aboutme />
      </div>
    </div>
  )
}

export default App