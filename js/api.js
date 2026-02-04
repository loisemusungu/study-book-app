// api.js

// Base URL for Google Books API
const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes';

// Function to search for books by title or author
async function searchBooks(query) {
    try {
        const response = await fetch(`${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(query)}&maxResults=12`);
        const data = await response.json();

        // Map the data to only include the info we need
        const books = data.items.map(item => {
            return {
                id: item.id,
                title: item.volumeInfo.title || 'No Title',
                authors: item.volumeInfo.authors || ['Unknown Author'],
                description: item.volumeInfo.description || 'No description available',
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'images/default-book.png'
            };
        });

        return books;

    } catch (error) {
        console.error('Error fetching Google Books:', error);
        return [];
    }
}

// Function to get author info from Wikipedia
async function getAuthorInfo(authorName) {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorName)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Author page not found');
        }

        const data = await response.json();

        return {
            title: data.title,
            extract: data.extract,
            pageUrl: data.content_urls?.desktop?.page || '#'
        };

    } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        return {
            title: authorName,
            extract: 'No biography found',
            pageUrl: '#'
        };
    }
}
