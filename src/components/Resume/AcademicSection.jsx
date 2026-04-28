// app/components/AcademicSection.js
import React from 'react';

export default function AcademicSection() {
  const achievements = [
    { year: '2014 – 2018', title: 'B.S. Computer Science', company: 'Stanford University' },
    { year: '', title: 'Specialization in Distributed Systems & HCI', company: '' }, // A small break in year flow for visual style
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-24">
        <div>
          <h2 className="text-lg font-bold text-accent uppercase tracking-widest mb-10 font-mono">&Lambda;C&Lambda;DEMIC</h2>
          {achievements.map((achievement, index) => (
             <div key={index} className="flex flex-col gap-1 mb-8">
              {achievement.year && <span className="text-secondary font-mono text-sm">{achievement.year}</span>}
              <h3 className="text-2xl font-bold text-primary font-mono">{achievement.title}</h3>
              {achievement.company && <p className="text-lg text-secondary font-mono">{achievement.company}</p>}
            </div>
          ))}
        </div>
        <div className="border border-secondary/20 p-8 text-secondary font-mono italic leading-relaxed text-lg max-w-lg mt-12 md:mt-0">
          "Focusing on the intersection of human-computer interaction and scalable back-end engineering to create meaningful digital experiences."
        </div>
      </div>
    </section>
  );
}