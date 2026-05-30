import React from 'react';

const AsianTripsLogo = ({ type = 'full', className = '' }) => {
  // SVG Icon: Mountain peaks with dual arcs (sun/halo)
  // Designed to match the line-art style provided
  const logoIcon = (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer Arc */}
      <path
        d="M20 45 C20 15, 80 15, 80 45"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-90"
      />
      {/* Inner Arc */}
      <path
        d="M30 45 C30 25, 70 25, 70 45"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-90"
      />
      
      {/* Mountain Peaks */}
      {/* Left Peak */}
      <path
        d="M15 65 L 30 45"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Peak (Main) */}
      <path
        d="M25 55 L 50 25 L 75 55"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Peak */}
      <path
        d="M70 45 L 85 65"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Stylized base lines/swashes to unify the bottom */}
      <path
        d="M20 60 Q 35 50, 50 60 T 80 60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-80"
      />
    </svg>
  );

  // HEADER VARIANT: Horizontal lockup (Icon left, Text stack right)
  // Suitable for Navigation bars
  if (type === 'header') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Icon */}
        <div className="w-10 h-10 text-orange-500">
          {logoIcon}
        </div>
        
        {/* Text Stack */}
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold font-serif leading-none tracking-tight text-blue-950">
            AsianTrips
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest font-medium text-gray-500 mt-1">
            Experience Beyond Travel
          </span>
        </div>
      </div>
    );
  }

  // MINIMAL VARIANT: Just the icon
  if (type === 'minimal') {
    return (
      <div className={`w-12 h-12 text-orange-500 ${className}`}>
        {logoIcon}
      </div>
    );
  }

  // FULL VARIANT: Vertical stacked lockup (Icon top, Text bottom)
  // Suitable for Hero sections, Footers, and large branding areas
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Icon */}
      <div className="w-20 h-20 mb-2 text-orange-500 logo-icon">
        {logoIcon}
      </div>
      
      {/* Text Stack */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight mb-2 logo-text">
          AsianTrips
        </h1>
        <p className="text-sm md:text-base uppercase tracking-[0.2em] font-medium opacity-80 logo-tagline">
          Experience Beyond Travel
        </p>
      </div>
    </div>
  );
};

export default AsianTripsLogo;