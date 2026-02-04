import { searchBooks, getAuthorInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const bookContainer = document.getElementById('bookContainer');
    const notesTextarea = document.getElementById('notesTextarea');
    const saveNotesBtn = document.getElementById('saveNotesBtn');

    const bookId = localStorage.getItem('selectedBookId');

    if (!bookId) {
        bookContainer.innerHTML = '<p>No book selected. Go back and select a book.</p>';
        return;
    }

    // Show loading message
    bookContainer.innerHTML = '<p>Loading book details...</p>';

    try {
        // Since Google Books API does not have a "get by ID" in our setup, fetch last search
        const query = localStorage.getItem('lastSearch') || '';
        const books = await searchBooks(query);

        // Find the book by ID
        const book = books.find(b => b.id === bookId);

        if (!book) {
            bookContainer.innerHTML = '<p>Book not found.</p>';
            return;
        }

        // Clear loading message
        bookContainer.innerHTML = '';

        // Display book details
        bookContainer.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title} cover">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> <span id="authorName">${book.authors.join(', ')}</span></p>
            <p>${book.description}</p>
            <div class="notes-section">
                <h3>My Notes</h3>
                <textarea id="notesTextarea" placeholder="Write your notes here..."></textarea>
                <button id="saveNotesBtn">Save Notes</button>
            </div>
        `;

        // Load saved notes
        const savedNotes = JSON.parse(localStorage.getItem(`notes_${book.id}`)) || '';
        document.getElementById('notesTextarea').value = savedNotes;

        // Click author name to go to author page
        document.getElementById('authorName').addEventListener('click', () => {
            localStorage.setItem('selectedAuthor', book.authors[0]);
            window.location.href = 'author.html';
        });

        // Save notes
        document.getElementById('saveNotesBtn').addEventListener('click', () => {
            const notes = document.getElementById('notesTextarea').value;
            localStorage.setItem(`notes_${book.id}`, JSON.stringify(notes));
            alert('Notes saved!');

            import { saveFavorite } from './storage.js';

// Save favorite
document.getElementById('saveFavoriteBtn').addEventListener('click', () => {
    saveFavorite(book);
});
        });

    } catch (error) {
        console.error('Error loading book details:', error);
        bookContainer.innerHTML = '<p>Error loading book details. Try again later.</p>';
    }
});
