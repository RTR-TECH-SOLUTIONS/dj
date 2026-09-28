import { equipment } from '../data/equipment';
import { packages } from '../data/packages';
import { site, waLink } from '../data/site';

// TODO(real): cererea se salvează și în backend (PocketBase/Supabase) + email Resend către depozit.
type Line = { id: string; name: string; price: number; unit?: string; img?: string };
const catalog = new Map<string, Line>([
  ...equipment.map((e) => [e.id, { id: e.id, name: e.name, price: e.price, unit: e.unit, img: e.img }] as const),
  ...packages.map((p) => [p.id, { id: p.id, name: `Pachet ${p.name} (${p.guests.toLowerCase()})`, price: p.price, unit: 'pachet' }] as const),
]);

const KEY = 'volum-cart';
type State = Record<string, number>;
const load = (): State => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};
let state: State = load();
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
};

const ron = (n: number) => `${n.toLocaleString('ro-RO')} RON`;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function addToCart(id: string) {
  if (!catalog.has(id)) return;
  state[id] = (state[id] || 0) + 1;
  save();
  render();
}

function days(from: string, to: string) {
  if (!from || !to) return 1;
  const diff = Math.round((+new Date(to) - +new Date(from)) / 86_400_000);
  return Math.max(1, diff);
}

let render = () => {};

export function initCart() {
  const dialog = document.getElementById('cart') as HTMLDialogElement;
  const form = document.getElementById('cart-form') as HTMLFormElement;
  const list = dialog.querySelector('[data-cart-list]')!;
  const empty = dialog.querySelector('[data-cart-empty]')!;
  const details = dialog.querySelector<HTMLElement>('[data-cart-details]')!;
  const err = dialog.querySelector<HTMLElement>('[data-cart-error]')!;
  const from = form.elements.namedItem('from') as HTMLInputElement;
  const to = form.elements.namedItem('to') as HTMLInputElement;
  const delivery = form.elements.namedItem('delivery') as HTMLSelectElement;

  const today = iso(new Date());
  from.min = today;
  to.min = today;

  render = () => {
    const ids = Object.keys(state).filter((id) => catalog.has(id) && state[id] > 0);
    const count = ids.reduce((n, id) => n + state[id], 0);
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.classList.toggle('hidden', count === 0);
      el.classList.toggle('grid', count > 0);
    });
    empty.classList.toggle('hidden', ids.length > 0);
    details.classList.toggle('hidden', ids.length === 0);

    list.innerHTML = ids
      .map((id) => {
        const l = catalog.get(id)!;
        return `<li class="flex items-center gap-3 py-3">
          ${l.img ? `<img src="${l.img}" alt="" width="56" height="45" class="h-12 w-14 shrink-0 rounded-lg bg-secondary object-contain p-1" />` : ''}
          <div class="min-w-0 flex-1">
            <p class="line-clamp-2 text-sm font-medium leading-snug">${l.name}</p>
            <p class="tnum text-xs text-price">${ron(l.price)} / ${l.unit ?? 'buc.'} / zi</p>
          </div>
          <div class="flex items-center rounded-lg border border-line">
            <button type="button" data-dec="${id}" class="h-8 w-8 text-muted hover:text-ink" aria-label="Scade ${l.name}">−</button>
            <span class="tnum w-6 text-center text-sm" aria-live="polite">${state[id]}</span>
            <button type="button" data-inc="${id}" class="h-8 w-8 text-muted hover:text-ink" aria-label="Crește ${l.name}">+</button>
          </div>
        </li>`;
      })
      .join('');

    const perDay = ids.reduce((s, id) => s + catalog.get(id)!.price * state[id], 0);
    const d = days(from.value, to.value);
    const del = Number(delivery.value);
    dialog.querySelector('[data-sum-day]')!.textContent = ron(perDay);
    dialog.querySelector('[data-sum-days]')!.textContent = String(d);
    dialog.querySelector('[data-sum-delivery]')!.textContent = ron(del);
    dialog.querySelector('[data-sum-total]')!.textContent = ron(perDay * d + (ids.length ? del : 0));
  };

  list.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const inc = t.closest<HTMLElement>('[data-inc]')?.dataset.inc;
    const dec = t.closest<HTMLElement>('[data-dec]')?.dataset.dec;
    if (inc) state[inc]++;
    if (dec) {
      state[dec]--;
      if (state[dec] <= 0) delete state[dec];
    }
    save();
    render();
  });

  from.addEventListener('change', () => {
    to.min = from.value || today;
    if (to.value && to.value <= from.value) {
      const n = new Date(from.value);
      n.setDate(n.getDate() + 1);
      to.value = iso(n);
    }
    render();
  });
  [to, delivery].forEach((el) => el.addEventListener('change', render));

  const open = () => {
    render();
    err.classList.add('hidden');
    dialog.showModal();
  };
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const add = t.closest<HTMLElement>('[data-add]');
    if (add) {
      addToCart(add.dataset.add!);
      const label = add.querySelector('[data-add-label]');
      if (label) {
        const prev = label.textContent;
        label.textContent = 'Adăugat';
        setTimeout(() => (label.textContent = prev), 1200);
      }
      if (add.hasAttribute('data-open')) open();
    }
    if (t.closest('[data-cart-open]')) open();
    if (t.closest('[data-cart-close]')) dialog.close();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ids = Object.keys(state).filter((id) => catalog.has(id));
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    let msg = '';
    if (!ids.length) msg = 'Adaugă cel puțin un echipament.';
    else if (!from.value || !to.value) msg = 'Alege data de ridicare și de returnare.';
    else if (name.length < 2) msg = 'Completează numele.';
    else if (!/^[0-9 +()-]{9,}$/.test(phone)) msg = 'Numărul de telefon nu pare corect.';
    if (msg) {
      err.textContent = msg;
      err.classList.remove('hidden');
      return;
    }
    err.classList.add('hidden');
    const lines = ids.map((id) => `• ${state[id]} × ${catalog.get(id)!.name}`).join('\n');
    const text = `Bună ziua, ${site.name}! Cerere de ofertă:\n${lines}\n\nPerioadă: ${from.value} până la ${to.value} (${days(from.value, to.value)} zile)\nEveniment: ${fd.get('type')}\nTransport: ${delivery.selectedOptions[0].text}\n\n${name} · ${phone}`;
    window.open(waLink(text), '_blank', 'noopener');
  });

  render();
}
