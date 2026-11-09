import React, { useRef, useState } from 'react';
import { X, Upload, RotateCcw, Check, Sparkles, Image as ImageIcon, MapPin, Users, Calendar } from 'lucide-react';
import { WeddingData, INITIAL_WEDDING_DATA } from '../types/wedding';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onUpdateData: (newData: WeddingData) => void;
  onResetData: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'photo' | 'venues' | 'guest'>('general');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const showSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateData({
            ...data,
            couplePhotoUrl: reader.result,
          });
          showSaved();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const curatedPhotos = [
    {
      title: 'Негизги портрет (Мундуз & Жазгүл)',
      url: '/src/assets/images/wedding_couple_portrait_1794235943067.jpg',
    },
    {
      title: 'Салтанаттуу гүлдөр & жасалга',
      url: '/src/assets/images/wedding_cover_landscape_1794235945998.jpg',
    },
    {
      title: 'Нике шакектери',
      url: '/src/assets/images/wedding_detail_rings_1794235944403.jpg',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#162238]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#C8A97E]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#C8A97E]/30 bg-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A97E]" />
            <h3 className="font-serif-luxury text-xl text-[#162238] font-medium">
              Чакырууну жөндөө
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFE8DC] text-[#1B2A4A]/70 hover:text-[#162238] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#C8A97E]/20 bg-[#FAF7F2] px-3 pt-2 gap-1 text-xs font-sans">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3 py-2 border-b-2 font-medium transition-all ${
              activeTab === 'general'
                ? 'border-[#162238] text-[#162238]'
                : 'border-transparent text-[#1B2A4A]/60 hover:text-[#162238]'
            }`}
          >
            Имена & Дата
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-2 border-b-2 font-medium transition-all ${
              activeTab === 'photo'
                ? 'border-[#162238] text-[#162238]'
                : 'border-transparent text-[#1B2A4A]/60 hover:text-[#162238]'
            }`}
          >
            Сүрөт
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('venues')}
            className={`px-3 py-2 border-b-2 font-medium transition-all ${
              activeTab === 'venues'
                ? 'border-[#162238] text-[#162238]'
                : 'border-transparent text-[#1B2A4A]/60 hover:text-[#162238]'
            }`}
          >
            Жайлар
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guest')}
            className={`px-3 py-2 border-b-2 font-medium transition-all ${
              activeTab === 'guest'
                ? 'border-[#162238] text-[#162238]'
                : 'border-transparent text-[#1B2A4A]/60 hover:text-[#162238]'
            }`}
          >
            Коноктор
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {savedNotice && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Өзгөртүүлөр сакталды!</span>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#1B2A4A]/70 mb-1">
                  Күйөө баланын аты
                </label>
                <input
                  type="text"
                  value={data.groomName}
                  onChange={(e) => {
                    onUpdateData({ ...data, groomName: e.target.value });
                    showSaved();
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#C8A97E]/50 rounded-lg text-sm text-[#162238] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1B2A4A]/70 mb-1">
                  Кыздын аты
                </label>
                <input
                  type="text"
                  value={data.brideName}
                  onChange={(e) => {
                    onUpdateData({ ...data, brideName: e.target.value });
                    showSaved();
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#C8A97E]/50 rounded-lg text-sm text-[#162238] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1B2A4A]/70 mb-1">
                  Дата (көрсөтүлүүсү)
                </label>
                <input
                  type="text"
                  value={data.dateDisplay}
                  onChange={(e) => {
                    onUpdateData({ ...data, dateDisplay: e.target.value });
                    showSaved();
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#C8A97E]/50 rounded-lg text-sm text-[#162238] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                />
              </div>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-medium text-[#1B2A4A]/70 mb-2">
                  Учурдагы башкы сүрөт
                </span>
                <div className="w-32 h-44 rounded-lg overflow-hidden border border-[#C8A97E]/60 shadow-sm mx-auto mb-3">
                  <img
                    src={data.couplePhotoUrl}
                    alt="Current wedding"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-[#162238] text-[#FAF7F2] rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#1B2A4A] transition-colors"
                >
                  <Upload className="w-4 h-4 text-[#C8A97E]" />
                  <span>Түзмөктөн сүрөт жүктөө</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="pt-3 border-t border-[#C8A97E]/20">
                <span className="block text-xs font-medium text-[#1B2A4A]/70 mb-2">
                  Даяр премиум сүрөттөр:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {curatedPhotos.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onUpdateData({ ...data, couplePhotoUrl: item.url });
                        showSaved();
                      }}
                      className={`h-24 rounded-md overflow-hidden border transition-all ${
                        data.couplePhotoUrl === item.url
                          ? 'border-[#162238] ring-2 ring-[#C8A97E]'
                          : 'border-[#C8A97E]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'venues' && (
            <div className="space-y-5">
              {data.venues.map((venue, idx) => (
                <div
                  key={venue.id}
                  className="p-3 bg-[#F4EFE6] rounded-xl border border-[#C8A97E]/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-luxury text-sm font-semibold text-[#162238]">
                      {idx === 0 ? '1-жай: Нике сарайы' : '2-жай: Ресторан'}
                    </span>
                    <input
                      type="text"
                      value={venue.time}
                      onChange={(e) => {
                        const newVenues = [...data.venues];
                        newVenues[idx] = { ...venue, time: e.target.value };
                        onUpdateData({ ...data, venues: newVenues });
                        showSaved();
                      }}
                      className="w-16 px-2 py-1 text-xs text-center bg-[#FAF7F2] border border-[#C8A97E]/40 rounded font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#1B2A4A]/70 mb-0.5">Аталышы</label>
                    <input
                      type="text"
                      value={venue.title}
                      onChange={(e) => {
                        const newVenues = [...data.venues];
                        newVenues[idx] = { ...venue, title: e.target.value };
                        onUpdateData({ ...data, venues: newVenues });
                        showSaved();
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#C8A97E]/40 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#1B2A4A]/70 mb-0.5">Дареги</label>
                    <input
                      type="text"
                      value={venue.address}
                      onChange={(e) => {
                        const newVenues = [...data.venues];
                        newVenues[idx] = { ...venue, address: e.target.value };
                        onUpdateData({ ...data, venues: newVenues });
                        showSaved();
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#C8A97E]/40 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#1B2A4A]/70 mb-0.5">Google Maps шилтемеси</label>
                    <input
                      type="text"
                      value={venue.googleMapsUrl}
                      onChange={(e) => {
                        const newVenues = [...data.venues];
                        newVenues[idx] = { ...venue, googleMapsUrl: e.target.value };
                        onUpdateData({ ...data, venues: newVenues });
                        showSaved();
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#C8A97E]/40 rounded font-mono text-[10px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guest' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#1B2A4A]/70 mb-1">
                  Учурдагы коноктун аты
                </label>
                <input
                  type="text"
                  value={data.guestName}
                  onChange={(e) => {
                    onUpdateData({ ...data, guestName: e.target.value });
                    showSaved();
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#C8A97E]/50 rounded-lg text-sm text-[#162238] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#1B2A4A]/70 mb-1">
                  Даяр шаблондор (басып тандаңыз):
                </span>
                <div className="flex flex-col gap-1.5">
                  {[
                    'Азамат байке менен Айнура жеңе',
                    'Кадырлуу туугандар',
                    'Урматтуу достор',
                    'Бакыт байкенин үй-бүлөсү',
                    'Ардактуу ата-энелер жана аксакалдар',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        onUpdateData({ ...data, guestName: preset });
                        showSaved();
                      }}
                      className="text-left px-3 py-2 rounded-md bg-[#F4EFE6] hover:bg-[#EFE8DC] text-xs font-serif-luxury text-[#162238] transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#C8A97E]/30 bg-[#F4EFE6] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 text-xs text-[#1B2A4A]/70 hover:text-red-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Баштапкыга кайтаруу</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#162238] text-[#FAF7F2] text-xs rounded-lg hover:bg-[#1B2A4A] transition-colors"
          >
            Даяр
          </button>
        </div>
      </div>
    </div>
  );
};
