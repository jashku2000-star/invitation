import React from 'react';

interface OrnamentProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
  size?: number;
}

/**
 * Delicate Kyrgyz Corner Ornament (Кочкор мүйүз & сынар мүйүз мотиви)
 * Designed with fine hairlines for European luxury minimalism.
 */
export const KyrgyzCornerOrnament: React.FC<
  OrnamentProps & { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }
> = ({
  className = '',
  color = '#1B2A4A',
  secondaryColor = '#C8A97E',
  size = 56,
  position = 'top-left',
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-opacity duration-500 ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      {/* Outer subtle right-angle guide */}
      <path
        d="M2 98 L2 2 L98 2"
        stroke={secondaryColor}
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.6"
      />
      {/* Inner corner horn swirl (кочкор мүйүз) */}
      <path
        d="M6 35 C6 18, 18 6, 35 6 C50 6, 52 24, 38 24 C28 24, 28 14, 38 14"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M35 6 C18 6, 6 18, 6 35 C6 50, 24 52, 24 38 C24 28, 14 28, 14 38"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Fine diagonal jewel accent */}
      <circle cx="22" cy="22" r="2.5" fill={secondaryColor} opacity="0.9" />
      <path
        d="M10 55 C12 65, 18 72, 28 72 C38 72, 38 62, 30 62"
        stroke={secondaryColor}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M55 10 C65 12, 72 18, 72 28 C72 38, 62 38, 62 30"
        stroke={secondaryColor}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Subtle dots */}
      <circle cx="6" cy="6" r="1.5" fill={color} />
      <circle cx="48" cy="6" r="1" fill={secondaryColor} />
      <circle cx="6" cy="48" r="1" fill={secondaryColor} />
    </svg>
  );
};

/**
 * Elegant Center Divider with Kyrgyz Medallion & Fine Lines
 */
export const KyrgyzDivider: React.FC<OrnamentProps & { text?: string }> = ({
  className = '',
  color = '#1B2A4A',
  secondaryColor = '#C8A97E',
  text,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 select-none ${className}`}>
      {/* Left fine line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C8A97E]/50 to-[#1B2A4A]/40" />

      {/* Center Kyrgyz Emblem / Horn Motifs */}
      <div className="flex items-center gap-2">
        <svg
          width="40"
          height="20"
          viewBox="0 0 80 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          aria-hidden="true"
        >
          {/* Left horn */}
          <path
            d="M32 20 C24 20, 14 12, 14 4 C14 -2, 22 -2, 22 4 C22 10, 16 12, 10 12"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Right horn */}
          <path
            d="M48 20 C56 20, 66 12, 66 4 C66 -2, 58 -2, 58 4 C58 10, 64 12, 70 12"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Central diamond */}
          <rect
            x="36"
            y="16"
            width="8"
            height="8"
            transform="rotate(45 40 20)"
            fill={secondaryColor}
            stroke={color}
            strokeWidth="0.8"
          />
          <circle cx="40" cy="20" r="1.5" fill="#FAF7F2" />
        </svg>

        {text && (
          <span className="font-serif-luxury text-sm tracking-widest uppercase text-[#1B2A4A]/70 px-1">
            {text}
          </span>
        )}
      </div>

      {/* Right fine line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#C8A97E]/50 to-[#1B2A4A]/40" />
    </div>
  );
};

/**
 * Delicate Full Frame with 4 Corners for Invitation Card
 */
export const KyrgyzCardFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}> = ({ children, className = '', innerClassName = '' }) => {
  return (
    <div
      className={`relative p-5 sm:p-8 md:p-12 bg-[#FAF7F2] border border-[#C8A97E]/30 rounded-sm shadow-[0_8px_30px_rgb(22,34,56,0.06)] overflow-hidden ${className}`}
    >
      {/* 4 Corner Ornaments */}
      <div className="absolute top-2 left-2">
        <KyrgyzCornerOrnament position="top-left" size={48} />
      </div>
      <div className="absolute top-2 right-2">
        <KyrgyzCornerOrnament position="top-right" size={48} />
      </div>
      <div className="absolute bottom-2 left-2">
        <KyrgyzCornerOrnament position="bottom-left" size={48} />
      </div>
      <div className="absolute bottom-2 right-2">
        <KyrgyzCornerOrnament position="bottom-right" size={48} />
      </div>

      {/* Subtle inner hairline border */}
      <div className="absolute inset-4 border border-[#1B2A4A]/10 pointer-events-none rounded-[1px]" />

      {/* Content */}
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </div>
  );
};

/**
 * Wax Seal with initials М & Ж
 */
export const WaxSeal: React.FC<{
  initials?: string;
  onClick?: () => void;
  size?: number;
  className?: string;
}> = ({ initials = 'М & Ж', onClick, size = 68, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E] ${className}`}
      aria-label="Чакыруу баракчасын ачуу"
    >
      {/* Wax drip organic outline */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E2E4E] via-[#162238] to-[#0D1524] shadow-[0_4px_16px_rgba(22,34,56,0.4),inset_0_2px_4px_rgba(200,169,126,0.3)] border border-[#C8A97E]/40" />

      {/* Inner embossed rim */}
      <div className="absolute inset-1.5 rounded-full border border-dashed border-[#C8A97E]/50 flex items-center justify-center">
        {/* Subtle shine highlight */}
        <div className="absolute top-1 left-2 w-4 h-2 rounded-full bg-white/20 rotate-[-30deg] blur-[0.5px]" />

        {/* Initials & Kyrgyz tunduk cross */}
        <div className="text-center">
          <span className="font-serif-luxury text-sm font-semibold tracking-wider text-[#EFE4D3] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] select-none">
            {initials}
          </span>
        </div>
      </div>
    </button>
  );
};
