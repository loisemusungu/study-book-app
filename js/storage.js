// ----------------------------
// Storage Module for the Study Book App
// ----------------------------

// Save a book as favorite
function saveFavorite(book) {
    if (!book || !book.id) return; // safety check

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Prevent duplicates
    if (!favorites.some(fav => fav.id === book.id)) {
        favorites.push({
            id: book.id,
            title: book.title,
            authors: book.authors,
            thumbnail: book.thumbnail
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${book.title} added to favorites!`);
    } else {
        alert('Book is already in favorites');
    }
}

// Get all favorite books
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Remove a book from favorites
function removeFavorite(bookId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Save recently viewed books (keeps only last 5)
function saveRecentlyViewed(book) {
    if (!book || !book.id) return;

    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    // Remove book if already exists
    recentlyViewed = recentlyViewed.filter(b => b.id !== book.id);

    // Add current book to front
    recentlyViewed.unshift({
        id: book.id,
        title: book.title,
        authors: book.authors,
        thumbnail: book.thumbnail
    });

    // Keep only last 5
    recentlyViewed = recentlyViewed.slice(0, 5);

    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Save notes for a book
function saveBookNotes(bookId, notes) {
    if (!bookId) return;
    localStorage.setItem(`notes_${bookId}`, JSON.stringify(notes));
}

// Get notes for a book
function getBookNotes(bookId) {
    if (!bookId) return '';
    return JSON.parse(localStorage.getItem(`notes_${bookId}`)) || '';
}

// Export all functions
export {
    saveFavorite,
    getFavorites,
    removeFavorite,
    saveRecentlyViewed,
    saveBookNotes,
    getBookNotes
};
