import React from 'react'
import TextScene from './components/title'
import Hero from './sections/hero'
import Aboutme from './sections/aboutme'
// import Skills from './sections/skills'
import SkillConstellation from './sections/skills'


const App = () => {
  return (
    <div 
      className='w-full h-full bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]'
      style={{ 
        background: '',
        minHeight: '100vh' 
      }}
    >
      <div className="w-full">
        <Hero />
        <Aboutme />
        <SkillConstellation />
      </div>
    </div>
  )
}

export default App