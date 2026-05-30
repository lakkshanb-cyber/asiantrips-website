import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Destinations from '@/pages/Destinations';
import Packages from '@/pages/Packages';
import Contact from '@/pages/Contact';
import { QuoteModalProvider } from '@/context/QuoteModalContext';
import QuoteModal from '@/components/QuoteModal';

function App() {
  return (
    <Router>
      <QuoteModalProvider>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <QuoteModal />
          <Toaster />
        </div>
      </QuoteModalProvider>
    </Router>
  );
}

export default App;