import { getAuthorInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const authorContainer = document.getElementById('authorContainer');
    const authorName = localStorage.getItem('selectedAuthor');

    if (!authorName) {
        authorContainer.innerHTML = '<p>No author selected. Go back and select a book first.</p>';
        return;
    }

    // Show loading
    authorContainer.innerHTML = '<p>Loading author information...</p>';

    try {
        const author = await getAuthorInfo(authorName);

        // Clear loading
        authorContainer.innerHTML = '';

        // Display author info
        authorContainer.innerHTML = `
            <h2>${author.title}</h2>
            <p>${author.extract}</p>
            <p><a href="${author.pageUrl}" target="_blank">Read more on Wikipedia</a></p>
        `;

    } catch (error) {
        console.error('Error loading author info:', error);
        authorContainer.innerHTML = '<p>Error loading author information. Try again later.</p>';
    }
});
