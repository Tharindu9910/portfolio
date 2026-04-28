// app/components/ContactLinks.js
import React from 'react';

export default function ContactLinks() {
  return (
    <div className="py-12 md:py-16 md:absolute md:top-2 md:right-6 md:p-6 w-full max-w-xs ml-auto">
      <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-8 font-mono">DIRECT.CH</h2>
      <div className="flex flex-col gap-6 text-primary font-mono text-lg">
        <a href="mailto:hello@architect.fs" className="flex items-center gap-4 group">
          <div className="w-8 h-8 rounded-full border border-secondary/50 flex items-center justify-center group-hover:border-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          hello@architect.fs
        </a>
        <a href="https://github.com/architect_fs" target="_blank" className="flex items-center gap-4 group">
          <div className="w-8 h-8 rounded-full border border-secondary/50 flex items-center justify-center group-hover:border-primary">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 5.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 5.77a5.44 5.44 0 00-1.5 3.77c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 19.157v2.87"/><path d="M9 20.027c-5 1.5-5-2.5-7-3V14"/></svg>
          </div>
          github.com/architect_fs
        </a>
        <a href="https://linkedin.com/in/architectfs" target="_blank" className="flex items-center gap-4 group">
          <div className="w-8 h-8 rounded-full border border-secondary/50 flex items-center justify-center group-hover:border-primary">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          linkedin.com/in/architectfs
        </a>
      </div>
    </div>
  );
}