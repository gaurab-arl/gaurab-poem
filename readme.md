# Poetry Collection Website

A beautiful, responsive poetry website built with **HTML, CSS, and JavaScript**.  
This project showcases poems, allows users to search and filter by category, and features **pagination** for easy browsing.

---

## 🎨 Features

- **Homepage** with main poem or featured poem
- **Poems List Page** showing all poems with pagination (10 per page)
- **Search & Category Filter** to find poems quickly
- **About Me Page** describing the author
- **Responsive Design** for desktop and mobile
- **Smooth Scroll** to top when changing pages
- **Active Page Highlight** in pagination
- **Previous/Next Buttons** with disabled states

---

## 📁 Project Structure

```
poetry-website/
├── css/
│   ├── styles.css       # Main styles
│   ├── pagination.css   # Pagination styles
│   └── root.css         # CSS variables
├── js/
│   ├── poems.js         # Poem data
│   ├── main.js          # Main logic
│   ├── data.js          # DOM element references
│   └── pagenation.js    # Pagination logic
├── index.html           # Homepage
└── readme.md            # This file
```

---

## 🚀 How to Run

1. **Clone** the repository:
   ```bash
   git clone <repository-url>
   cd poetry-website
   ```

2. **Open** `index.html` in your browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

---

## ⚙️ Technologies Used

- **HTML5 & CSS3**
- **Vanilla JavaScript (ES Modules)**
- **DOM Manipulation & Event Handling**
- **Responsive Design** using Flexbox/Grid
- **Smooth Scroll Behavior**

---

## � How It Works

### Rendering Poems
`main.js` contains the `render()` function which dynamically creates poem cards in the DOM.

### Filtering & Search
`searchfilter()` checks user input and category selection to return the filtered array.

### Pagination
`pagenation.js` controls:
- Slicing poems by `perpage` (10 poems per page)
- Displaying page buttons dynamically
- Active page highlight
- Previous/Next buttons (disabled when needed)
- Smooth scroll to top on page change

### Dynamic Updates
- Changing category, typing in search, or clicking pagination triggers `updatePoems()`
- Ensures filtered results are always displayed correctly

---

## 🌟 Future Improvements

- [ ] Add user comments or likes for each poem
- [ ] Add animations when poems appear or pagination changes
- [ ] Add dark mode toggle
- [ ] Allow poem images per poem instead of single header image
- [ ] Add poem sharing functionality
- [ ] Implement local storage for favorites

---

## 👤 Author

**Gaurab Aryal**

Passionate about poetry, web development, and creative design

---

## 📄 License

This project is open-source and free to use under the MIT License.

---

**Made with ❤️ and JavaScript**
