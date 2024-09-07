import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Introduction from './components/Introduction';

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Introduction />
      <Features />
    </div>
  );
}

export default App;
