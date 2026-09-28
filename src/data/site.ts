// Nume provizorii. TODO(real): datele reale ale firmei.
export const site = {
  name: 'Volum',
  legalName: 'Volum Rental SRL',
  djName: 'DJ Volum',
  city: 'București',
  phone: '0722 000 000',
  phoneHref: 'tel:+40722000000',
  whatsapp: '40722000000',
  email: 'rezervari@volum.ro',
  address: 'Str. Fabrica de Glucoză 11, Sector 2, București',
  hours: 'Luni–Vineri 10–19 · Sâmbătă 10–14 · ridicări/returnări și duminica, cu programare',
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
