// src/components/Home.js
import React from 'react';
import HeroSection from './HeroSection';
import Features from './Features';
import Introduction from './Introduction';

function Home() {
  return (
    <div>
      <HeroSection/>
      <Introduction/>
      <Features/>
    </div>
  );
}

export default Home;
