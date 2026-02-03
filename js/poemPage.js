import { poems } from './poems.js'
import { poem_title, poem_description, poem_text } from './data.js';

const params = new URLSearchParams(window.location.search);
const poemId = parseInt(params.get("id"), 10);

const poem = poems.find(p => p.id === poemId);

if (poem) {
  poem_title.textContent = poem.title;
  poem_description.textContent = poem.tag;
  poem_text.textContent = poem.poem;
} else {
  document.body.innerHTML = "<h2>Poem not found</h2>";
}
