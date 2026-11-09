import React, { useState, useEffect } from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { Calendar as CalendarIcon, Clock, CalendarPlus, Heart } from 'lucide-react';

interface Page4CalendarCountdownProps {
  targetTimestamp: number;
}

export const Page4CalendarCountdown: React.FC<Page4CalendarCountdownProps> = ({ targetTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  // November 2026 Calendar Grid (Monday = 1, Sunday = 7)
  // Nov 1, 2026 is Sunday, so offset is 6 empty cells on week 1
  const weekDays = ['Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш', 'Жш'];
  const emptyDaysStart = [null, null, null, null, null, null]; // 6 days before Nov 1
  const daysInNov = Array.from({ length: 30 }, (_, i) => i + 1);

  // Generate Google Calendar Link
  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent('Мундуз & Жазгүл — Үйлөнүү тою');
    const details = encodeURIComponent('Үйлөнүү сарайы (14:00) & Arzu рестораны (17:00), Бишкек шаары');
    const location = encodeURIComponent('Бишкек, Кыргызстан');
    // 2026-11-21 14:00 to 23:00 Bishkek time (UTC+6 -> UTC 08:00 to 17:00)
    const dates = '20261121T080000Z/20261121T180000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  // Download .ics file
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Munduz and Jazgul Wedding//KY
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Мундуз & Жазгүл — Үйлөнүү тою
DESCRIPTION:Үйлөнүү сарайы (14:00) жана Arzu рестораны (17:00)
LOCATION:Бишкек, Кыргызстан
DTSTART:20261121T080000Z
DTEND:20261121T180000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'munduz_jazgul_wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      <div className="relative z-10 w-full max-w-xl mx-auto text-center flex flex-col items-center px-2 py-6">
        {/* Calendar Badge */}
        <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-3 shadow-sm">
          <CalendarIcon className="w-4 h-4 text-[#C8A97E]" />
        </div>

        {/* Section title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury uppercase tracking-[0.3em] text-xs text-[#1B2A4A]/60">
            Той күнү
          </span>
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] mb-2 uppercase tracking-wide">
          Ноябрь 2026
        </h2>

        <KyrgyzDivider className="my-3" />

        {/* November 2026 Minimalist Luxury Calendar */}
        <div className="w-full max-w-md mx-auto my-3 p-4 sm:p-6 bg-[#FAF7F2] border border-[#C8A97E]/40 rounded-xl shadow-[0_8px_24px_rgba(22,34,56,0.04)]">
          {/* Weekday headers in Kyrgyz */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 pb-2 border-b border-[#C8A97E]/30">
            {weekDays.map((day, idx) => (
              <div
                key={day}
                className={`text-center font-serif-luxury text-xs sm:text-sm font-semibold tracking-wider ${
                  idx >= 5 ? 'text-[#C8A97E]' : 'text-[#1B2A4A]/70'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty slots for week 1 before Nov 1 */}
            {emptyDaysStart.map((_, i) => (
              <div key={`empty-${i}`} className="h-8 sm:h-9" />
            ))}

            {/* Days 1 to 30 */}
            {daysInNov.map((day) => {
              const isWeddingDay = day === 21;
              return (
                <div
                  key={day}
                  className="flex items-center justify-center h-8 sm:h-9"
                >
                  {isWeddingDay ? (
                    <div className="relative group">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#162238] text-[#EFE4D3] flex items-center justify-center font-serif-luxury font-bold text-sm sm:text-base shadow-md ring-2 ring-[#C8A97E] animate-pulse">
                        21
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Heart className="w-3 h-3 text-[#C8A97E] fill-[#C8A97E]" />
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`font-serif-luxury text-xs sm:text-sm text-[#1B2A4A]/70 transition-colors hover:text-[#162238]`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Under Calendar Caption */}
          <div className="mt-4 pt-3 border-t border-[#C8A97E]/30 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A97E]" />
            <p className="font-serif-luxury text-base sm:text-lg italic text-[#162238] font-medium">
              «Биздин өзгөчө күнүбүз»
            </p>
            <span className="w-2 h-2 rounded-full bg-[#C8A97E]" />
          </div>
        </div>

        {/* Live Countdown Timer Section */}
        <div className="my-4 w-full">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#C8A97E]" />
            <span className="font-serif-luxury text-sm uppercase tracking-[0.2em] text-[#1B2A4A]/70">
              Той башталганга чейин:
            </span>
          </div>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#C8A97E]/40 shadow-sm flex flex-col items-center">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal text-[#162238] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#1B2A4A]/60 font-sans mt-1">
                Күн
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#C8A97E]/40 shadow-sm flex flex-col items-center">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal text-[#162238] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#1B2A4A]/60 font-sans mt-1">
                Саат
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#C8A97E]/40 shadow-sm flex flex-col items-center">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal text-[#162238] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#1B2A4A]/60 font-sans mt-1">
                Мүнөт
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#C8A97E]/40 shadow-sm flex flex-col items-center">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal text-[#162238] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#1B2A4A]/60 font-sans mt-1">
                Секунд
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#1B2A4A]/50 mt-2 font-sans tracking-wide">
            Бишкек убактысы боюнча 14:00 (UTC+6)
          </p>
        </div>

        {/* Add to Calendar Action */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleAddToGoogleCalendar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#162238] hover:bg-[#1B2A4A] text-[#FAF7F2] rounded-full text-xs font-sans font-medium tracking-wide transition-all active:scale-95 shadow-sm"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Google Календарга кошуу</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadICS}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#1B2A4A] border border-[#C8A97E]/40 rounded-full text-xs font-sans font-medium tracking-wide transition-all active:scale-95"
          >
            <span>iCal / Apple Календарь (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
