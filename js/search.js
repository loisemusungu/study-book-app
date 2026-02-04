// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Function to start search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter a book title or author');
            return;
        }

        // Save query to localStorage
        localStorage.setItem('lastSearch', query);

        // Redirect to results page
        window.location.href = 'results.html';
    }

    // Click button to search
    searchBtn.addEventListener('click', performSearch);

    // Press Enter to search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
