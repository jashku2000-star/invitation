import React, { useState } from 'react';
import { WaxSeal, KyrgyzCornerOrnament } from './KyrgyzOrnaments';
import { Mail, Sparkles } from 'lucide-react';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  groomName: string;
  brideName: string;
  dateDisplay: string;
  guestName?: string;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  isOpen,
  onOpen,
  groomName,
  brideName,
  dateDisplay,
  guestName,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#162238]/80 backdrop-blur-md transition-all duration-700">
      <div className="relative w-full max-w-xl mx-auto select-none">
        {/* Glow ambient background behind envelope */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#C8A97E]/20 via-[#1B2A4A]/30 to-[#C8A97E]/20 rounded-2xl blur-xl opacity-70 pointer-events-none" />

        {/* Envelope Outer Shell */}
        <div
          className={`relative bg-[#FAF7F2] rounded-lg shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-[#C8A97E]/40 overflow-hidden transition-all duration-1000 transform ${
            isOpening ? 'scale-105 opacity-0 translate-y-12' : 'scale-100 opacity-100'
          }`}
          style={{ minHeight: '380px' }}
        >
          {/* Kyrgyz Corner Ornaments on Envelope corners */}
          <div className="absolute top-2 left-2 z-10">
            <KyrgyzCornerOrnament position="top-left" size={44} />
          </div>
          <div className="absolute top-2 right-2 z-10">
            <KyrgyzCornerOrnament position="top-right" size={44} />
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <KyrgyzCornerOrnament position="bottom-left" size={44} />
          </div>
          <div className="absolute bottom-2 right-2 z-10">
            <KyrgyzCornerOrnament position="bottom-right" size={44} />
          </div>

          {/* Envelope flap diagonal fold graphics */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top flap triangle with fine gold trim */}
            <svg
              className={`absolute top-0 left-0 w-full h-[60%] transition-transform duration-1000 origin-top ${
                isOpening ? 'rotate-x-180 -translate-y-8' : ''
              }`}
              viewBox="0 0 500 240"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0 L250 200 L500 0 Z"
                fill="#F4EFE6"
                stroke="#C8A97E"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
              <path
                d="M10 0 L250 190 L490 0"
                stroke="#1B2A4A"
                strokeWidth="0.8"
                strokeOpacity="0.15"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Bottom folds */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[65%]"
              viewBox="0 0 500 260"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 260 L250 120 L500 260 Z"
                fill="#FAF7F2"
                stroke="#C8A97E"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* Envelope Front Content */}
          <div className="relative z-20 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[380px]">
            {/* Subtitle */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-[#C8A97E]/60" />
              <span className="font-serif-luxury uppercase tracking-[0.25em] text-xs text-[#1B2A4A]/70">
                Үйлөнүү тоюна чакыруу
              </span>
              <span className="h-[1px] w-6 bg-[#C8A97E]/60" />
            </div>

            {/* Couple Names */}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#162238] my-2">
              {groomName} <span className="text-[#C8A97E] font-light">&amp;</span> {brideName}
            </h1>

            {/* Date */}
            <p className="font-serif-luxury text-sm tracking-[0.3em] text-[#C8A97E] uppercase mt-1 mb-4">
              {dateDisplay}
            </p>

            {/* Guest indication if present */}
            {guestName && (
              <div className="my-2 px-4 py-1.5 rounded-full border border-[#C8A97E]/30 bg-[#FAF7F2]/80 backdrop-blur-sm">
                <p className="font-serif-luxury text-sm italic text-[#1B2A4A]/90">
                  Урматтуу {guestName}
                </p>
              </div>
            )}

            {/* Center Wax Seal with Initials */}
            <div className="my-4 relative">
              <div
                className={`transition-all duration-700 transform ${
                  isOpening ? 'scale-125 rotate-45 opacity-0' : 'scale-100 hover:scale-110'
                }`}
              >
                <WaxSeal
                  initials={`${groomName[0]} & ${brideName[0]}`}
                  size={74}
                  onClick={handleOpenClick}
                />
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={handleOpenClick}
              disabled={isOpening}
              className="mt-4 inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#162238] hover:bg-[#1B2A4A] active:scale-95 text-[#FAF7F2] rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(22,34,56,0.25)] border border-[#C8A97E]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E]"
            >
              <Mail className="w-4 h-4 text-[#C8A97E]" />
              <span>{isOpening ? 'Ачылууда...' : 'Чакыруу баракчасын ачуу'}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]" />
            </button>

            <p className="text-[11px] text-[#1B2A4A]/50 mt-3 font-sans tracking-wide">
              Мөөрдү же баскычты басыңыз
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
