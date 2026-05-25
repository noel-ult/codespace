<div align="center">

# ⚡ SnippetVault

**A Modern Code Snippet Manager**

Save, organize, search, and manage your code snippets — all from your browser.
No sign-up required. No backend needed. Everything runs locally.

<br>

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white)](#-live-demo)
[![GitHub Repo](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ultra2021/codespace)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Prism.js](https://img.shields.io/badge/Prism.js-6C63FF?style=flat-square&logo=javascript&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-4CAF50?style=flat-square&logo=databricks&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [What I Learned](#-what-i-learned)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📸 Screenshots

<div align="center">

<!-- 
  HOW TO ADD SCREENSHOTS:
  1. Open your app in Chrome
  2. Press F12 → click the device toolbar icon
  3. Take screenshots at different sizes/themes
  4. Save them in a "screenshots/" folder in your project
  5. Uncomment the tables below and update filenames
-->

| Dark Mode | Light Mode |
|:---------:|:----------:|
| ![Dark Mode](screenshots/dark-mode.png) | ![Light Mode](screenshots/light-mode.png) |

| Mobile View | Add Snippet Form |
|:-----------:|:----------------:|
| ![Mobile](screenshots/mobile-view.png) | ![Add Snippet](screenshots/add-snippet.png) |

</div>

> 💡 **Tip:** To add your own screenshots, create a `screenshots/` folder and place your images there.

---

## ✨ Features

### Core Functionality
| Feature | Description |
|:--------|:------------|
| ✏️ **Create Snippets** | Add new code snippets with a title, language, tags, and code |
| 📖 **View Snippets** | Browse all saved snippets in a beautiful card-based grid |
| ✏️ **Edit Snippets** | Click "Edit" to modify any saved snippet |
| 🗑️ **Delete Snippets** | Remove snippets with a confirmation prompt |
| 📋 **Copy to Clipboard** | One-click copy — the button shows "Copied!" feedback |

### Search & Organization
| Feature | Description |
|:--------|:------------|
| 🔍 **Real-time Search** | Instantly search across titles, tags, languages, and code content |
| 🏷️ **Language Filter** | Filter snippets by programming language with green pill buttons |
| 🏷️ **Tag Filter** | Filter by tags with purple pill buttons |
| 📊 **Sort Options** | Sort by Newest First, Oldest First, or Alphabetical (A→Z) |
| 🔎 **Search Highlighting** | Matching search terms are highlighted in yellow in titles and tags |

### Design & Experience
| Feature | Description |
|:--------|:------------|
| 🎨 **Syntax Highlighting** | Powered by Prism.js — code looks beautiful with proper coloring |
| 🌗 **Dark / Light Mode** | Toggle between a stunning dark theme and a clean light theme |
| ✨ **Glassmorphism UI** | Modern frosted-glass effect with subtle blur and transparency |
| 📱 **Fully Responsive** | Works perfectly on desktop, tablet, and mobile (4 breakpoints) |
| 🎭 **Micro-animations** | Smooth hover effects, card lifts, and fade-in transitions |

### Data Management
| Feature | Description |
|:--------|:------------|
| 💾 **LocalStorage** | All snippets are saved in your browser — works offline! |
| 📦 **Export to JSON** | Download all your snippets as a `.json` backup file |
| 📥 **Import from JSON** | Upload a JSON file to restore or merge snippets |

---

## 🚀 Live Demo

> 🔗 **[View Live Demo →](#)** *(Update this link after deployment)*

---

## 🛠️ Technologies Used

This project is built with **zero frameworks** and **zero build tools** — just clean, beginner-friendly code:

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **HTML5** | — | Semantic page structure and accessibility |
| **CSS3** | — | Styling, animations, glassmorphism, responsive design |
| **Vanilla JavaScript** | ES6+ | Application logic, DOM manipulation, LocalStorage API |
| **Prism.js** | 1.29.0 | Syntax highlighting for 8+ programming languages |
| **Google Fonts** | — | Inter (UI typography) + JetBrains Mono (code font) |

### Supported Languages for Syntax Highlighting
`JavaScript` · `Python` · `Java` · `C` · `C++` · `HTML/CSS` · `SQL` · `Shell/Bash`

---

## 📥 Installation

No dependencies to install. No build step. No server required.

### Option 1: Clone with Git

```bash
# 1. Clone the repository
git clone https://github.com/Ultra2021/codespace.git

# 2. Navigate into the project folder
cd codespace

# 3. Open in your default browser
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Option 2: Download ZIP

1. Click the green **"Code"** button at the top of this page
2. Select **"Download ZIP"**
3. Extract the ZIP file to any folder
4. Double-click `index.html` to open in your browser

> ✅ That's it! No `npm install`, no terminal commands, no configuration needed.

---

## 📖 Usage

### ➕ Adding a New Snippet
1. Fill in the **Title** (e.g., "Debounce Function")
2. Select a **Language** from the dropdown (e.g., JavaScript)
3. Add optional **Tags** separated by commas (e.g., `utilities, performance`)
4. Paste your **Code** into the text area
5. Click the green **"Save Snippet"** button

### 🔍 Searching & Filtering
- **Search Bar** — Type anything to instantly filter across titles, tags, languages, and even code content
- **Language Pills** (green) — Click to show only snippets in a specific language
- **Tag Pills** (purple) — Click to show only snippets with a specific tag
- **Sort Dropdown** — Choose between "Newest First", "Oldest First", or "A → Z"
- All filters work together — you can search while a language filter is active

### ✏️ Managing Snippets
- **Copy** — Copies the raw code to your clipboard (shows "Copied!" confirmation)
- **Edit** — Loads the snippet back into the form so you can modify it
- **Delete** — Removes the snippet after you confirm the action

### 📦 Import & Export
- **Export** — Click the download icon (↓) in the sidebar footer to save all snippets as a `snippets.json` file
- **Import** — Click the upload icon (↑) to load a JSON file — duplicate snippets are automatically skipped

### 🌗 Switching Themes
- Click the **sun/moon** icon in the sidebar footer to toggle between dark and light mode

---

## 📁 Project Structure

```
codespace/
│
├── index.html          # Page structure — sidebar, header, form, snippet grid
├── style.css           # All styles — variables, glassmorphism, responsive, themes
├── script.js           # App logic — CRUD, search, filter, sort, import/export
│
├── README.md           # Project documentation (this file)
├── LICENSE             # MIT License
├── .gitignore          # Files to exclude from Git tracking
│
└── screenshots/        # App screenshots for the README
    ├── dark-mode.png
    ├── light-mode.png
    ├── mobile-view.png
    └── add-snippet.png
```

| File | Lines | What It Does |
|:-----|:-----:|:-------------|
| `index.html` | ~210 | Semantic HTML with sidebar navigation, form, and card grid |
| `style.css` | ~800 | CSS variables, glassmorphism, Prism overrides, 4 responsive breakpoints, dark/light themes |
| `script.js` | ~430 | LocalStorage CRUD, real-time search, language/tag filtering, sorting, import/export, syntax highlighting |

---

## 🌐 Deployment

This is a **static site** — deploy it anywhere for free, no build step needed:

| Platform | Method | Auto-Deploy? |
|:---------|:-------|:------------:|
| **GitHub Pages** | Settings → Pages → Source: `main` | ✅ On push |
| **Netlify** | Drag & drop at [app.netlify.com/drop](https://app.netlify.com/drop) | ✅ With GitHub |
| **Vercel** | Import from GitHub at [vercel.com/new](https://vercel.com/new) | ✅ With GitHub |

---

## 🔮 Future Improvements

Here are planned features and ideas to make SnippetVault even better:

### 🟢 Easy (Good for Beginners)
- [ ] Add a **favicon** for a professional browser tab appearance
- [ ] Add **Open Graph meta tags** for better social media link previews
- [ ] Add a **"clear all"** button to delete all snippets at once
- [ ] Show **total lines of code** per snippet in the card
- [ ] Add a **"duplicate snippet"** button to quickly clone an existing snippet

### 🟡 Medium
- [ ] Add **keyboard shortcuts** (e.g., `Ctrl+S` to save, `Ctrl+K` to focus search)
- [ ] Add **snippet categories/folders** for better organization
- [ ] Add a **Prism.js theme switcher** (choose between dark code themes)
- [ ] Add **snippet pinning/favorites** to keep important snippets at the top
- [ ] Add **Markdown support** for snippet descriptions
- [ ] Add **line numbers** in code blocks

### 🔴 Advanced
- [ ] Add **cloud sync** with Firebase or Supabase for multi-device access
- [ ] Add **user authentication** (login/signup) for personal accounts
- [ ] Add **shareable snippet links** to send snippets to others via URL
- [ ] Add **code execution** (run JavaScript/Python snippets in-browser)
- [ ] Convert to a **Progressive Web App (PWA)** for offline-first mobile experience
- [ ] Add **VS Code extension** integration for quick snippet imports

---

## 🧠 What I Learned

Building this project taught me practical skills in:

- **DOM Manipulation** — Creating, modifying, and deleting elements dynamically with vanilla JavaScript
- **LocalStorage API** — Persisting user data on the client side without a database
- **CSS Design Systems** — Using CSS custom properties for consistent theming across a full application
- **Glassmorphism** — Implementing modern UI effects with `backdrop-filter`, gradients, and transparency
- **Responsive Design** — Building mobile-first layouts with media queries across 4 breakpoints
- **Third-party Integration** — Adding Prism.js for syntax highlighting with custom theme overrides
- **Search Algorithms** — Implementing real-time filtering across multiple data fields
- **Git & GitHub** — Version control, branching, and professional project documentation

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Here's how to contribute:

1. **Fork** this repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request on GitHub

---

## 📄 License

This project is licensed under the **MIT License** — you're free to use, modify, and distribute it.

See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

### Built with ❤️ using vanilla HTML, CSS & JavaScript

**No frameworks. No build tools. Just clean code.**

<br>

⭐ **If you found this project useful, please give it a star!** ⭐

<br>

[Back to Top ↑](#-snippetvault)

</div>
