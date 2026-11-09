import React, { useState } from 'react';
import { KyrgyzCornerOrnament, KyrgyzDivider } from '../components/KyrgyzOrnaments';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { VenueInfo } from '../types/wedding';

interface Page6VenuesLocationProps {
  venues: VenueInfo[];
  onUpdateVenue?: (id: string, updated: Partial<VenueInfo>) => void;
}

export const Page6VenuesLocation: React.FC<Page6VenuesLocationProps> = ({ venues }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
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

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center px-2 py-6">
        {/* Section Badge */}
        <div className="w-10 h-10 rounded-full border border-[#C8A97E]/40 bg-[#FAF7F2] flex items-center justify-center mb-3 shadow-sm">
          <MapPin className="w-4 h-4 text-[#C8A97E]" />
        </div>

        {/* Section kicker */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
          <span className="font-serif-luxury uppercase tracking-[0.3em] text-xs text-[#1B2A4A]/60">
            Даректер жана багыт
          </span>
          <span className="w-6 h-[1px] bg-[#C8A97E]/50" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#162238] mb-2">
          Кайда жолугабыз?
        </h2>

        <KyrgyzDivider className="my-4" />

        {/* 2 Distinct Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl my-4 text-left">
          {venues.map((venue, index) => {
            const isPalace = index === 0;
            // Embed URLs using official open Google Maps embed query
            const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
              venue.title + ' ' + venue.city + ' ' + venue.address
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <div
                key={venue.id}
                className="bg-[#FAF7F2] rounded-2xl border border-[#C8A97E]/40 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#C8A97E]/70"
              >
                {/* Card Header */}
                <div className="p-5 sm:p-6 border-b border-[#C8A97E]/30 bg-[#F4EFE6]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif-luxury text-xs uppercase tracking-widest text-[#C8A97E] font-medium">
                      {isPalace ? '1. Нике каттоо' : '2. Салтанаттуу кече'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#162238] text-[#FAF7F2] font-serif-luxury text-xs font-semibold tracking-wider">
                      {venue.time}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#162238]">
                    {venue.title}
                  </h3>

                  <p className="font-sans text-xs text-[#1B2A4A]/70 mt-2 flex items-start gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#C8A97E] shrink-0 mt-0.5" />
                    <span>{venue.address}, {venue.city}</span>
                  </p>
                </div>

                {/* Interactive Map Embed */}
                <div className="relative w-full h-44 sm:h-52 bg-[#EFE8DC]/60 overflow-hidden">
                  <iframe
                    title={`Google Map - ${venue.title}`}
                    width="100%"
                    height="100%"
                    src={embedSrc}
                    loading="lazy"
                    className="border-0 w-full h-full filter saturate-[0.85] contrast-[1.05]"
                  />
                  {/* Subtle map overlay badge */}
                  <div className="absolute top-2 left-2 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#C8A97E]/30 text-[10px] font-sans text-[#162238] flex items-center gap-1 shadow-xs pointer-events-none">
                    <MapPin className="w-3 h-3 text-[#C8A97E]" />
                    <span>{venue.title}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-[#FAF7F2] mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#C8A97E]/20">
                  {/* Copy Address Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(venue.id, `${venue.title}, ${venue.address}, ${venue.city}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1B2A4A]/75 hover:text-[#162238] transition-colors"
                    title="Даректи көчүрүү"
                  >
                    {copiedId === venue.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Көчүрүлдү!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C8A97E]" />
                        <span>Даректи көчүрүү</span>
                      </>
                    )}
                  </button>

                  {/* Open in Map Buttons */}
                  <div className="flex items-center gap-2">
                    {venue.twoGisUrl && (
                      <a
                        href={venue.twoGisUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#C8A97E]/40 text-[#1B2A4A] rounded-md text-xs font-sans font-medium transition-colors"
                      >
                        2GIS
                      </a>
                    )}

                    <a
                      href={venue.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#162238] hover:bg-[#1B2A4A] text-[#FAF7F2] rounded-md text-xs font-sans font-medium transition-all shadow-xs active:scale-95"
                    >
                      <span>Картаны ачуу</span>
                      <ExternalLink className="w-3 h-3 text-[#C8A97E]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <KyrgyzDivider className="my-4" />

        <p className="text-xs text-[#1B2A4A]/60 font-sans tracking-wide">
          Картадан багытты (маршрутту) түзүп алсаңыздар болот
        </p>
      </div>
    </div>
  );
};
