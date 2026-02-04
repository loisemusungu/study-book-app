import { searchBooks } from './api.js';
import { saveFavorite } from './storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    const bookContainer = document.getElementById('bookContainer');
    const bookId = localStorage.getItem('selectedBookId');

    if (!bookId) {
        bookContainer.innerHTML = '<p>No book selected. Go back and select a book.</p>';
        return;
    }

    bookContainer.innerHTML = '<p>Loading book details...</p>';

    try {
        const query = localStorage.getItem('lastSearch') || '';
        const books = await searchBooks(query);

        const foundBook = books.find(b => b.id === bookId);
        if (!foundBook) {
            bookContainer.innerHTML = '<p>Book not found.</p>';
            return;
        }

        const book = {
            id: foundBook.id,
            title: foundBook.title,
            authors: foundBook.authors || ['Unknown author'],
            thumbnail: foundBook.thumbnail || 'default-image.png',
            description: foundBook.description || 'No description available'
        };

        // Display book details
        bookContainer.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title} cover">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> <span id="authorName">${book.authors.join(', ')}</span></p>
            <p>${book.description}</p>
            <button id="saveFavoriteBtn">Add to Favorites</button>
            <div class="notes-section">
                <h3>My Notes</h3>
                <textarea id="notesTextarea" placeholder="Write your notes here..."></textarea>
                <button id="saveNotesBtn">Save Notes</button>
            </div>
        `;

        // Save recently viewed
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        recentlyViewed = recentlyViewed.filter(b => b.id !== book.id);
        recentlyViewed.unshift(book);
        recentlyViewed = recentlyViewed.slice(0, 5);
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));

        // Load saved notes
        const savedNotes = JSON.parse(localStorage.getItem(`notes_${book.id}`)) || '';
        document.getElementById('notesTextarea').value = savedNotes;

        // Save notes
        document.getElementById('saveNotesBtn').addEventListener('click', () => {
            const notes = document.getElementById('notesTextarea').value;
            localStorage.setItem(`notes_${book.id}`, JSON.stringify(notes));
            alert('Notes saved!');
        });

        // Save favorite
        document.getElementById('saveFavoriteBtn').addEventListener('click', () => {
            saveFavorite(book);
        });

        // Click author to go to author page
        document.getElementById('authorName').addEventListener('click', () => {
            localStorage.setItem('selectedAuthor', book.authors[0]);
            window.location.href = 'author.html';
        });

    } catch (error) {
        console.error('Error loading book details:', error);
        bookContainer.innerHTML = '<p>Error loading book details. Try again later.</p>';
    }
});
