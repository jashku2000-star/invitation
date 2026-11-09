import React from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Heart } from 'lucide-react';

interface Page2BlessingsProps {
  groomName: string;
  brideName: string;
}

export const Page2Blessings: React.FC<Page2BlessingsProps> = ({ groomName, brideName }) => {
  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      {/* Decorative Outer Border */}
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

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center px-4 py-8">
        {/* Subtle romantic motif */}
        <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-4 shadow-sm">
          <Heart className="w-4 h-4 text-[#C8A97E] fill-[#C8A97E]/20" />
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury uppercase tracking-[0.3em] text-xs text-[#1B2A4A]/60">
            Жүрөк сыры
          </span>
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] mb-3">
          Ак тилектер
        </h2>

        <KyrgyzDivider className="my-4" />

        {/* Romantic Letter Text */}
        <div className="space-y-6 my-4 text-[#1B2A4A] max-w-xl mx-auto">
          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed text-[#1B2A4A]/90 font-light italic">
            «Кээ бир жолугушуулар тагдырдын белеги болот. Эки жүрөк бир жолду тандап, бир өмүрдү бирге баштоону чечкен ушул өзгөчө күнү кубанычыбызды сиздер менен бөлүшкүбүз келет.
          </p>

          <div className="w-12 h-[1px] bg-[#C8A97E]/40 mx-auto" />

          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed text-[#1B2A4A]/90 font-light italic">
            Биздин бактыбызга күбө болуп, ак тилегиңиздерди айтып, кубанычыбызды тең бөлүшүп коюуга чакырабыз.
          </p>

          <div className="w-12 h-[1px] bg-[#C8A97E]/40 mx-auto" />

          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed text-[#162238] font-normal">
            Сиздердин келишиңиздер биз үчүн чоң сыймык жана кубаныч!»
          </p>
        </div>

        <KyrgyzDivider className="my-6" />

        {/* Signature lockup */}
        <div className="mt-2 text-center">
          <p className="font-serif-luxury text-sm tracking-[0.25em] uppercase text-[#C8A97E] mb-1">
            Чын жүрөктөн
          </p>
          <p className="font-serif-luxury text-2xl sm:text-3xl text-[#162238]">
            {groomName} &amp; {brideName}
          </p>
        </div>
      </div>
    </div>
  );
};
