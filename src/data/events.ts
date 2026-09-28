// Evenimente DJ Volum. TODO(real): lista reală, editabilă de client din CMS (Keystatic).
export type EventType = 'Nuntă' | 'Corporate' | 'Club' | 'Privat';

export type UpcomingEvent = {
  date: string; // ISO
  type: EventType;
  title: string;
  place: string;
  isPublic: boolean;
  time?: string;
};

export const upcoming: UpcomingEvent[] = [
  { date: '2026-10-03', type: 'Nuntă', title: 'Nuntă Irina & Paul', place: 'Snagov, Ilfov', isPublic: false },
  { date: '2026-10-09', type: 'Corporate', title: 'Petrecere de 10 ani a unei firme IT', place: 'București, Pipera', isPublic: false },
  { date: '2026-10-10', type: 'Nuntă', title: 'Nuntă Maria & Andrei', place: 'Corbeanca, Ilfov', isPublic: false },
  { date: '2026-10-17', type: 'Club', title: 'Vinyl Saturday: disco & house pe vinil', place: 'București, Centrul Vechi', isPublic: true, time: '22:00' },
  { date: '2026-10-24', type: 'Nuntă', title: 'Nuntă Ioana & Radu', place: 'Mogoșoaia, Ilfov', isPublic: false },
  { date: '2026-10-31', type: 'Club', title: 'Halloween Party', place: 'București, Floreasca', isPublic: true, time: '23:00' },
  { date: '2026-11-07', type: 'Privat', title: 'Botez Sofia', place: 'Otopeni, Ilfov', isPublic: false },
  { date: '2026-11-21', type: 'Nuntă', title: 'Nuntă Elena & Vlad', place: 'Balotești, Ilfov', isPublic: false },
  { date: '2026-12-11', type: 'Corporate', title: 'Petrecere de Crăciun (180 de angajați)', place: 'București, Băneasa', isPublic: false },
  { date: '2026-12-31', type: 'Privat', title: 'Revelion la cabană', place: 'Poiana Brașov', isPublic: false },
];

export type PastEvent = {
  id: string;
  date: string;
  type: EventType;
  title: string;
  place: string;
  guests: number;
  img: string;
  setup: string;
  quote?: string;
};

export const past: PastEvent[] = [
  {
    id: 'e1', date: '2026-09-19', type: 'Nuntă', title: 'Nuntă Ana & Mihai', place: 'Snagov, Ilfov', guests: 210,
    img: 'photo-1588963200960-44cf8e2b6fed',
    setup: '2× RCF ART 912-A · 2× KW181 · 4× moving head · fum greu',
    quote: 'Ringul a fost plin până la 4 dimineața.',
  },
  {
    id: 'e2', date: '2026-09-05', type: 'Club', title: 'Vinyl Saturday #12', place: 'București, Centrul Vechi', guests: 350,
    img: 'photo-1780491300433-988c708313d8',
    setup: '2× pick-up AT-LP120X · Pioneer XDJ-XZ',
  },
  {
    id: 'e3', date: '2026-08-29', type: 'Nuntă', title: 'Nuntă Diana & Alex', place: 'Corbeanca, Ilfov', guests: 180,
    img: 'photo-1510076857177-7470076d4098',
    setup: 'Pachet Nuntă · 8× PAR LED · fum greu',
  },
  {
    id: 'e4', date: '2026-08-15', type: 'Privat', title: 'Petrecere în grădină, 40 de ani', place: 'Pipera, Ilfov', guests: 70,
    img: 'photo-1760331339913-da9637154477',
    setup: 'Pachet Petrecere · DDJ-FLX4',
  },
  {
    id: 'e5', date: '2026-07-25', type: 'Nuntă', title: 'Nuntă Cristina & Bogdan', place: 'Mogoșoaia, Ilfov', guests: 240,
    img: 'photo-1706959718984-116bd27334f6',
    setup: '2× RCF ART 912-A · 2× KW181 · X32 Compact · formație și DJ',
    quote: 'Trecerea de la formație la DJ nu s-a simțit deloc.',
  },
  {
    id: 'e6', date: '2026-07-11', type: 'Corporate', title: 'Summer party pentru o firmă de logistică', place: 'București, Băneasa', guests: 320,
    img: 'photo-1692271931628-adc2b16670dd',
    setup: '4× HDL 6-A · 2× KW181 · tehnician sunet',
  },
  {
    id: 'e7', date: '2026-06-27', type: 'Club', title: 'Rooftop session', place: 'București, Floreasca', guests: 200,
    img: 'photo-1762092892268-157a08e29002',
    setup: 'Pioneer XDJ-XZ · 2× monitor DBR10 · 4× moving head',
  },
  {
    id: 'e8', date: '2026-06-13', type: 'Nuntă', title: 'Nuntă Andra & Cosmin', place: 'Balotești, Ilfov', guests: 160,
    img: 'photo-1536392706976-e486e2ba97af',
    setup: 'Pachet Nuntă · moving head · microfoane wireless',
  },
  {
    id: 'e9', date: '2026-05-30', type: 'Privat', title: 'Botez Matei', place: 'Otopeni, Ilfov', guests: 90,
    img: 'photo-1546632981-b8c7b3447cfb',
    setup: 'Pachet Petrecere · 4× PAR LED',
  },
];

export const eventTypes: EventType[] = ['Nuntă', 'Corporate', 'Club', 'Privat'];

const months = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const days = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm'];
export const fmtDate = (iso: string) => {
  const d = new Date(iso + 'T12:00:00');
  return { day: String(d.getDate()).padStart(2, '0'), month: months[d.getMonth()], year: d.getFullYear(), weekday: days[d.getDay()] };
};
