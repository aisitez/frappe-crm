import { useState } from 'react'

const BTN_SIZE = 52
const EXPANDED_WIDTH = 210

const buttons = [
  {
    id: 'whatsapp',
    label: 'WHATSAPP CHAT',
    bg: '#25D366',
    glow: '0 6px 22px rgba(37,211,102,0.55)',
    href: 'https://wa.me/919999999999',
    target: '_blank' as const,
    icon: (
      <svg viewBox="0 0 32 32" width="25" height="25" fill="white">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.46.636 4.772 1.748 6.79L2 30l7.424-1.724A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.892-1.608l-.424-.252-4.4 1.024 1.052-4.28-.276-.44A11.528 11.528 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.344-8.664c-.348-.176-2.06-1.016-2.38-1.132-.32-.116-.552-.176-.784.176s-.9 1.132-1.1 1.368c-.2.232-.404.26-.752.084-.348-.176-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.2-.348-.02-.536.152-.708.156-.156.348-.404.524-.608.172-.2.228-.348.344-.58.116-.232.056-.436-.028-.612-.084-.176-.784-1.892-1.076-2.592-.28-.676-.568-.584-.784-.596l-.668-.012c-.232 0-.608.088-.928.436s-1.22 1.192-1.22 2.908 1.248 3.372 1.42 3.604c.176.232 2.456 3.748 5.952 5.256.832.36 1.48.576 1.988.736.836.264 1.596.228 2.196.14.672-.1 2.06-.844 2.352-1.66.292-.816.292-1.516.204-1.66-.084-.152-.316-.232-.664-.408z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'EMAIL SUPPORT',
    bg: '#FF7A00',
    glow: '0 6px 22px rgba(255,122,0,0.55)',
    href: 'mailto:support@sentimentzai.com',
    target: undefined,
    icon: (
      <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'sms',
    label: 'DIRECT SMS',
    bg: '#5B4FCF',
    glow: '0 6px 22px rgba(91,79,207,0.55)',
    href: 'sms:+919999999999',
    target: undefined,
    icon: (
      <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1.2" fill="white" stroke="none" />
        <circle cx="12" cy="10" r="1.2" fill="white" stroke="none" />
        <circle cx="15" cy="10" r="1.2" fill="white" stroke="none" />
      </svg>
    ),
  },
]

export default function FloatingSidebar() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {buttons.map((btn) => {
        const active = hovered === btn.id
        return (
          <a
            key={btn.id}
            href={btn.href}
            target={btn.target}
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(btn.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: `${BTN_SIZE}px`,
              width: active ? `${EXPANDED_WIDTH}px` : `${BTN_SIZE}px`,
              background: btn.bg,
              /* Fully rounded when collapsed, left-pill when expanded */
              borderRadius: active
                ? `${BTN_SIZE / 2}px 0 0 ${BTN_SIZE / 2}px`
                : `${BTN_SIZE / 2}px`,
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              boxShadow: active
                ? btn.glow
                : '0 2px 10px rgba(0,0,0,0.18)',
              /* Margin-right so the icon circle clears the scrollbar */
              marginRight: active ? '0px' : '4px',
              transition: [
                'width 0.32s cubic-bezier(0.4,0,0.2,1)',
                'border-radius 0.32s cubic-bezier(0.4,0,0.2,1)',
                'box-shadow 0.25s ease',
                'margin-right 0.32s ease',
              ].join(', '),
            }}
          >
            {/* Icon — always leftmost, always fully visible */}
            <div
              style={{
                minWidth: `${BTN_SIZE}px`,
                width: `${BTN_SIZE}px`,
                height: `${BTN_SIZE}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {btn.icon}
            </div>

            {/* Label — fades in after width expands */}
            <span
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '1px',
                paddingRight: '18px',
                opacity: active ? 1 : 0,
                transition: active
                  ? 'opacity 0.18s ease 0.16s'
                  : 'opacity 0.1s ease',
                userSelect: 'none',
              }}
            >
              {btn.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
