import { getFavorites, removeFavorite } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favoritesContainer');

    function renderFavorites() {
        const favorites = getFavorites();

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>No favorite books yet.</p>';
            return;
        }

        favoritesContainer.innerHTML = '';

        favorites.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('book-card');

            card.innerHTML = `
                <img src="${book.thumbnail}" alt="${book.title} cover">
                <h3>${book.title}</h3>
                <p>${book.authors.join(', ')}</p>
                <button class="removeBtn">Remove</button>
            `;

            // Click to view book details
            card.querySelector('h3').addEventListener('click', () => {
                localStorage.setItem('selectedBookId', book.id);
                window.location.href = 'book.html';
            });

            // Remove favorite
            card.querySelector('.removeBtn').addEventListener('click', () => {
                removeFavorite(book.id);
                renderFavorites(); // refresh list
            });

            favoritesContainer.appendChild(card);
        });
    }

    renderFavorites();
});
