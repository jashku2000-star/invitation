/**
 * Wedding Invitation Data Models & Types
 * Мундуз & Жазгүл — 21 • 11 • 2026
 */

export interface VenueInfo {
  id: string;
  time: string;
  title: string;
  quote: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  twoGisUrl: string;
  embedQuery: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  dateDisplay: string;
  dateISO: string; // "2026-11-21T14:00:00+06:00"
  targetTimestamp: number;
  couplePhotoUrl: string;
  landscapePhotoUrl: string;
  ringsPhotoUrl: string;
  guestName: string;
  venues: VenueInfo[];
}

export const INITIAL_WEDDING_DATA: WeddingData = {
  groomName: 'Мундуз',
  brideName: 'Жазгүл',
  dateDisplay: '21 • 11 • 2026',
  dateISO: '2026-11-21T14:00:00+06:00',
  // Nov 21, 2026 at 14:00 Bishkek time (UTC+6)
  targetTimestamp: new Date('2026-11-21T14:00:00+06:00').getTime(),
  couplePhotoUrl: '/src/assets/images/wedding_couple_portrait_1794235943067.jpg',
  landscapePhotoUrl: '/src/assets/images/wedding_cover_landscape_1794235945998.jpg',
  ringsPhotoUrl: '/src/assets/images/wedding_detail_rings_1794235944403.jpg',
  guestName: 'Кадырлуу коногубуз',
  venues: [
    {
      id: 'palace',
      time: '14:00',
      title: 'Үйлөнүү сарайы',
      quote: '«Алгачкы кубанычтуу көз ирмемдерибизди сиздер менен бөлүшкүбүз келет».',
      address: 'Жусуп Абдрахманов көчөсү, 180 (Байтик Баатыр кесилиши)',
      city: 'Бишкек шаары',
      googleMapsUrl: 'https://maps.google.com/?q=Bishkek+Wedding+Palace+Abdrakhmanov+180',
      twoGisUrl: 'https://2gis.kg/bishkek/search/%D0%94%D0%B2%D0%BE%D1%80%D0%B5%D1%86%20%D0%B1%D1%80%D0%B0%D0%BA%D0%BE%D1%81%D0%BE%D1%87%D0%B5%D1%82%D0%B0%D0%BD%D0%B8%D1%8F',
      embedQuery: 'Wedding Palace Bishkek',
    },
    {
      id: 'arzu',
      time: '17:00',
      title: 'Arzu рестораны',
      quote: '«Сиздерди майрамдык кечебизде күтөбүз!»',
      address: 'Аалы Токомбаев көчөсү, 27/1 (Түштүк магистраль)',
      city: 'Бишкек шаары',
      googleMapsUrl: 'https://maps.google.com/?q=Arzu+Restaurant+Bishkek+Tokombaev+27/1',
      twoGisUrl: 'https://2gis.kg/bishkek/search/Arzu%20Grand',
      embedQuery: 'Arzu Grand Bishkek',
    },
  ],
};
