import Link from 'next/link'
import React from 'react'

const HeroComponent = () => {
  const LinkUrl = () => {
    return <Link href="/menu"/>
  }

  return (
   <div className="hero min-h-screen" style={{backgroundImage: 'url(/hero-desktop.png)'}}>
    <div className="hero-overlay"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold ">Hello there</h1>
        <p className="mb-5 text-2xl">Join our community of food enthusiasts as we share and savor the stories behind our favorite dishes.</p>
        <button onClick={LinkUrl} className="btn btn-primary text-xl">Explore Dishes</button>
      </div>
    </div>
  </div>
  )
}

export default HeroComponent