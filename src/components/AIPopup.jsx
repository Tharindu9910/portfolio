"use client";
import { useState } from "react";

export default function AIPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button className="ai-float-btn" onClick={() => setOpen(true)}>
          OPEN AI
        </button>
      )}

      {/* Right Panel */}
      <div className="ai-overlay">
        <div className={`ai-popup ${open ? "open" : ""}`}>
          
          {/* Header */}
          <div className="ai-header">
            <div>
              <div className="ai-title">CORE_INTEL_AGENT_v4.2</div>
              <div className="ai-sub">AUTH: LEVEL_09_ARCHITECT</div>
            </div>
            <div className="ai-close" onClick={() => setOpen(false)}>✕</div>
          </div>

          {/* Body */}
          <div className="ai-body">

            <div className="ai-status">
              <span>CPU: 12.4%</span>
              <span>MEM: 4.2GB</span>
              <span>NET: STABLE</span>
              <span>LATENCY: 12ms</span>
            </div>

            <div className="ai-msg">
              Neural pulse synchronization complete. The Monolith Grid is
              currently operating at peak efficiency.
            </div>

            <div className="ai-command">
              Execute structural analysis on the Monolith Grid. Focus on
              latency spikes in the West sector.
            </div>

            <div className="ai-processing">
              ARCHITECT_AI [PROCESSING...]
            </div>

            <div className="ai-input-row">
              <input
                className="ai-input"
                placeholder=">> Enter system directive..."
              />
              <button className="ai-btn">INITIALIZE</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}