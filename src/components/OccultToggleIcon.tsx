export default function OccultToggleIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="occult-toggle-icon"
    >
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 21.25 L6.56 4.52 L20.8 14.86 L3.2 14.86 L17.44 4.52 Z" />
    </svg>
  )
}
