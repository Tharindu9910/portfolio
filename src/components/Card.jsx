'use client'
import Image from 'next/image'
import TabPills from './TabPills'


export default function Card({ tabs, image, imageAlt, showCode, title, description, linkText }) {
  return (
    <div className="card" style={{ height: '100%' }}>
      {/* Tabs */}
      {tabs && (
        <div style={{ marginBottom: '18px' }}>
          <TabPills tabs={tabs} activeIndex={0} />
        </div>
      )}

      {image && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '24px',
          background: '#0a0a0a',
          flexShrink: 0,
        }}>
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            style={{ objectFit: 'cover', opacity: 0.6, filter: 'grayscale(30%)' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(24,24,24,0.1) 30%, rgba(24,24,24,0.9) 100%)',
          }} />
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 700,
        fontSize: '20px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        marginBottom: '10px',
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: '#B3B3B3',
        lineHeight: 1.65,
        marginBottom: '28px',
        flex: 1,
      }}>
        {description}
      </p>

      {/* Link */}
      <span
        href="#"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          color: '#FFD000',
          textDecoration: 'none',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'opacity 0.2s',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.65')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {linkText || 'VIEW MORE'} ↗
      </span>
    </div>
  )
}
