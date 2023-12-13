import React from 'react';
import { useRouter } from 'next/navigation';

const HeroComponent = () => {
  const router = useRouter();

  const navigateToMenu = () => {
    router.push('/menu');
  };

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(/hero-desktop.jpg)' }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5 text-2xl">Join our community of food enthusiasts as we share and savor the stories behind our favorite dishes.</p>
          <button onClick={navigateToMenu} className="btn btn-primary text-xl p-5 h-16">Explore Dishes</button>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
