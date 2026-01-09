// Get current year
const currentYear = document.querySelector('#currentyear');
currentYear.textContent = new Date().getFullYear();

// Get last modified date
const lastModified = document.querySelector('#lastModified');
lastModified.textContent = `Last Modified: ${document.lastModified}`;
