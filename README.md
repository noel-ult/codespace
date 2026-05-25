<div align="center">

# ⚡ SnippetVault

### A Modern Code Snippet Manager

**Save, organize, search, and manage your code snippets — all from your browser.**

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white)](#-live-demo)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ultra2021/codespace)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Prism.js](https://img.shields.io/badge/Prism.js-6C63FF?style=flat-square&logo=javascript&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-4CAF50?style=flat-square&logo=databricks&logoColor=white)

</div>

---

## 📸 Screenshots

<div align="center">

> 💡 **Add your screenshots here!** Take screenshots of your app and place them in a `screenshots/` folder.

| Dark Mode | Light Mode |
|:---------:|:----------:|
| ![Dark Mode](screenshots/dark-mode.png) | ![Light Mode](screenshots/light-mode.png) |

| Mobile View | Add Snippet |
|:-----------:|:-----------:|
| ![Mobile](screenshots/mobile-view.png) | ![Add Snippet](screenshots/add-snippet.png) |

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Syntax Highlighting** | Powered by Prism.js — supports JavaScript, Python, Java, C, C++, HTML/CSS, SQL, Shell |
| 🔍 **Real-time Search** | Instantly search across titles, tags, languages, and code content |
| 🏷️ **Smart Filtering** | Filter by programming language and tags with pill-style buttons |
| 📊 **Sort Options** | Sort snippets by Newest, Oldest, or Alphabetical order |
| ✏️ **Full CRUD** | Create, read, update, and delete snippets effortlessly |
| 📋 **One-click Copy** | Copy code to clipboard with a single click |
| 🌗 **Dark / Light Mode** | Toggle between stunning dark and clean light themes |
| 💾 **Persistent Storage** | All data saved in LocalStorage — works offline |
| 📦 **Import / Export** | Backup and restore snippets as JSON files |
| 🔎 **Search Highlighting** | Matching search terms are highlighted in titles and tags |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile screens |
| ✨ **Glassmorphism UI** | Modern design with blur effects, gradients, and micro-animations |

---

## 🚀 Live Demo

> 🔗 **[View Live Demo →](#)** *(Update this link after deployment)*

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure |
| **CSS3** | Styling, animations, responsive design, glassmorphism |
| **Vanilla JavaScript** | Application logic, DOM manipulation, LocalStorage |
| **Prism.js** | Syntax highlighting for code blocks |
| **Google Fonts** | Inter (UI) + JetBrains Mono (code) typography |

> **No frameworks. No build tools. No dependencies to install.** Just clean, beginner-friendly code.

---

## 📥 Installation

### Option 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/Ultra2021/codespace.git

# Navigate into the project
cd codespace

# Open in your browser
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Option 2: Download ZIP

1. Click the green **"Code"** button on GitHub
2. Select **"Download ZIP"**
3. Extract the ZIP file
4. Open `index.html` in your browser

> ✅ No `npm install`, no build step, no server needed — just open and use!

---

## 📖 Usage

### Adding a Snippet
1. Fill in the **Title** field
2. Select a **Language** from the dropdown
3. Add optional **Tags** (comma-separated)
4. Paste your **Code** into the editor
5. Click **"Save Snippet"**

### Searching & Filtering
- Type in the **search bar** to search across titles, tags, languages, and code
- Click **language filter pills** to filter by programming language
- Click **tag filter pills** to filter by specific tags
- Use the **sort dropdown** to reorder (Newest / Oldest / A→Z)

### Managing Snippets
- **Copy** — copies the raw code to your clipboard
- **Edit** — loads the snippet into the form for editing
- **Delete** — removes the snippet (with confirmation)

### Import / Export
- Click the **↓ export** button in the sidebar to download all snippets as JSON
- Click the **↑ import** button to upload a JSON file and merge snippets

---

## 📁 Project Structure

```
codespace/
├── index.html          # Main HTML structure
├── style.css           # All styles (dark/light, responsive, animations)
├── script.js           # Application logic (CRUD, search, filter, sort)
├── README.md           # Project documentation (this file)
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
└── screenshots/        # App screenshots for README
    ├── dark-mode.png
    ├── light-mode.png
    ├── mobile-view.png
    └── add-snippet.png
```

---

## 🌐 Deployment

This is a **static site** — no build step required. Deploy anywhere:

| Platform | How |
|----------|-----|
| **Netlify** | Drag & drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | Import from GitHub at [vercel.com/new](https://vercel.com/new) |
| **GitHub Pages** | Enable in repo Settings → Pages → Source: `main` branch |

---

## 🧠 What I Learned

- DOM manipulation with vanilla JavaScript
- LocalStorage for client-side data persistence
- CSS custom properties and design systems
- Glassmorphism and modern UI techniques
- Responsive design with mobile-first media queries
- Integrating third-party libraries (Prism.js)
- Git workflow and professional project documentation

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using vanilla HTML, CSS & JavaScript**

⭐ Star this repo if you found it useful!

</div>
