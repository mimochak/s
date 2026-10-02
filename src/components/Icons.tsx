type IconProps = {
  className?: string;
};

export function OliveBranchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 52C24 40 36 24 58 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="18" cy="44" rx="7" ry="4.2" transform="rotate(-28 18 44)" fill="currentColor" />
      <ellipse cx="32" cy="34" rx="7.5" ry="4.5" transform="rotate(-32 32 34)" fill="currentColor" />
      <ellipse cx="47" cy="25" rx="8" ry="4.8" transform="rotate(-30 47 25)" fill="currentColor" />
      <circle cx="64" cy="12" r="5.5" fill="currentColor" />
      <circle cx="76" cy="18" r="5" fill="currentColor" />
      <circle cx="86" cy="9" r="4.2" fill="currentColor" />
    </svg>
  );
}

export function BottleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 80 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 8H50V28C50 32 54 34 58 38C64 44 66 52 66 62V182C66 190 59 196 51 196H29C21 196 14 190 14 182V62C14 52 16 44 22 38C26 34 30 32 30 28V8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M28 6H52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="16" y="88" width="48" height="66" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <line x1="22" y1="100" x2="58" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="112" x2="58" y2="112" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export function DiamondIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" />
    </svg>
  );
}

export function LeafCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M15 25C15 17 20 12 29 11C29 20 26 27 18 29C16.5 29.5 15.3 28 15 25Z"
        fill="currentColor"
      />
      <path d="M15 33C17 29 20 27 24 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function AwardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="18" r="11" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 10L26.2 15.2L31.8 15.7L27.6 19.3L28.9 24.8L24 21.8L19.1 24.8L20.4 19.3L16.2 15.7L21.8 15.2Z" fill="currentColor" />
      <path d="M18 27L14 40L24 35L34 40L30 27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DropletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6C24 6 36 22 36 31C36 38.2 30.6 42 24 42C17.4 42 12 38.2 12 31C12 22 24 6 24 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M18 31C18 34 20.5 36 24 36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C12 22 20 14.5 20 9A8 8 0 0 0 4 9C4 14.5 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 4H5L7.5 15.5C7.7 16.4 8.5 17 9.4 17H18C18.9 17 19.6 16.4 19.8 15.6L21.3 8.6C21.5 7.7 20.8 6.8 19.9 6.8H6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="21" r="1.4" fill="currentColor" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6L40 12V22C40 32 33 40 24 43C15 40 8 32 8 22V12L24 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M16 23L21.5 28.5L32 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M9 7H17V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 6.5L12 13L20 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 7.5L12 3L20.5 7.5V16.5L12 21L3.5 16.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 7.5L12 12M12 12L20.5 7.5M12 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13V19A2 2 0 0 1 16 21H5A2 2 0 0 1 3 19V8A2 2 0 0 1 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
