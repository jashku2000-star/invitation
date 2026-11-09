import React, { useState } from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Edit3, Share2, Check, UserCheck } from 'lucide-react';

interface Page3PersonalInviteProps {
  guestName: string;
  onGuestNameChange: (newName: string) => void;
  groomName: string;
  brideName: string;
}

export const Page3PersonalInvite: React.FC<Page3PersonalInviteProps> = ({
  guestName,
  onGuestNameChange,
  groomName,
  brideName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(guestName);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    if (tempName.trim()) {
      onGuestNameChange(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleShareWhatsApp = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('guest', guestName);

    const message = `Урматтуу ${guestName}!\n\nСизди жашообуздагы эң маанилүү күндөрдүн бири болгон үйлөнүү тоюбузга чын жүрөктөн чакырабыз.\n\nМундуз & Жазгүл 💍\n21 • 11 • 2026\n\nЖеке чакыруу баракчасын ушул шилтемеден ачыңыз:\n${currentUrl.toString()}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('guest', guestName);
    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      {/* Decorative Frame */}
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
        {/* Guest Badge icon */}
        <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-3 shadow-sm">
          <UserCheck className="w-4 h-4 text-[#C8A97E]" />
        </div>

        {/* Section kicker */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury uppercase tracking-[0.3em] text-xs text-[#1B2A4A]/60">
            Жеке кайрылуу
          </span>
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] mb-3">
          Жеке чакыруу
        </h2>

        <KyrgyzDivider className="my-3" />

        {/* Guest Name Card with Inline Edit Feature */}
        <div className="my-4 w-full max-w-md mx-auto">
          {isEditing ? (
            <div className="p-4 bg-[#F4EFE6] rounded-lg border border-[#C8A97E]/50 shadow-inner flex flex-col gap-3">
              <label htmlFor="guest-input" className="text-xs font-sans text-[#1B2A4A]/70 uppercase tracking-wider text-left">
                Коноктун атын жазыңыз:
              </label>
              <input
                id="guest-input"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Мисалы: Азамат байке менен Айнура жеңе"
                className="w-full px-3 py-2 text-base font-serif-luxury text-[#162238] bg-[#FAF7F2] border border-[#C8A97E]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-[#1B2A4A]/70 hover:text-[#1B2A4A]"
                >
                  Жокко чыгаруу
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 text-xs bg-[#162238] text-[#FAF7F2] rounded-md hover:bg-[#1B2A4A]"
                >
                  Сактоо
                </button>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 group cursor-pointer p-3 sm:px-6 rounded-xl border border-[#C8A97E]/30 bg-[#FAF7F2]/80 hover:border-[#C8A97E]/60 transition-all">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-semibold text-[#162238]">
                Урматтуу <span className="text-[#1B2A4A] underline decoration-[#C8A97E]/50 decoration-1 underline-offset-4">{guestName}</span>!
              </h3>
              <button
                type="button"
                onClick={() => {
                  setTempName(guestName);
                  setIsEditing(true);
                }}
                className="p-1.5 rounded-full hover:bg-[#EFE8DC] text-[#C8A97E] group-hover:text-[#1B2A4A] transition-colors"
                title="Атын өзгөртүү"
                aria-label="Атын өзгөртүү"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Personalized Message Body */}
        <div className="space-y-4 my-4 max-w-xl text-[#1B2A4A]">
          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed text-[#1B2A4A]/90 font-light italic">
            «Сизди жашообуздагы эң маанилүү күндөрдүн бири болгон үйлөнүү тоюбузга чын жүрөктөн чакырабыз.
          </p>

          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed text-[#162238] font-normal">
            Бул өзгөчө күнү биз менен бирге болуп, кубанычыбызды бөлүшүп коюңуз!»
          </p>
        </div>

        <KyrgyzDivider className="my-5" />

        {/* WhatsApp Personal Sharing Actions */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-sans font-medium tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp аркылуу жөнөтүү</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#1B2A4A] border border-[#C8A97E]/40 rounded-full text-xs font-sans font-medium tracking-wide transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#C8A97E]" />}
            <span>{copied ? 'Шилтеме көчүрүлдү!' : 'Жеке шилтемени көчүрүү'}</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="font-serif-luxury text-xl sm:text-2xl text-[#162238]">
            {groomName} &amp; {brideName}
          </p>
        </div>
      </div>
    </div>
  );
};
