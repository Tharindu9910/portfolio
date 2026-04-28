// app/components/JournalEntry.js
import React from 'react';

export default function JournalEntry({ year, title, company, description, achievements }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-x-16 mb-16">
      <div className="md:border-r md:border-secondary/20 md:pr-16 mb-8 md:mb-0">
        <span className="text-secondary font-mono text-sm tracking-widest">{year}</span>
        <h3 className="text-2xl font-bold text-primary font-mono mt-2">{title}</h3>
        <p className="text-lg text-secondary font-mono">{company}</p>
      </div>
      <div>
        <p className="text-secondary font-mono text-lg mb-8 leading-relaxed max-w-xl">{description}</p>
        <div className="flex flex-col gap-6">
          {achievements.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="text-accent font-bold font-mono pt-1 text-sm">{`0${index + 1}`}</span>
              <p className="text-secondary font-mono leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}