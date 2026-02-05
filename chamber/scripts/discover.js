import { discoveries } from '../data/discoveries.mjs';

const grid = document.getElementById('discover-grid');
const visitMessage = document.querySelector("#visit-message");

const letters = ['a','b','c','d','e','f','g','h'];

function createCard(item, idx) {
    const article = document.createElement('article');
    article.className = `card area-${letters[idx]}`;

    const h2 = document.createElement('h2');
    h2.textContent = item.title;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';
    figure.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = item.address;

    const p = document.createElement('p');
    p.textContent = item.description;

    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.textContent = 'Learn more';

    article.append(h2, figure, addr, p, btn);
    return article;
}

function buildGrid() {
    if (!grid) return;
    discoveries.forEach((d, i) => {
        grid.appendChild(createCard(d, i));
    });
}

/* ---------------- VISIT MESSAGE ---------------- */

function displayVisitMessage() {
    if (!visitMessage) return;

    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const difference = now - Number(lastVisit);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

buildGrid();
displayVisitMessage();
