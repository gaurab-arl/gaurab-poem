import { poems } from './poems.js';
import { render, searchfilter } from './main.js';
import { pagination_container } from './data.js';

let perpage = 10;
let currentpage = 1;
let startpage = 0;
let endpage = 0;
let noofpages = Math.ceil(poems.length / perpage);

const previous = document.createElement('button');
const next = document.createElement('button');

export function updatePoems() {
    const filtered = searchfilter();

    noofpages = Math.ceil(filtered.length / perpage);

    // Clamp current page
    if (currentpage < 1) currentpage = 1;
    if (currentpage > noofpages) currentpage = noofpages || 1;

    startpage = (currentpage - 1) * perpage;
    endpage = startpage + perpage;

    const visiblePoems = filtered.slice(startpage, endpage);
    render(visiblePoems);

    const poemsGrid = document.querySelector(".poems-grid");
    if (poemsGrid) {
        poemsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    pagination();
}

updatePoems();

function pagination() {
    if (!pagination_container) {
        console.error('pagination_container not found');
        return;
    }

    pagination_container.innerHTML = "";

    previous.textContent = "Previous";
    next.textContent = "Next";

    previousbutton();

    for (let i = 1; i <= noofpages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        if (i === currentpage) {
            button.classList.add("active"); // optional: style this in CSS
        }

        button.addEventListener('click', () => {
            currentpage = i;
            updatePoems();
        });

        pagination_container.appendChild(button);
    }

    nextbutton();
}

function nextbutton() {
    pagination_container.appendChild(next);
    next.disabled = currentpage === noofpages; // disabled on last page
    next.onclick = () => {
        currentpage++;
        updatePoems();
    };
}

function previousbutton() {
    pagination_container.appendChild(previous);
    previous.disabled = currentpage === 1; // disabled on first page
    previous.onclick = () => {
        currentpage--;
        updatePoems();
    };
}



// Scroll to top of poem list

