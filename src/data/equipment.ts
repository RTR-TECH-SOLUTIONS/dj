// TODO(real): catalogul real (modele, prețuri, stoc), ulterior din Keystatic / PocketBase.
// TODO(real): pozele din public/img/produse sunt decupaje provizorii; se înlocuiesc cu pozele clientului.
export type Category = 'boxe' | 'dj' | 'mixere' | 'microfoane' | 'lumini';

// keywords: sinonime pentru căutare (fără diacritice)
export const categories: { id: Category; label: string; desc: string; icon: string; keywords: string }[] = [
  { id: 'boxe', label: 'Boxe & subwoofere', desc: 'Boxe active, subwoofere, line array și monitoare', icon: 'speaker', keywords: 'boxa boxe difuzor sub subwoofer sonorizare sistem sunet pa' },
  { id: 'dj', label: 'DJ', desc: 'Controllere, sisteme all-in-one și pick-up-uri', icon: 'disc', keywords: 'dj consola controller player vinil pick-up platan' },
  { id: 'mixere', label: 'Mixere', desc: 'Mixere digitale pentru trupe și conferințe', icon: 'sliders', keywords: 'mixer mixaj consola digital' },
  { id: 'microfoane', label: 'Microfoane', desc: 'Microfoane wireless, de mână și de voce', icon: 'mic', keywords: 'microfon mic wireless fara fir' },
  { id: 'lumini', label: 'Lumini & efecte', desc: 'Moving head, proiectoare LED și efecte', icon: 'sun', keywords: 'lumina lumini efecte disco moving par' },
];

export type Item = {
  id: string;
  name: string;
  category: Category;
  price: number; // RON / zi
  stock: number; // bucăți în depozit
  unit?: string;
  desc: string;
  img: string;
  popular?: boolean;
};

const img = (id: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/img/produse/${id}.webp`;

export const equipment: Item[] = [
  { id: 'ev-zlx12p', name: 'Boxă activă Electro-Voice ZLX-12P', category: 'boxe', price: 180, stock: 8, img: img('ev-zlx12p'), popular: true,
    desc: 'Boxă activă de 12″ și 1000 W. Acoperă o sală de 80–100 de persoane, se livrează cu stativ.' },
  { id: 'rcf-art912a', name: 'Boxă activă RCF ART 912-A', category: 'boxe', price: 220, stock: 6, img: img('rcf-art912a'), popular: true,
    desc: 'Boxă de 12″ și 2100 W pentru nunți în saloane mari. Voce clară și la volum mare.' },
  { id: 'qsc-kw181', name: 'Subwoofer QSC KW181', category: 'boxe', price: 180, stock: 6, img: img('qsc-kw181'), popular: true,
    desc: 'Subwoofer activ de 18″ și 1000 W. Recomandăm câte unul lângă fiecare boxă.' },
  { id: 'rcf-hdl6a', name: 'Line array RCF HDL 6-A', category: 'boxe', price: 260, stock: 8, unit: 'modul', img: img('rcf-hdl6a'),
    desc: 'Sistem line array pentru outdoor și evenimente de peste 300 de persoane. Se închiriază cu tehnician.' },
  { id: 'yamaha-dbr10', name: 'Monitor de scenă Yamaha DBR10', category: 'boxe', price: 120, stock: 4, img: img('yamaha-dbr10'),
    desc: 'Monitor activ de 10″ pentru trupă, prezentator sau cabina DJ.' },
  { id: 'xdj-xz', name: 'Sistem DJ Pioneer XDJ-XZ', category: 'dj', price: 400, stock: 2, img: img('xdj-xz'), popular: true,
    desc: 'Sistem all-in-one cu 4 canale, cântă direct de pe stick USB. Nu mai ai nevoie de laptop.' },
  { id: 'ddj-flx4', name: 'Controller DJ Pioneer DDJ-FLX4', category: 'dj', price: 120, stock: 3, img: img('ddj-flx4'),
    desc: 'Controller cu 2 canale pentru rekordbox și Serato. Potrivit pentru petreceri private.' },
  { id: 'at-lp120', name: 'Pick-up Audio-Technica AT-LP120X', category: 'dj', price: 100, stock: 2, img: img('at-lp120'),
    desc: 'Pick-up direct drive pentru seturi pe vinil. Se livrează cu doză și slipmat.' },
  { id: 'x32-compact', name: 'Mixer digital Behringer X32 Compact', category: 'mixere', price: 250, stock: 3, img: img('x32-compact'),
    desc: 'Mixer cu 32 de canale pentru trupe live și conferințe. Îl reglezi și de pe tabletă.' },
  { id: 'mic-wireless', name: 'Microfon wireless Shure SLXD24/SM58', category: 'microfoane', price: 90, stock: 8, img: img('mic-wireless'), popular: true,
    desc: 'Microfon fără fir pentru toasturi, discursuri și prezentatori. Autonomie de 8 ore.' },
  { id: 'shure-sm58', name: 'Microfon Shure SM58', category: 'microfoane', price: 30, stock: 12, img: img('shure-sm58'),
    desc: 'Microfon dinamic cu fir, pentru trupe și pupitru. Include stativ și cablu XLR de 10 m.' },
  { id: 'shure-sm7b', name: 'Microfon de voce Shure SM7B', category: 'microfoane', price: 70, stock: 2, img: img('shure-sm7b'),
    desc: 'Pentru podcast, livestream și conferințe. Se livrează cu stativ de masă.' },
  { id: 'moving-beam', name: 'Moving head beam 7R', category: 'lumini', price: 150, stock: 8, img: img('moving-beam'), popular: true,
    desc: 'Lampă de 230 W cu control DMX. Fascicule pe ringul de dans, recomandăm câte 2 sau 4.' },
  { id: 'par-led', name: 'Proiector LED PAR 18 × 10 W', category: 'lumini', price: 40, stock: 24, img: img('par-led'),
    desc: 'Lumină ambientală RGBW pentru pereți și decor, în culorile evenimentului.' },
];
