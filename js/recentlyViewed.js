document.addEventListener('DOMContentLoaded', () => {
    const recentContainer = document.getElementById('recentBooks');
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (recentlyViewed.length === 0) {
        recentContainer.innerHTML = '<p>No recently viewed books.</p>';
        return;
    }

    recentlyViewed.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title} cover">
            <h4 class="book-title">${book.title}</h4>
            <p>${book.authors.join(', ')}</p>
        `;

        // Click to open book details
        card.querySelector('.book-title').addEventListener('click', () => {
            localStorage.setItem('selectedBookId', book.id);
            window.location.href = 'book.html';
        });

        recentContainer.appendChild(card);
    });
});
