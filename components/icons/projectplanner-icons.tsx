// Custom illustrative icons for projectplanner
// Inspired by McCownGordon's architectural icon style

interface IconProps {
  className?: string;
}

// Nieuwbouw - Modern building with crane element
export function NieuwbouwIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main building */}
      <rect x="16" y="24" width="24" height="28" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Windows grid */}
      <rect x="20" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="30" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="20" y="38" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="30" y="38" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Door */}
      <rect x="24" y="46" width="8" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Crane arm */}
      <line x1="44" y1="12" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="12" x2="52" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="12" x2="40" y2="18" stroke="currentColor" strokeWidth="1" />
      <line x1="44" y1="12" x2="48" y2="18" stroke="currentColor" strokeWidth="1" />

      {/* Crane hook */}
      <line x1="36" y1="12" x2="36" y2="20" stroke="currentColor" strokeWidth="1" />
      <path d="M34 20 L38 20 L36 24 Z" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Ground line */}
      <line x1="12" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth="1.5" />

      {/* Scaffolding on side */}
      <line x1="10" y1="30" x2="16" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="40" x2="16" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="24" x2="12" y2="52" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Renovatie - House with tools/renovation elements
export function RenovatieIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House base */}
      <rect x="14" y="30" width="28" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Roof */}
      <path d="M10 30 L28 14 L46 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

      {/* Chimney */}
      <rect x="36" y="18" width="6" height="10" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Window (partially removed for renovation effect) */}
      <rect x="18" y="34" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="22" y1="34" x2="22" y2="42" stroke="currentColor" strokeWidth="0.75" />
      <line x1="18" y1="38" x2="26" y2="38" stroke="currentColor" strokeWidth="0.75" />

      {/* Door */}
      <rect x="30" y="40" width="8" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="36" cy="46" r="1" fill="currentColor" />

      {/* Hammer tool */}
      <g transform="translate(44, 16) rotate(45)">
        <rect x="0" y="0" width="4" height="12" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="-2" y="12" width="8" height="3" stroke="currentColor" strokeWidth="1" fill="none" />
      </g>

      {/* Paint brush */}
      <g transform="translate(50, 36)">
        <rect x="0" y="0" width="3" height="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="-1" y="10" width="5" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="12" x2="0" y2="16" stroke="currentColor" strokeWidth="0.5" />
        <line x1="1.5" y1="12" x2="1.5" y2="16" stroke="currentColor" strokeWidth="0.5" />
        <line x1="3" y1="12" x2="3" y2="16" stroke="currentColor" strokeWidth="0.5" />
      </g>

      {/* Ground line */}
      <line x1="10" y1="52" x2="54" y2="52" stroke="currentColor" strokeWidth="1.5" />

      {/* Debris/bricks */}
      <rect x="12" y="48" width="3" height="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <rect x="8" y="50" width="4" height="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
    </svg>
  );
}

// Erfgoed - Historic building with architectural details
export function ErfgoedIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pediment (triangular top) */}
      <path d="M12 22 L32 8 L52 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

      {/* Tympanum decoration */}
      <circle cx="32" cy="17" r="3" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Entablature (horizontal band) */}
      <rect x="10" y="22" width="44" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Columns */}
      <g>
        {/* Left column */}
        <rect x="14" y="26" width="4" height="22" stroke="currentColor" strokeWidth="1" fill="none" />
        <ellipse cx="16" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <ellipse cx="16" cy="48" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />

        {/* Center-left column */}
        <rect x="24" y="26" width="4" height="22" stroke="currentColor" strokeWidth="1" fill="none" />
        <ellipse cx="26" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <ellipse cx="26" cy="48" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />

        {/* Center-right column */}
        <rect x="36" y="26" width="4" height="22" stroke="currentColor" strokeWidth="1" fill="none" />
        <ellipse cx="38" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <ellipse cx="38" cy="48" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />

        {/* Right column */}
        <rect x="46" y="26" width="4" height="22" stroke="currentColor" strokeWidth="1" fill="none" />
        <ellipse cx="48" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <ellipse cx="48" cy="48" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.75" fill="none" />
      </g>

      {/* Central door with arch */}
      <path d="M28 48 L28 36 Q32 32 36 36 L36 48" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Base/stylobate */}
      <rect x="8" y="48" width="48" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Steps */}
      <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="4" y1="55" x2="60" y2="55" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Onderhoud - Building with maintenance/repair elements
export function OnderhoudIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main building */}
      <rect x="18" y="20" width="28" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Roof */}
      <path d="M14 20 L32 10 L50 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

      {/* Windows */}
      <rect x="22" y="24" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="36" y="24" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="22" y="34" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="36" y="34" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Door */}
      <rect x="28" y="44" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Wrench tool */}
      <g transform="translate(50, 14)">
        <path
          d="M0 0 L0 14 M-3 0 Q0 -2 3 0 M-3 0 L-3 4 L3 4 L3 0"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </g>

      {/* Gear/cog */}
      <g transform="translate(8, 30)">
        <circle cx="0" cy="0" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
        {/* Gear teeth */}
        <line x1="0" y1="-5" x2="0" y2="-7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="5" y1="0" x2="7" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="5" x2="0" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-5" y1="0" x2="-7" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3.5" y1="-3.5" x2="5" y2="-5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3.5" y1="3.5" x2="5" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-3.5" y1="3.5" x2="-5" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-3.5" y1="-3.5" x2="-5" y2="-5" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* Checklist */}
      <g transform="translate(52, 36)">
        <rect x="0" y="0" width="10" height="14" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="2" y1="3" x2="8" y2="3" stroke="currentColor" strokeWidth="0.75" />
        <line x1="2" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="0.75" />
        <line x1="2" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="0.75" />
        <path d="M2 3 L3 4 L5 2" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <path d="M2 6 L3 7 L5 5" stroke="currentColor" strokeWidth="0.75" fill="none" />
      </g>

      {/* Ground line */}
      <line x1="10" y1="52" x2="54" y2="52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Particulier - Modern house with person silhouette
export function ParticulierIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House */}
      <rect x="20" y="28" width="24" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Roof */}
      <path d="M16 28 L32 14 L48 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

      {/* Chimney */}
      <rect x="38" y="18" width="5" height="8" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Window */}
      <rect x="24" y="32" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="28" y1="32" x2="28" y2="40" stroke="currentColor" strokeWidth="0.75" />
      <line x1="24" y1="36" x2="32" y2="36" stroke="currentColor" strokeWidth="0.75" />

      {/* Door */}
      <rect x="36" y="38" width="6" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="44" r="0.75" fill="currentColor" />

      {/* Person silhouette */}
      <g transform="translate(10, 34)">
        <circle cx="0" cy="0" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M0 3 L0 12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-4 8 L0 5 L4 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M0 12 L-3 18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 12 L3 18" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* Garden/grass element */}
      <path d="M18 50 Q20 46 22 50 Q24 46 26 50" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Ground line */}
      <line x1="6" y1="52" x2="54" y2="52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Bedrijf - Office building with business elements
export function BedrijfIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main building */}
      <rect x="18" y="16" width="28" height="36" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Windows grid - 3x4 */}
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={22 + col * 12}
            y={20 + row * 10}
            width="6"
            height="6"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        ))
      )}

      {/* Entrance */}
      <rect x="26" y="46" width="12" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="32" y1="46" x2="32" y2="52" stroke="currentColor" strokeWidth="1" />

      {/* Roof detail */}
      <rect x="28" y="12" width="8" height="4" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Flag/antenna */}
      <line x1="32" y1="6" x2="32" y2="12" stroke="currentColor" strokeWidth="1" />
      <path d="M32 6 L38 8 L32 10" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Briefcase */}
      <g transform="translate(48, 38)">
        <rect x="0" y="2" width="10" height="8" stroke="currentColor" strokeWidth="1" fill="none" rx="1" />
        <path d="M3 2 L3 0 L7 0 L7 2" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="0.75" />
      </g>

      {/* Ground line */}
      <line x1="10" y1="52" x2="54" y2="52" stroke="currentColor" strokeWidth="1.5" />

      {/* Parking lines */}
      <line x1="12" y1="52" x2="12" y2="56" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="52" x2="16" y2="56" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Overheid - Government building with flag
export function OverheidIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dome */}
      <path d="M24 22 Q32 10 40 22" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Dome base */}
      <rect x="22" y="22" width="20" height="4" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Flag pole on dome */}
      <line x1="32" y1="4" x2="32" y2="14" stroke="currentColor" strokeWidth="1" />
      <rect x="32" y="4" width="6" height="4" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Main building */}
      <rect x="14" y="26" width="36" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Pillars */}
      <line x1="20" y1="26" x2="20" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="26" x2="32" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="26" x2="44" y2="50" stroke="currentColor" strokeWidth="1.5" />

      {/* Central door */}
      <path d="M28 50 L28 40 Q32 36 36 40 L36 50" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Windows */}
      <rect x="16" y="32" width="4" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="44" y="32" width="4" height="6" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Steps */}
      <rect x="10" y="50" width="44" height="3" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="8" y1="53" x2="56" y2="53" stroke="currentColor" strokeWidth="1" />
      <line x1="6" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Ontwikkelaar - Blueprint/development concept
export function OntwikkelaarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blueprint paper */}
      <rect x="10" y="12" width="44" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1" />

      {/* Paper curl */}
      <path d="M54 12 L54 16 L50 12" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Building outline on blueprint */}
      <rect x="20" y="22" width="20" height="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" fill="none" />

      {/* Roof line */}
      <path d="M18 22 L30 14 L42 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" fill="none" />

      {/* Windows on blueprint */}
      <rect x="23" y="26" width="4" height="4" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <rect x="33" y="26" width="4" height="4" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <rect x="23" y="34" width="4" height="4" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <rect x="33" y="34" width="4" height="4" stroke="currentColor" strokeWidth="0.75" fill="none" />

      {/* Measurements */}
      <g>
        {/* Horizontal measurement */}
        <line x1="20" y1="48" x2="40" y2="48" stroke="currentColor" strokeWidth="0.75" />
        <line x1="20" y1="46" x2="20" y2="50" stroke="currentColor" strokeWidth="0.75" />
        <line x1="40" y1="46" x2="40" y2="50" stroke="currentColor" strokeWidth="0.75" />

        {/* Vertical measurement */}
        <line x1="44" y1="22" x2="44" y2="46" stroke="currentColor" strokeWidth="0.75" />
        <line x1="42" y1="22" x2="46" y2="22" stroke="currentColor" strokeWidth="0.75" />
        <line x1="42" y1="46" x2="46" y2="46" stroke="currentColor" strokeWidth="0.75" />
      </g>

      {/* Compass rose */}
      <g transform="translate(48, 20)">
        <circle cx="0" cy="0" r="4" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="currentColor" strokeWidth="0.5" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0 -3 L1 0 L0 1 L-1 0 Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" />
      </g>

      {/* Pencil */}
      <g transform="translate(14, 32) rotate(-45)">
        <rect x="0" y="0" width="3" height="16" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0 16 L1.5 20 L3 16" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="14" x2="3" y2="14" stroke="currentColor" strokeWidth="0.75" />
      </g>
    </svg>
  );
}
