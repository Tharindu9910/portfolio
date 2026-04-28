// app/components/StackSection.js
import React from 'react';

const StackColumn = ({ category, items }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-4 h-4 rounded-full bg-accent" /> {/* The orange dot */}
      <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">{category}</h3>
    </div>
    {items.map(item => (
      <span key={item} className="text-secondary text-base font-mono">{item}</span>
    ))}
  </div>
);

const FullResumeButton = () => (
    <button className="bg-brightYellow text-black font-semibold font-mono px-6 py-3 text-sm flex items-center gap-2 hover:bg-opacity-80 transition">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L12 16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 9L12 16L5 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 22H20" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      FULL RESUME
    </button>
  );

export default function StackSection() {
  const stack = [
    { category: 'FRONTEND', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL / Three.js'] },
    { category: 'BACKEND', items: ['Node.js / Go', 'GraphQL / gRPC', 'PostgreSQL', 'Redis / Kafka'] },
    { category: 'CLOUD', items: ['AWS Ecosystem', 'Serverless Arch', 'Terraform', 'Kubernetes'] },
    { category: 'INFRASTRUCTURE', items: ['Observability', 'Security Audit'] },
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-lg font-bold text-accent uppercase tracking-widest mb-10 font-mono">ST&Lambda;CK_CORE</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-16">
          {stack.map((group, index) => (
            <React.Fragment key={index}>
              <StackColumn {...group} />
              {index === stack.length - 1 && (
                <div className="col-span-1 md:col-start-4 md:col-span-1 flex md:justify-end items-start md:mt-[-5rem]">
                  {/* ... Full Resume Button (see below) ... */}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}