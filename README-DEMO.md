# Volum: demo închiriere sonorizare + DJ

Demo de prezentare pentru un client care închiriază echipamente de sonorizare și cântă ca DJ.
Nume provizorii: **Volum** (firma) și **DJ Volum**, București.
Stack: **Astro 7 + Tailwind v4**, static, se poate urca pe Hostinger.

Design **foarte apropiat de referința clientului, [rentech.ro](https://rentech.ro/)** (cerut explicit după prima variantă):
fundal gri-albăstrui închis, Space Grotesk, titluri centrate, carduri de 16px, produse decupate pe fundalul cardului,
prețuri portocalii, badge „Disponibil”, accent mov, timeline „Pasul 1–5”, recenzii, hartă, branduri.
Accentul e un mov apropiat (`--color-primary` în `src/styles/global.css`), ușor de schimbat.
În plus față de rentech: pachete după numărul de invitați (idee de la liveaudio.ro) și pagina de evenimente DJ.

## Pagini
- `/`: hero cu căutare, categorii, cele mai închiriate, pachete (80 / 200 / 300+ invitați), cum închiriezi, secțiune DJ, recenzii, contact
- `/echipamente`: catalog cu filtre pe categorii și căutare (sinonime + specificații), sincronizat cu URL-ul (`?cat=dj&q=...`)
- `/evenimente`: pagina DJ-ului cu evenimente viitoare, verificare disponibilitate pe dată, cum lucrează la o nuntă, arhivă filtrabilă cu setup-ul folosit

## Ce funcționează în demo
- **Cererea de ofertă** (panoul din dreapta): cantități, perioadă, transport și cost estimat pe zile.
  Validează câmpurile și trimite lista pe WhatsApp. Se păstrează în `localStorage`.
- **Filtre și căutare** în catalog.
- **Verificarea disponibilității** DJ-ului: ocupat / liber, plus sâmbetele libere din următoarele 10 săptămâni.
- Meniu mobil, WhatsApp fix pe ecran.

## Ce e mock (caută `TODO(real)`)
- Datele din `src/data/*.ts` (echipamente, prețuri, stoc, pachete, evenimente, contact) sunt placeholder.
- Pozele de produs (`public/img/produse/*.webp`) sunt decupaje automate (rembg) din poze Unsplash. Pozele de eveniment sunt de pe Unsplash (`src/lib/img.ts`).
  Se înlocuiesc cu pozele clientului: la produse, ideal poze de catalog pe fundal alb, pe care le decupăm la fel.
- Numărul de WhatsApp și telefonul (`src/data/site.ts`).
- Recenziile (`src/pages/index.astro`) sunt scrise pentru demo; la real se iau de pe Google Business Profile.
- Logo-urile de branduri (`public/img/branduri/`) sunt fișierele oficiale de pe Wikimedia Commons, afișate monocrom.
- Disponibilitatea DJ-ului e calculată din lista statică de evenimente.

## La proiectul real
1. **Conținut real**: catalog complet, poze proprii (prioritate: echipamentele pe fundal neutru), logo.
2. **CMS**: Keystatic, ca clientul să editeze singur prețurile, stocul și evenimentele. Build prin GitHub Actions, deploy pe Hostinger.
   Dacă vrea stoc live și rezervări pe date, PocketBase pe VPS (Coolify).
3. **Cererea de ofertă**: salvare în backend + email prin Resend, pe lângă WhatsApp.
4. **Calendarul DJ** sincronizat cu Google Calendar.
5. **SEO local** pe „închiriere sonorizare București”, „închiriere boxe evenimente”, „DJ nuntă București” etc.,
   cu pagini pe categorie și pe tip de eveniment, `LocalBusiness` schema și Google Business Profile.
6. **Pachet legal**: cookie/GDPR, Termeni, Confidențialitate, Politica de cookies, credit RTR.

Vezi și `GOOGLE-ADS-ESTIMARE.md`.

## Rulare
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ static
```
