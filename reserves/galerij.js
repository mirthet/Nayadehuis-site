const dialog = document.getElementById('photo-dialog');
const largePhoto = document.getElementById('large-photo');

for (const button of document.querySelectorAll('.gallery-grid .photo')) {
  button.addEventListener('click', () => {
    const img = button.querySelector('img');
    largePhoto.src = img.src;
    largePhoto.alt = img.alt;
    dialog.showModal();
  });
}

dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
