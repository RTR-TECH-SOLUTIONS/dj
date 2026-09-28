// Pachete după numărul de invitați (idee preluată din piață: liveaudio.ro).
export type Package = {
  id: string;
  name: string;
  guests: string;
  price: number;
  items: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: 'pachet-80',
    name: 'Petrecere',
    guests: 'Până la 80 de invitați',
    price: 550,
    items: ['2 × boxă EV ZLX-12P pe stativ', '1 × subwoofer QSC KW181', '1 × microfon wireless', 'Cabluri și prelungitoare'],
  },
  {
    id: 'pachet-200',
    name: 'Nuntă',
    guests: '150–220 de invitați',
    price: 1150,
    items: ['2 × boxă RCF ART 912-A', '2 × subwoofer QSC KW181', '1 × mixer digital X32 Compact', '2 × microfon wireless', '8 × proiector LED pentru decor'],
    featured: true,
  },
  {
    id: 'pachet-400',
    name: 'Eveniment mare',
    guests: 'Peste 300 de persoane / outdoor',
    price: 2400,
    items: ['4 × line array RCF HDL 6-A', '2 × subwoofer QSC KW181', '1 × mixer digital X32 Compact', '2 × monitor de scenă', 'Tehnician de sunet toată seara'],
  },
];
