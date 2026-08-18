# Oldal bővítés — Rólam, ajánlatkérő űrlap, hero-fix, jogi aloldalak

## Cél
A meglévő `index.html` egyoldalas weboldal bővítése négy elemmel, a jelenlegi design-nyelv (színek, tipográfia, `.ph` placeholder-minta, `rv` scroll-reveal) megtartásával.

## 1. Hero — egy képernyőre férjen
- `.hero` kapjon `min-height: 100svh` (fallback `100vh`) és `display:flex;align-items:center` a jelenlegi belső paddingek helyett, hogy a header magasságát is figyelembe véve a teljes hero tartalom (tagline, H1, lede, gombok, stat-sor, fotó) egy görgetés nélküli képernyőn elférjen.
- Mobilon (≤900px) a `hero-stats` gap és a fotó `aspect-ratio` kicsit csökken, hogy alacsonyabb (pl. 700px magas) mobil képernyőn se csússzon le tartalom — de nem cél pixel-pontos garancia minden eszközön, csak hogy tipikus desktop/laptop/mobil nézeten ne kelljen görgetni a hero megtekintéséhez.

## 2. Rólam szekció (új)
Új `<section id="rolam" class="sec">` a Szolgáltatások (`#szolgaltatasok`) és a Munkáim (`#munkak`) szekció közé.
- Kétoszlopos elrendezés (fotó bal, szöveg jobb — hasonlóan a hero-photo mintához, `.ph` placeholderrel a portréhoz).
- Jobb oldal: `kick` ("Bemutatkozás"), `sec-title` ("Rólam"), 1 bekezdés placeholder bemutatkozó szöveg, és 2–3 kiemelt szám (`hero-stats`-hoz hasonló stílusban), pl. "X év tapasztalat", "Baja és környéke".
- Nav (`header .nav-r`) és footer menü (`footer .fcol`) kap egy "Rólam" linket `#rolam`-ra.

## 3. Ajánlatkérő űrlap
A `#kapcsolat` szekció bal `cbox`-a bővül egy `<form>`-mal (a jelenlegi telefon/email linkek felett vagy alatt maradnak, mint gyors elérhetőség):
- Mezők: Név* (text), Telefon* (tel), E-mail* (email), Szolgáltatás típusa (select: Villanyszerelés / Takarítás / Felújítás / Egyéb), Helyszín/cím (text), Kívánt időpont (text vagy date), Üzenet (textarea).
- Csillagos mezők `required`.
- Form alatt egy apró megjegyzés: „Fotót a hibáról/munkáról a válasz e-mailben tudsz csatolni.”
- `submit` gombra JS összeállítja a `mailto:martinkaistvan178@gmail.com?subject=...&body=...` linket a kitöltött mezőkből, és megnyitja (`window.location.href`), nincs backend/harmadik fél szolgáltatás.
- Alapvető kliensoldali validáció a böngésző natív `required`/`type` attribútumaival, extra JS validáció nem szükséges.
- Form alatt kis szöveg + link: „Az elküldött adatok kezeléséről bővebben: Adatkezelési tájékoztató” → `adatkezeles.html`.

## 4. Jogi aloldalak
Két új, önálló HTML fájl a projekt gyökerében, azonos vizuális nyelvvel (egyszerűsített header — csak logó + "Vissza a főoldalra" link —, azonos footer), tartalom Tailwind-mentes, meglévő `<style>` újrahasznosítva egy közös minimál változatban:

- `adatkezeles.html` — Adatkezelési tájékoztató (GDPR-alapú, egyszerű nyelvezetű, az űrlap által kezelt adatokra szabva): adatkezelő megnevezése, kezelt adatok köre (név, telefon, e-mail, cím, üzenet), kezelés célja és jogalapja (ajánlatkérés megválaszolása, jogos érdek/ráutaló magatartás), megőrzési idő, adattovábbítás (nincs, mailto közvetlenül a vállalkozóhoz megy), érintetti jogok, panasz (NAIH elérhetőség), kapcsolat.
- `impresszum.html` — Szolgáltató neve, székhelye, adószáma, nyilvántartási száma, elérhetőségei. Azok a mezők, amikről nincs adat, `[KITÖLTENDŐ]` jelöléssel, jól láthatóan (pl. sárga háttérrel kiemelve), hogy a felhasználó ne felejtse el pótolni.
- A footer `fcols`-ba új `fcol` blokk: "Jogi" — linkek mindkét aloldalra.

## Nem cél
- Nincs valódi backend / e-mail-küldő szolgáltatás (Formspree stb.) integrálása.
- Nincs cookie-consent banner (az oldal nem használ analitikát/sütiket jelenleg).
- Nincs ÁSZF aloldal (a felhasználó ezt most nem kérte).

## Érintett fájlok
- `index.html` (módosítás: hero CSS, új Rólam szekció, form a kapcsolat szekcióban, nav/footer linkek, JS a mailto-linkhez)
- `adatkezeles.html` (új)
- `impresszum.html` (új)
