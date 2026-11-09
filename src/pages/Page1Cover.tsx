import React, { useRef } from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Camera, ChevronDown, Sparkles } from 'lucide-react';

interface Page1CoverProps {
  groomName: string;
  brideName: string;
  dateDisplay: string;
  photoUrl: string;
  onPhotoChange: (newUrl: string) => void;
  onNextPage: () => void;
}

export const Page1Cover: React.FC<Page1CoverProps> = ({
  groomName,
  brideName,
  dateDisplay,
  photoUrl,
  onPhotoChange,
  onNextPage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center py-8 px-4 sm:px-6">
      {/* Decorative Frame with 4 delicate Kyrgyz corner ornaments */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-[#C8A97E]/30 rounded-sm">
        <div className="absolute top-1 left-1">
          <KyrgyzCornerOrnament position="top-left" size={48} />
        </div>
        <div className="absolute top-1 right-1">
          <KyrgyzCornerOrnament position="top-right" size={48} />
        </div>
        <div className="absolute bottom-1 left-1">
          <KyrgyzCornerOrnament position="bottom-left" size={48} />
        </div>
        <div className="absolute bottom-1 right-1">
          <KyrgyzCornerOrnament position="bottom-right" size={48} />
        </div>
        {/* Subtle inner hairline */}
        <div className="absolute inset-2 sm:inset-3 border border-[#1B2A4A]/10 rounded-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center py-6 sm:py-10">
        {/* Top Kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.25em] text-[#1B2A4A]/70">
            Үйлөнүү тою
          </span>
          <span className="w-8 h-[1px] bg-[#C8A97E]/50" />
        </div>

        {/* Couple Names in High-Contrast Luxury Serif */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-[#162238] uppercase">
          {groomName} <span className="font-light text-[#C8A97E] lowercase">&amp;</span> {brideName}
        </h1>

        {/* Date Display */}
        <p className="font-serif-luxury text-base sm:text-lg tracking-[0.35em] text-[#C8A97E] uppercase mt-2 mb-6">
          {dateDisplay}
        </p>

        {/* Central Romantic Couple Photo in Editorial Oval / Frame */}
        <div className="relative my-4 group">
          {/* Subtle outer decorative ring */}
          <div className="absolute -inset-2.5 sm:-inset-3 border border-[#C8A97E]/40 rounded-t-[140px] rounded-b-[40px] pointer-events-none transition-all duration-500 group-hover:border-[#C8A97E]/70" />

          {/* Image Container */}
          <div className="relative w-64 h-80 sm:w-76 sm:h-96 md:w-84 md:h-[430px] rounded-t-[130px] rounded-b-[30px] overflow-hidden shadow-[0_16px_40px_rgba(22,34,56,0.12)] border border-[#C8A97E]/50 bg-[#F4EFE6]">
            <img
              src={photoUrl}
              alt={`${groomName} жана ${brideName}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Photo Replace overlay button */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#162238]/90 hover:bg-[#162238] text-[#FAF7F2] text-xs font-sans rounded-full shadow-md backdrop-blur-sm transition-all focus:outline-none"
                title="Сүрөттү алмаштыруу"
              >
                <Camera className="w-3.5 h-3.5 text-[#C8A97E]" />
                <span>Сүрөттү алмаштыруу</span>
              </button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Delicate divider with Kyrgyz motif */}
        <KyrgyzDivider className="my-5" />

        {/* Emotional Invitation Quote */}
        <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl italic text-[#1B2A4A]/90 max-w-lg mx-auto leading-relaxed px-4">
          «Жашообуздагы эң өзгөчө күндү сиздер менен бөлүшкүбүз келет».
        </p>

        {/* Action Button: Чакыруу баракчасын ачуу */}
        <div className="mt-8">
          <button
            type="button"
            onClick={onNextPage}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#162238] hover:bg-[#1B2A4A] active:scale-95 text-[#FAF7F2] rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-[0_6px_20px_rgba(22,34,56,0.18)] border border-[#C8A97E]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E] group"
          >
            <Sparkles className="w-4 h-4 text-[#C8A97E] transition-transform duration-300 group-hover:rotate-12" />
            <span>Чакыруу баракчасын ачуу</span>
            <ChevronDown className="w-4 h-4 text-[#C8A97E] transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
