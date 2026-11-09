
// Nayadehuis Woordenboek - zoekfunctie

const searchInput = document.getElementById("search-word");
const dictionaryCards = document.querySelectorAll(".dictionary-card");
const noResults = document.getElementById("no-results");

if (searchInput && noResults) {
    searchInput.addEventListener("input", () => {

        const searchTerm = searchInput.value.toLowerCase().trim();
        let results = 0;

        dictionaryCards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            const matches = text.includes(searchTerm);

            card.hidden = !matches;

            if (matches) {
                results++;
            }
        });

        noResults.hidden = results > 0;
    });
}
