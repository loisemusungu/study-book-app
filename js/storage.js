// ----------------------------
// Storage Module for Favorites
// ----------------------------

// Save a book as favorite
function saveFavorite(book) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if book already saved
    if (!favorites.some(fav => fav.id === book.id)) {
        favorites.push(book);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Book added to favorites!');
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

// Export functions if using modules
export { saveFavorite, getFavorites, removeFavorite };
