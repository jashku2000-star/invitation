import React from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Heart, ArrowUp, Share2 } from 'lucide-react';

interface Page7WarmFarewellProps {
  groomName: string;
  brideName: string;
  dateDisplay: string;
  ringsPhotoUrl: string;
  onScrollToTop: () => void;
  guestName?: string;
}

export const Page7WarmFarewell: React.FC<Page7WarmFarewellProps> = ({
  groomName,
  brideName,
  dateDisplay,
  ringsPhotoUrl,
  onScrollToTop,
  guestName,
}) => {
  const handleShareWhatsApp = () => {
    const currentUrl = new URL(window.location.href);
    if (guestName) {
      currentUrl.searchParams.set('guest', guestName);
    }
    const message = `Мундуз & Жазгүл — Үйлөнүү тою 💍\n21 • 11 • 2026\n\nБиздин бактыбызга күбө болуп, ак тилегиңиздерди айтып коюуга чакырабыз!\n${currentUrl.toString()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      {/* Decorative Outer Border */}
      <div className="absolute inset-2 sm:inset-6 pointer-events-none border border-[#C8A97E]/30 rounded-sm">
        <div className="absolute top-1 left-1">
          <KyrgyzCornerOrnament position="top-left" size={56} />
        </div>
        <div className="absolute top-1 right-1">
          <KyrgyzCornerOrnament position="top-right" size={56} />
        </div>
        <div className="absolute bottom-1 left-1">
          <KyrgyzCornerOrnament position="bottom-left" size={56} />
        </div>
        <div className="absolute bottom-1 right-1">
          <KyrgyzCornerOrnament position="bottom-right" size={56} />
        </div>
        <div className="absolute inset-2 sm:inset-3 border border-[#1B2A4A]/10 rounded-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center px-4 py-8">
        {/* Detail rings photo circle */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#C8A97E]/50 shadow-[0_8px_24px_rgba(22,34,56,0.1)] mb-6 group">
          <img
            src={ringsPhotoUrl}
            alt="Нике шакектери"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Delicate Heart badge */}
        <div className="w-8 h-8 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#C8A97E] fill-[#C8A97E]/30" />
        </div>

        {/* Large Emotional Farewell Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] max-w-xl mx-auto leading-tight">
          «Сиздер менен жолугушууну чыдамсыздык менен күтөбүз!»
        </h2>

        <KyrgyzDivider className="my-6" />

        {/* Respectful Signature Block */}
        <div className="my-4 text-center">
          <p className="font-serif-luxury text-base sm:text-lg italic text-[#1B2A4A]/70 mb-2">
            Урматтоо менен,
          </p>
          <p className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#162238] font-normal tracking-wide">
            {groomName} &amp; {brideName}
          </p>
          <p className="font-serif-luxury text-sm tracking-[0.35em] text-[#C8A97E] uppercase mt-3">
            {dateDisplay}
          </p>
        </div>

        <KyrgyzDivider className="my-6" />

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-sans font-medium tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp аркылуу бөлүшүү</span>
          </button>

          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#1B2A4A] border border-[#C8A97E]/40 rounded-full text-xs font-sans font-medium tracking-wide transition-all active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Башына кайтуу</span>
          </button>
        </div>

        {/* Delicate Bottom Note */}
        <p className="text-[11px] font-serif-luxury text-[#1B2A4A]/50 tracking-wider uppercase mt-8">
          Бишкек • 2026
        </p>
      </div>
    </div>
  );
};
