// Hero.tsx
import React from 'react';

interface HeroProps {
  headline: string;
  subheadline: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline }) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-medium title-font text-gray-900 sm:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mb-8 leading-relaxed">{subheadline}</p>
      </div>
    </section>
  );
};

export default Hero;