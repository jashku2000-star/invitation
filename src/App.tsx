import React, { useState, useEffect } from 'react';
import { INITIAL_WEDDING_DATA, WeddingData } from './types/wedding';
import { Page1Cover } from './pages/Page1Cover';
import { Page2Blessings } from './pages/Page2Blessings';
import { Page3PersonalInvite } from './pages/Page3PersonalInvite';
import { Page4CalendarCountdown } from './pages/Page4CalendarCountdown';
import { Page5MeetingPoints } from './pages/Page5MeetingPoints';
import { Page6VenuesLocation } from './pages/Page6VenuesLocation';
import { Page7WarmFarewell } from './pages/Page7WarmFarewell';
import { EnvelopeModal } from './components/EnvelopeModal';
import { AudioPlayer } from './components/AudioPlayer';
import { SettingsDrawer } from './components/SettingsDrawer';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  SlidersHorizontal,
  Mail,
  BookOpen,
  Scroll,
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('munduz_jazgul_wedding_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_WEDDING_DATA;
  });

  // Current page for book mode (1 to 7)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'book' | 'scroll'>('book');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(true);
  const [hasOpenedEnvelopeOnce, setHasOpenedEnvelopeOnce] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [audioTrigger, setAudioTrigger] = useState<boolean>(false);

  // Check URL parameters on mount for guest name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      setData((prev) => ({
        ...prev,
        guestName: guestParam,
      }));
    }
  }, []);

  // Save changes to localStorage
  const handleUpdateData = (newData: WeddingData) => {
    setData(newData);
    try {
      localStorage.setItem('munduz_jazgul_wedding_data', JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleResetData = () => {
    setData(INITIAL_WEDDING_DATA);
    try {
      localStorage.removeItem('munduz_jazgul_wedding_data');
    } catch {
      // ignore
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(false);
    setHasOpenedEnvelopeOnce(true);
    // Smoothly kick off romantic melody after user gesture
    setAudioTrigger(true);
  };

  const handleNextPage = () => {
    if (currentPage < 7) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShareOverall = () => {
    const currentUrl = new URL(window.location.href);
    if (data.guestName) {
      currentUrl.searchParams.set('guest', data.guestName);
    }
    const message = `Мундуз & Жазгүл — Үйлөнүү тоюна чакыруу 💍\n21 • 11 • 2026\n\nЭки жүрөк бир өмүрдү бирге баштоону чечкен ушул өзгөчө күнү кубанычыбызды сиздер менен бөлүшкүбүз келет!\n\nТолук чакыруу баракчасын ушул жерден ачыңыз:\n${currentUrl.toString()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const pageTitles = [
    'Башкы бет',
    'Ак тилектер',
    'Жеке чакыруу',
    'Календарь',
    'Жолугушуу',
    'Даректер',
    'Коштошуу',
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#162238] flex flex-col font-sans-clean selection:bg-[#EFE4D3] selection:text-[#162238]">
      {/* Envelope Modal Unboxing Experience */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onOpen={handleOpenEnvelope}
        groomName={data.groomName}
        brideName={data.brideName}
        dateDisplay={data.dateDisplay}
        guestName={data.guestName}
      />

      {/* Luxury Minimalist Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8A97E]/30 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Brand Zone: 1-Line Monogram / Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCurrentPage(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif-luxury text-lg sm:text-xl font-normal tracking-wider text-[#162238] whitespace-nowrap block">
                {data.groomName} <span className="text-[#C8A97E]">&amp;</span> {data.brideName}
              </span>
            </button>
            <span className="hidden md:inline text-xs font-serif-luxury uppercase tracking-[0.2em] text-[#C8A97E] border-l border-[#C8A97E]/40 pl-3">
              {data.dateDisplay}
            </span>
          </div>

          {/* Nav Links / Page Chapters */}
          <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-wider text-[#1B2A4A]/70 font-medium whitespace-nowrap">
            {pageTitles.map((title, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum && viewMode === 'book';
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => {
                    setViewMode('book');
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`hover:text-[#162238] transition-colors py-1 relative ${
                    isActive ? 'text-[#162238] font-semibold' : ''
                  }`}
                >
                  {title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8A97E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle (Book pages vs Continuous Scroll) */}
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'book' ? 'scroll' : 'book')}
              className="p-2 rounded-full hover:bg-[#EFE8DC] text-[#1B2A4A]/80 transition-colors"
              title={viewMode === 'book' ? 'Толук түрмөк режимине өтүү' : 'Барактоо режимине өтүү'}
              aria-label="Режимди өзгөртүү"
            >
              {viewMode === 'book' ? (
                <Scroll className="w-4 h-4 text-[#C8A97E]" />
              ) : (
                <BookOpen className="w-4 h-4 text-[#162238]" />
              )}
            </button>

            {/* Re-open envelope button */}
            <button
              type="button"
              onClick={() => setIsEnvelopeOpen(true)}
              className="p-2 rounded-full hover:bg-[#EFE8DC] text-[#1B2A4A]/80 transition-colors"
              title="Конвертти кайра ачуу"
              aria-label="Конвертти кайра ачуу"
            >
              <Mail className="w-4 h-4 text-[#C8A97E]" />
            </button>

            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={handleShareOverall}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-medium shadow-xs transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Settings Drawer Button */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-[#EFE8DC] text-[#1B2A4A]/80 transition-colors"
              title="Чакырууну жөндөө (сүрөттөр, коноктун аты)"
              aria-label="Чакырууну жөндөө"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#162238]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-2 sm:px-4 py-4 sm:py-6 relative">
        {viewMode === 'book' ? (
          /* Book Mode: Single Page with smooth transitions and bottom pagination */
          <div className="relative">
            {/* Page Render according to currentPage */}
            <div className="transition-opacity duration-500 ease-in-out">
              {currentPage === 1 && (
                <Page1Cover
                  groomName={data.groomName}
                  brideName={data.brideName}
                  dateDisplay={data.dateDisplay}
                  photoUrl={data.couplePhotoUrl}
                  onPhotoChange={(url) => handleUpdateData({ ...data, couplePhotoUrl: url })}
                  onNextPage={handleNextPage}
                />
              )}

              {currentPage === 2 && (
                <Page2Blessings
                  groomName={data.groomName}
                  brideName={data.brideName}
                />
              )}

              {currentPage === 3 && (
                <Page3PersonalInvite
                  guestName={data.guestName}
                  onGuestNameChange={(name) => handleUpdateData({ ...data, guestName: name })}
                  groomName={data.groomName}
                  brideName={data.brideName}
                />
              )}

              {currentPage === 4 && (
                <Page4CalendarCountdown
                  targetTimestamp={data.targetTimestamp}
                />
              )}

              {currentPage === 5 && (
                <Page5MeetingPoints
                  venues={data.venues}
                />
              )}

              {currentPage === 6 && (
                <Page6VenuesLocation
                  venues={data.venues}
                />
              )}

              {currentPage === 7 && (
                <Page7WarmFarewell
                  groomName={data.groomName}
                  brideName={data.brideName}
                  dateDisplay={data.dateDisplay}
                  ringsPhotoUrl={data.ringsPhotoUrl}
                  onScrollToTop={() => setCurrentPage(1)}
                  guestName={data.guestName}
                />
              )}
            </div>

            {/* Bottom Book Navigation Bar */}
            <div className="sticky bottom-4 z-30 max-w-md mx-auto mt-6 px-4">
              <div className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[#C8A97E]/40 rounded-full shadow-[0_4px_20px_rgba(22,34,56,0.1)] px-4 py-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-serif-luxury ${
                    currentPage === 1
                      ? 'text-[#1B2A4A]/20 cursor-not-allowed'
                      : 'text-[#162238] hover:bg-[#EFE8DC]'
                  }`}
                  aria-label="Мурунку барак"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Мурунку</span>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {pageTitles.map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          currentPage === pageNum
                            ? 'w-5 h-2 bg-[#162238]'
                            : 'w-2 h-2 bg-[#C8A97E]/50 hover:bg-[#C8A97E]'
                        }`}
                        title={pageTitles[idx]}
                        aria-label={`Барак ${pageNum}`}
                      />
                    );
                  })}
                  <span className="font-serif-luxury text-xs text-[#1B2A4A]/60 ml-2">
                    {currentPage} / 7
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === 7}
                  className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-serif-luxury ${
                    currentPage === 7
                      ? 'text-[#1B2A4A]/20 cursor-not-allowed'
                      : 'text-[#162238] hover:bg-[#EFE8DC]'
                  }`}
                  aria-label="Кийинки барак"
                >
                  <span className="hidden sm:inline">Кийинки</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Continuous Editorial Scroll Mode */
          <div className="space-y-16">
            <Page1Cover
              groomName={data.groomName}
              brideName={data.brideName}
              dateDisplay={data.dateDisplay}
              photoUrl={data.couplePhotoUrl}
              onPhotoChange={(url) => handleUpdateData({ ...data, couplePhotoUrl: url })}
              onNextPage={() => {
                const el = document.getElementById('page-blessings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <div id="page-blessings">
              <Page2Blessings
                groomName={data.groomName}
                brideName={data.brideName}
              />
            </div>

            <div id="page-personal">
              <Page3PersonalInvite
                guestName={data.guestName}
                onGuestNameChange={(name) => handleUpdateData({ ...data, guestName: name })}
                groomName={data.groomName}
                brideName={data.brideName}
              />
            </div>

            <div id="page-calendar">
              <Page4CalendarCountdown
                targetTimestamp={data.targetTimestamp}
              />
            </div>

            <div id="page-meeting">
              <Page5MeetingPoints
                venues={data.venues}
              />
            </div>

            <div id="page-venues">
              <Page6VenuesLocation
                venues={data.venues}
              />
            </div>

            <div id="page-farewell">
              <Page7WarmFarewell
                groomName={data.groomName}
                brideName={data.brideName}
                dateDisplay={data.dateDisplay}
                ringsPhotoUrl={data.ringsPhotoUrl}
                onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                guestName={data.guestName}
              />
            </div>
          </div>
        )}
      </main>

      {/* Acoustic Romantic Ambient Music Player */}
      <AudioPlayer autoStartTrigger={audioTrigger} />

      {/* Settings / Personalization Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        onResetData={handleResetData}
      />
    </div>
  );
}
