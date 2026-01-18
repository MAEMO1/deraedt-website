// Custom illustrative icons for projectplanner
// Bold, professional style with good visual weight

interface IconProps {
  className?: string;
}

// Nieuwbouw - Modern building under construction
export function NieuwbouwIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Crane */}
      <path
        d="M48 8 L48 44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28 8 L54 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M48 8 L44 16 M48 8 L52 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Crane cable and hook */}
      <path
        d="M34 8 L34 18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M31 18 L37 18 L34 24 Z"
        fill="currentColor"
      />

      {/* Building */}
      <rect
        x="12"
        y="24"
        width="28"
        height="32"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Windows - filled for visual weight */}
      <rect x="16" y="28" width="8" height="6" fill="currentColor" />
      <rect x="28" y="28" width="8" height="6" fill="currentColor" />
      <rect x="16" y="38" width="8" height="6" fill="currentColor" />
      <rect x="28" y="38" width="8" height="6" fill="currentColor" />

      {/* Door */}
      <rect
        x="22"
        y="48"
        width="8"
        height="8"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Ground */}
      <line
        x1="6"
        y1="56"
        x2="58"
        y2="56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Renovatie - House with renovation tools
export function RenovatieIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House body */}
      <rect
        x="12"
        y="30"
        width="32"
        height="26"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Roof */}
      <path
        d="M8 30 L28 12 L48 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Chimney */}
      <rect
        x="36"
        y="16"
        width="6"
        height="12"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Window */}
      <rect x="16" y="36" width="10" height="8" fill="currentColor" />

      {/* Door */}
      <rect
        x="30"
        y="42"
        width="10"
        height="14"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="37" cy="50" r="1.5" fill="currentColor" />

      {/* Hammer - bold */}
      <g transform="translate(50, 12) rotate(30)">
        <rect
          x="-2"
          y="0"
          width="4"
          height="16"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="-5"
          y="14"
          width="10"
          height="5"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>

      {/* Ground */}
      <line
        x1="6"
        y1="56"
        x2="58"
        y2="56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Erfgoed - Classical heritage building
export function ErfgoedIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pediment/roof */}
      <path
        d="M8 24 L32 6 L56 24 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Entablature */}
      <rect
        x="8"
        y="24"
        width="48"
        height="5"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Columns - filled for weight */}
      <rect x="12" y="29" width="6" height="22" fill="currentColor" fillOpacity="0.8" />
      <rect x="24" y="29" width="6" height="22" fill="currentColor" fillOpacity="0.8" />
      <rect x="34" y="29" width="6" height="22" fill="currentColor" fillOpacity="0.8" />
      <rect x="46" y="29" width="6" height="22" fill="currentColor" fillOpacity="0.8" />

      {/* Column capitals */}
      <rect x="10" y="28" width="10" height="3" fill="currentColor" />
      <rect x="22" y="28" width="10" height="3" fill="currentColor" />
      <rect x="32" y="28" width="10" height="3" fill="currentColor" />
      <rect x="44" y="28" width="10" height="3" fill="currentColor" />

      {/* Base */}
      <rect
        x="6"
        y="51"
        width="52"
        height="5"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Central door arch */}
      <path
        d="M26 51 L26 40 Q32 34 38 40 L38 51"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Pediment decoration */}
      <circle cx="32" cy="15" r="4" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Onderhoud - Building with maintenance gear
export function OnderhoudIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Building */}
      <rect
        x="16"
        y="18"
        width="26"
        height="38"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Roof */}
      <path
        d="M12 18 L29 6 L46 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Windows */}
      <rect x="20" y="24" width="7" height="6" fill="currentColor" />
      <rect x="31" y="24" width="7" height="6" fill="currentColor" />
      <rect x="20" y="34" width="7" height="6" fill="currentColor" />
      <rect x="31" y="34" width="7" height="6" fill="currentColor" />

      {/* Door */}
      <rect
        x="25"
        y="46"
        width="8"
        height="10"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Gear/Cog - bold */}
      <g transform="translate(52, 32)">
        <circle cx="0" cy="0" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
        {/* Gear teeth */}
        <rect x="-2" y="-12" width="4" height="5" fill="currentColor" />
        <rect x="-2" y="7" width="4" height="5" fill="currentColor" />
        <rect x="-12" y="-2" width="5" height="4" fill="currentColor" />
        <rect x="7" y="-2" width="5" height="4" fill="currentColor" />
      </g>

      {/* Wrench */}
      <g transform="translate(50, 8)">
        <path
          d="M0 0 L0 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-4 0 Q0 -3 4 0 L4 5 L-4 5 Z"
          fill="currentColor"
        />
      </g>

      {/* Ground */}
      <line
        x1="6"
        y1="56"
        x2="48"
        y2="56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Particulier - House with person
export function ParticulierIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House body */}
      <rect
        x="18"
        y="28"
        width="28"
        height="28"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Roof */}
      <path
        d="M14 28 L32 10 L50 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Chimney */}
      <rect
        x="38"
        y="14"
        width="6"
        height="12"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Window */}
      <rect x="22" y="34" width="10" height="10" fill="currentColor" />
      <line x1="27" y1="34" x2="27" y2="44" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <line x1="22" y1="39" x2="32" y2="39" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />

      {/* Door */}
      <rect
        x="36"
        y="40"
        width="8"
        height="16"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="42" cy="48" r="1.5" fill="currentColor" />

      {/* Person - bold silhouette */}
      <g transform="translate(8, 32)">
        <circle cx="0" cy="0" r="4" fill="currentColor" />
        <path
          d="M0 4 L0 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-5 10 L0 6 L5 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 14 L-4 24 M0 14 L4 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Ground */}
      <line
        x1="2"
        y1="56"
        x2="58"
        y2="56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Bedrijf - Office building
export function BedrijfIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main building */}
      <rect
        x="14"
        y="12"
        width="30"
        height="44"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Roof structure */}
      <rect
        x="24"
        y="6"
        width="10"
        height="6"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Windows grid - filled */}
      <rect x="18" y="16" width="8" height="6" fill="currentColor" />
      <rect x="32" y="16" width="8" height="6" fill="currentColor" />
      <rect x="18" y="26" width="8" height="6" fill="currentColor" />
      <rect x="32" y="26" width="8" height="6" fill="currentColor" />
      <rect x="18" y="36" width="8" height="6" fill="currentColor" />
      <rect x="32" y="36" width="8" height="6" fill="currentColor" />

      {/* Entrance */}
      <rect
        x="24"
        y="48"
        width="10"
        height="8"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="29" y1="48" x2="29" y2="56" stroke="currentColor" strokeWidth="1.5" />

      {/* Briefcase */}
      <g transform="translate(50, 36)">
        <rect
          x="0"
          y="4"
          width="12"
          height="10"
          rx="1"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 4 L4 1 L8 1 L8 4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line x1="0" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* Ground */}
      <line
        x1="6"
        y1="56"
        x2="58"
        y2="56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Overheid - Government building with dome
export function OverheidIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dome */}
      <path
        d="M22 22 Q32 6 42 22"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Flag pole and flag */}
      <line x1="32" y1="2" x2="32" y2="12" stroke="currentColor" strokeWidth="2" />
      <rect x="32" y="2" width="8" height="5" fill="currentColor" />

      {/* Dome base */}
      <rect
        x="20"
        y="22"
        width="24"
        height="4"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Main building */}
      <rect
        x="10"
        y="26"
        width="44"
        height="26"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Pillars - bold */}
      <rect x="14" y="28" width="5" height="22" fill="currentColor" fillOpacity="0.7" />
      <rect x="30" y="28" width="5" height="22" fill="currentColor" fillOpacity="0.7" />
      <rect x="45" y="28" width="5" height="22" fill="currentColor" fillOpacity="0.7" />

      {/* Central door with arch */}
      <path
        d="M26 52 L26 40 Q32 34 38 40 L38 52"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Steps */}
      <rect
        x="6"
        y="52"
        width="52"
        height="4"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Ontwikkelaar - Blueprint with building plan
export function OntwikkelaarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blueprint paper */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="2"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Building plan outline */}
      <rect
        x="16"
        y="20"
        width="24"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* Roof plan */}
      <path
        d="M14 20 L28 10 L42 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 2"
        fill="none"
      />

      {/* Windows on plan */}
      <rect x="19" y="24" width="6" height="5" fill="currentColor" fillOpacity="0.4" />
      <rect x="31" y="24" width="6" height="5" fill="currentColor" fillOpacity="0.4" />
      <rect x="19" y="33" width="6" height="5" fill="currentColor" fillOpacity="0.4" />
      <rect x="31" y="33" width="6" height="5" fill="currentColor" fillOpacity="0.4" />

      {/* Door on plan */}
      <rect x="24" y="42" width="8" height="6" fill="currentColor" fillOpacity="0.3" />

      {/* Dimension lines */}
      <g stroke="currentColor" strokeWidth="1.5">
        <line x1="16" y1="52" x2="40" y2="52" />
        <line x1="16" y1="50" x2="16" y2="54" />
        <line x1="40" y1="50" x2="40" y2="54" />
      </g>

      {/* Compass/North indicator */}
      <g transform="translate(50, 18)">
        <circle cx="0" cy="0" r="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 -5 L2 2 L0 0 L-2 2 Z" fill="currentColor" />
        <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* Pencil */}
      <g transform="translate(48, 40)">
        <rect
          x="0"
          y="0"
          width="5"
          height="18"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M0 18 L2.5 24 L5 18"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
