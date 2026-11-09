import React from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Clock, Church, UtensilsCrossed } from 'lucide-react';
import { VenueInfo } from '../types/wedding';

interface Page5MeetingPointsProps {
  venues: VenueInfo[];
}

export const Page5MeetingPoints: React.FC<Page5MeetingPointsProps> = ({ venues }) => {
  const palaceVenue = venues[0] || {
    time: '14:00',
    title: 'Үйлөнүү сарайы',
    quote: '«Алгачкы кубанычтуу көз ирмемдерибизди сиздер менен бөлүшкүбүз келет».',
  };

  const arzuVenue = venues[1] || {
    time: '17:00',
    title: 'Arzu рестораны',
    quote: '«Сиздерди майрамдык кечебизде күтөбүз!»',
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      {/* Decorative Outer Frame */}
      <div className="absolute inset-2 sm:inset-6 pointer-events-none border border-[#C8A97E]/30 rounded-sm">
        <div className="absolute top-1 left-1">
          <KyrgyzCornerOrnament position="top-left" size={52} />
        </div>
        <div className="absolute top-1 right-1">
          <KyrgyzCornerOrnament position="top-right" size={52} />
        </div>
        <div className="absolute bottom-1 left-1">
          <KyrgyzCornerOrnament position="bottom-left" size={52} />
        </div>
        <div className="absolute bottom-1 right-1">
          <KyrgyzCornerOrnament position="bottom-right" size={52} />
        </div>
        <div className="absolute inset-2 sm:inset-3 border border-[#1B2A4A]/10 rounded-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto text-center flex flex-col items-center px-4 py-8">
        {/* Section badge */}
        <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-3 shadow-sm">
          <Clock className="w-4 h-4 text-[#C8A97E]" />
        </div>

        {/* Header Kicker */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury uppercase tracking-[0.3em] text-xs text-[#1B2A4A]/60">
            Убакыт жана орундар
          </span>
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] mb-2">
          Жолугушуу жайлары
        </h2>

        <KyrgyzDivider className="my-4" />

        {/* Vertical Timeline with Fine Indigo Line */}
        <div className="relative w-full max-w-md mx-auto my-6 px-4">
          {/* Central Fine Deep-Indigo Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-[#C8A97E] via-[#162238] to-[#C8A97E] opacity-50" />

          {/* Block 1: 14:00 - Үйлөнүү сарайы */}
          <div className="relative flex flex-col items-center mb-12 group">
            {/* Minimalist Time Pill & Icon Anchor */}
            <div className="relative z-10 mb-4 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-[#162238] flex flex-col items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                <Church className="w-4 h-4 text-[#C8A97E] mb-0.5" />
                <span className="font-serif-luxury text-xs font-bold text-[#162238]">
                  {palaceVenue.time}
                </span>
              </div>
            </div>

            {/* Content Card */}
            <div className="w-full bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#C8A97E]/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#C8A97E]/60 text-center">
              <span className="font-serif-luxury text-xs uppercase tracking-widest text-[#C8A97E] font-medium">
                Расмий каттоо бөлүгү
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#162238] font-normal my-2">
                «{palaceVenue.title}»
              </h3>
              <p className="font-serif-luxury text-base sm:text-lg italic text-[#1B2A4A]/80 leading-relaxed font-light mt-2">
                {palaceVenue.quote}
              </p>
            </div>
          </div>

          {/* Block 2: 17:00 - Arzu рестораны */}
          <div className="relative flex flex-col items-center group">
            {/* Minimalist Time Pill & Icon Anchor */}
            <div className="relative z-10 mb-4 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-[#162238] flex flex-col items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                <UtensilsCrossed className="w-4 h-4 text-[#C8A97E] mb-0.5" />
                <span className="font-serif-luxury text-xs font-bold text-[#162238]">
                  {arzuVenue.time}
                </span>
              </div>
            </div>

            {/* Content Card */}
            <div className="w-full bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#C8A97E]/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#C8A97E]/60 text-center">
              <span className="font-serif-luxury text-xs uppercase tracking-widest text-[#C8A97E] font-medium">
                Салтанаттуу кече
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#162238] font-normal my-2">
                «{arzuVenue.title}»
              </h3>
              <p className="font-serif-luxury text-base sm:text-lg italic text-[#1B2A4A]/80 leading-relaxed font-light mt-2">
                {arzuVenue.quote}
              </p>
            </div>
          </div>
        </div>

        <KyrgyzDivider className="my-4" />

        <p className="text-xs text-[#1B2A4A]/60 font-sans tracking-wide">
          Сиздерди белгиленген убакытта күтөбүз
        </p>
      </div>
    </div>
  );
};
