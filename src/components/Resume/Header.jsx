// app/components/Header.js
import React from 'react';

export default function Header() {
  return (
    <header className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-secondary font-mono tracking-wider">&larr; BACK TO PORTFOLIO</span>
          <div className="flex flex-col text-sm text-right">
            <span className="text-secondary uppercase">AVAILABILITY</span>
            <span className="text-primary">Open for Contracts</span>
            <span className="text-secondary uppercase mt-2">BASE</span>
            <span className="text-primary">San Francisco, CA</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary font-mono mb-6">
          ARCHITECT.FS<span className="text-accent">.</span>
        </h1>
        <p className="text-2xl text-secondary font-mono leading-tight max-w-2xl">
          Senior Full-Stack Engineer crafting <span className="text-primary">high-concurrency<br /> distributed systems</span> and precision-engineered frontends.
        </p>
      </div>
    </header>
  );
}