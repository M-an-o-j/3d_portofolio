import React from 'react'
import TextScene from './components/title'
import Hero from './sections/hero'
import Aboutme from './sections/aboutme'


const App = () => {
  return (
    <div 
      className='w-full h-full bg-[#008DDA]'
      style={{ 
        background: '',
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