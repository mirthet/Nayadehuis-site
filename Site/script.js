// Nayadehuis — mobiel navigatiemenu
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menu && links) {
    menu.addEventListener('click', () => {
        const expanded = menu.getAttribute('aria-expanded') === 'true';

        menu.setAttribute('aria-expanded', String(!expanded));
        links.classList.toggle('show', !expanded);
    });

    // Sluit het menu na het kiezen van een onderdeel.
    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            links.classList.remove('show');
            menu.setAttribute('aria-expanded', 'false');
        });
    });
}
