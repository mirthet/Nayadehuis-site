'use strict';

/*
 * VOEG HIER JE ALBUMS TOE.
 * id: unieke korte naam, zonder spaties
 * titel: naam die bezoekers zien
 * omschrijving: korte toelichting
 * fotos: exacte bestandsnamen, inclusief extensie
 *
 * Plaats bijvoorbeeld de foto's van een huisfeest in:
 * images/galerij/huisfeest-2026/foto1.jpg
 *
 * Let op: JavaScript in de browser kan NIET automatisch alle bestanden
 * uit een lokale map uitlezen. Voeg nieuwe foto's daarom hier toe.
 */
const albums = [
  {
    id: 'HM 2026',
    titel: 'HM 2026',
    omschrijving: 'Een weer opnieuw geslaagd HM',
    fotos: [
      'images/galerij/HM_2026/Foto_1.jpeg',
      'images/galerij/HM_2026/Foto_2.jpeg',
      'images/galerij/HM_2026/Foto_3.jpeg',
      'images/galerij/HM_2026/Foto_4.jpeg'
    ]
  },{
    id: 'HM 2025',
    titel: 'HM 2025',
    omschrijving: 'Een weer opnieuw geslaagd HM',
    fotos: [
      'images/galerij/HM_2025/IMG_6698.jpeg',
      'images/galerij/HM_2025/IMG_6728.jpeg',
      'images/galerij/HM_2025/SAM_1228.jpg',
      'images/galerij/HM_2025/SAM_1257.jpg',
      'images/galerij/HM_2025/SAM_1320.jpg',
      'images/galerij/HM_2025/SAM_1324.jpg',
      'images/galerij/HM_2025/SAM_1347.jpg',
      'images/galerij/HM_2025/SAM_1373.jpg'
    ]
  }
  
  // Nieuw album? Voeg na het vorige object een komma toe en plaats bijvoorbeeld:
  // ,{
  //   id: 'huisfeest-2026',
  //   titel: 'Huisfeest 2026',
  //   omschrijving: 'De mooiste foto’s van het huisfeest.',
  //   fotos: [
  //     'images/galerij/huisfeest-2026/foto1.jpg',
  //     'images/galerij/huisfeest-2026/foto2.jpg',
  //     'images/galerij/huisfeest-2026/foto3.jpg',
  //     'images/galerij/huisfeest-2026/foto4.jpg'
  //   ]
  // }
];

const content = document.getElementById('gallery-content');
const heading = document.getElementById('gallery-title');
const subtitle = document.getElementById('gallery-subtitle');
const chosenAlbum = new URLSearchParams(window.location.search).get('album');

function photoFrame(src, alt, clickable = false) {
  const frame = document.createElement('div');
  frame.className = 'photo-frame';
  const fallback = document.createElement('span');
  fallback.className = 'photo-fallback';
  fallback.textContent = 'Foto niet gevonden';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.addEventListener('error', () => {
    img.remove();
    frame.append(fallback);
  });
  if (clickable) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Vergroot foto');
    img.addEventListener('click', () => openLightbox(src, alt));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(src, alt); }
    });
  }
  frame.append(img);
  return frame;
}

function renderOverview() {
  heading.textContent = 'Het Nayadehuis in beeld.';
  subtitle.textContent = 'Alle herinneringen, activiteiten en bijzondere momenten bij elkaar.';
  if (!albums.length) {
    content.textContent = 'Er zijn nog geen fotoalbums toegevoegd.';
    return;
  }
  const list = document.createElement('div');
  list.className = 'album-list';
  albums.forEach(album => {
    const card = document.createElement('article');
    card.className = 'album-card';
    const photos = document.createElement('div');
    photos.className = 'album-card-photos';
    const slots = [];
    for (let i = 0; i < 4; i++) {
      const frame = photoFrame(album.fotos[i % album.fotos.length] || '', album.titel);
      photos.append(frame);
      slots.push(frame);
    }
    const bottom = document.createElement('div');
    bottom.className = 'album-card-bottom';
    const text = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = album.titel;
    const desc = document.createElement('p');
    desc.textContent = `${album.omschrijving} · ${album.fotos.length} foto's`;
    text.append(title, desc);
    const link = document.createElement('a');
    link.className = 'album-button';
    link.href = `galerij.html?album=${encodeURIComponent(album.id)}`;
    link.textContent = 'Bekijk alle foto’s →';
    bottom.append(text, link);
    card.append(photos, bottom);
    list.append(card);

    // Wissel iedere 4 seconden de vier previews naar de volgende foto’s.
    // Het eerste beeld blijft statisch als er niet meer dan vier foto's zijn.
    if (album.fotos.length > 4) {
      let offset = 0;
      window.setInterval(() => {
        offset = (offset + 1) % album.fotos.length;
        slots.forEach((oldFrame, i) => {
          const newFrame = photoFrame(album.fotos[(offset + i) % album.fotos.length], album.titel);
          oldFrame.replaceWith(newFrame);
          slots[i] = newFrame;
        });
      }, 4000);
    }
  });
  content.append(list);
}

function renderAlbum(album) {
  heading.textContent = album.titel;
  subtitle.textContent = album.omschrijving;
  const back = document.createElement('a');
  back.className = 'album-back';
  back.href = 'galerij.html';
  back.textContent = '← Terug naar alle albums';
  content.append(back);
  if (!album.fotos.length) {
    const empty = document.createElement('p');
    empty.className = 'album-empty';
    empty.textContent = 'Er staan nog geen foto’s in dit album.';
    content.append(empty);
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'album-full-grid';
  album.fotos.forEach((src, i) => grid.append(photoFrame(src, `${album.titel}, foto ${i + 1}`, true)));
  content.append(grid);
}

const lightbox = document.createElement('div');
lightbox.className = 'album-lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Vergrote foto');
const close = document.createElement('button');
close.className = 'album-lightbox-close';
close.type = 'button';
close.setAttribute('aria-label', 'Sluit foto');
close.textContent = '×';
const largeImage = document.createElement('img');
lightbox.append(close, largeImage);
document.body.append(lightbox);
let previousFocus = null;
function closeLightbox() {
  lightbox.classList.remove('open');
  largeImage.removeAttribute('src');
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
function openLightbox(src, alt) {
  previousFocus = document.activeElement;
  largeImage.src = src;
  largeImage.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  close.focus();
}
close.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

if (chosenAlbum) {
  const album = albums.find(item => item.id === chosenAlbum);
  if (album) renderAlbum(album);
  else {
    heading.textContent = 'Album niet gevonden';
    subtitle.textContent = 'Dit album bestaat niet (meer).';
    const back = document.createElement('a');
    back.href = 'galerij.html';
    back.className = 'album-button';
    back.textContent = 'Terug naar alle albums';
    content.append(back);
  }
} else renderOverview();
