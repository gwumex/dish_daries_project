import React from 'react'
import Image from 'next/image'

const HeroComponent = () => {
    
return (
<div className="relative h-[95vh]">
  {/* Hero Image */}
  <div className="block sm:hidden h-full">
    <Image
      alt="hero"
      src="/hero-mobile.png"
      layout="fill" // Changed to 'fill' to cover the parent's height
      objectFit="cover" // This ensures the image covers the area without losing its aspect ratio
      className="object-cover"
    />
  </div>
  <div className="hidden sm:block h-full">
    <Image
      alt="hero"
      src="/hero-desktop.png"
      layout="fill" // Changed to 'fill' for the same reason
      objectFit="cover"
      className="object-cover"
    />
  </div>

  {/* Text Content Overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 p-6">
    <div className="text-ivory-white max-w-xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Dish Diaries: Celebrating the Art of Dining
      </h1>
      <p className="text-2xl md:text-4xl leading-relaxed">
        Join our community of food enthusiasts as we share and savor the stories behind our favorite dishes.
      </p>
    </div>
  </div>
</div>


    );
}
    
export default HeroComponent