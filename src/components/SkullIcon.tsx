export default function SkullIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="skull-icon"
      style={{ filter: 'drop-shadow(0 0 6px rgba(255,60,50,0.75))' }}
    >
      <g stroke="#7A1F14" strokeWidth="0.6">
        <g transform="rotate(45 12 12)">
          <rect x="1" y="10.9" width="22" height="2.2" rx="1.1" fill="#F3D9C9" />
          <circle cx="1" cy="12" r="2.1" fill="#F3D9C9" />
          <circle cx="23" cy="12" r="2.1" fill="#F3D9C9" />
        </g>
        <g transform="rotate(-45 12 12)">
          <rect x="1" y="10.9" width="22" height="2.2" rx="1.1" fill="#F3D9C9" />
          <circle cx="1" cy="12" r="2.1" fill="#F3D9C9" />
          <circle cx="23" cy="12" r="2.1" fill="#F3D9C9" />
        </g>
      </g>

      <g fill="#3A0A0A" stroke="#FF6B4A" strokeWidth="0.8" strokeLinejoin="round">
        <path d="M14.8 3.4 Q16.6 1.0, 19.0 0.7 Q18.9 2.6, 17.6 3.9 Q16.4 3.8, 14.8 3.4 Z" />
        <path d="M9.2 3.4 Q7.4 1.0, 5.0 0.7 Q5.1 2.6, 6.4 3.9 Q7.6 3.8, 9.2 3.4 Z" />
      </g>

      <path
        d="M12 1.5 C16.8 1.5 20 4.6 20 9 C20 11.7 18.9 14 16.6 15.3 C17 16.2 17.3 17.2 17.3 18.2 C17.3 19.6 16.2 20.4 14.6 20.5 C13.6 20.9 12 21 12 21 C12 21 10.4 20.9 9.4 20.5 C7.8 20.4 6.7 19.6 6.7 18.2 C6.7 17.2 7 16.2 7.4 15.3 C5.1 14 4 11.7 4 9 C4 4.6 7.2 1.5 12 1.5 Z"
        fill="#3A0A0A"
        stroke="#FF6B4A"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      <g stroke="rgba(255,107,74,0.45)" strokeWidth="0.7" strokeLinecap="round">
        <path d="M12 4.2 L12 7 M8.6 6 L10.4 7 M15.4 6 L13.6 7 M11 3.6 L10 5.4 M13 3.6 L14 5.4" />
      </g>
      <path
        d="M12 8.4 C11.4 8.4 10.9 8.7 10.5 9.2"
        stroke="rgba(255,107,74,0.35)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />

      <path
        d="M9.6 9.0 C8.2 8.3, 6.8 8.8, 6.3 10.6 C5.9 12.0, 7.0 12.9, 8.4 12.5 C9.6 12.2, 10.1 10.2, 9.6 9.0 Z"
        fill="#FF3B30"
        stroke="#FF7B6A"
        strokeWidth="0.5"
      />
      <path
        d="M8.1 10.0 L8.6 11.0 L8.1 12.2 L7.6 11.0 Z"
        fill="#0A0000"
      />
      <path
        d="M14.4 9.0 C15.8 8.3, 17.2 8.8, 17.7 10.6 C18.1 12.0, 17.0 12.9, 15.6 12.5 C14.4 12.2, 13.9 10.2, 14.4 9.0 Z"
        fill="#FF3B30"
        stroke="#FF7B6A"
        strokeWidth="0.5"
      />
      <path
        d="M15.9 10.0 L15.4 11.0 L15.9 12.2 L16.4 11.0 Z"
        fill="#0A0000"
      />

      <path
        d="M12 11.6 C13.1 13.0, 13.5 14.3, 12 14.9 C10.5 14.3, 10.9 13.0, 12 11.6 Z"
        fill="#1F0303"
      />

      <path
        d="M7.6 15.2 C7.2 18.6, 9.8 20.2, 12 20.2 C14.2 20.2, 16.8 18.6, 16.4 15.2 C15.2 16.6, 13.6 17.4, 12 17.4 C10.4 17.4, 8.8 16.6, 7.6 15.2 Z"
        fill="#0A0000"
        stroke="rgba(255,107,74,0.45)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
