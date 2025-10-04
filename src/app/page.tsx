import FAQSection from '@/components/Home/FAQSection'
import FitMeSolution from '@/components/Home/FitMeSolution'
import FoundersNote from '@/components/Home/FoundersNote'
import HeroSection from '@/components/Home/HeroSection'
import ProblemSection from '@/components/Home/ProblemSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <ProblemSection/>
      <FitMeSolution/>
      <FoundersNote/>
      <FAQSection/>
    </div>
  )
}
