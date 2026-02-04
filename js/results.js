// Make sure this file is treated as a module in your HTML
import { searchBooks } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('resultsContainer');
    const query = localStorage.getItem('lastSearch');

    if (!query) {
        resultsContainer.innerHTML = '<p>Please go back and enter a search.</p>';
        return;
    }

    // Show loading message
    resultsContainer.innerHTML = '<p>Loading results...</p>';

    try {
        const books = await searchBooks(query);

        if (books.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        // Clear loading message
        resultsContainer.innerHTML = '';

        // Create book cards
        books.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('book-card');

            card.innerHTML = `
                <img src="${book.thumbnail}" alt="${book.title} cover">
                <h3>${book.title}</h3>
                <p>${book.authors.join(', ')}</p>
            `;

            // Click card to go to book details page
            card.addEventListener('click', () => {
                localStorage.setItem('selectedBookId', book.id);
                window.location.href = 'book.html';
            });

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading search results:', error);
        resultsContainer.innerHTML = '<p>Error loading results. Try again later.</p>';
    }
});
