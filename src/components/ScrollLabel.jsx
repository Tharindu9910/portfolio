export default function ScrollLabel() {
  return (
    <div
      className="scroll-label"
      style={{
        position: 'absolute',
        left: '0px',
        bottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div style={{ width: '1px', height: '48px', background: '#444' }} />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#B3B3B3',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
        }}
      >
        SCROLL
      </span>
    </div>
  )
}
