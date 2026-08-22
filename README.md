# 📚 Bookish

### 📖 Your personal library, beautifully organized.

Bookish is a modern full-stack book library application that lets you **discover books, build your personal collection, rate books, track reading progress, and manage your reading status** — all through a clean and responsive interface.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge&logo=ejs&logoColor=white" alt="EJS">
  <img src="https://img.shields.io/badge/JavaScript-Frontend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

<p align="center">
  <strong>🔎 Discover • 📚 Organize • ⭐ Rate • 📊 Track</strong>
</p>

---

## ✨ Features

| Feature                    | Description                                        |
| -------------------------- | -------------------------------------------------- |
| 🔎 **Book Search**         | Search and discover books using external book APIs |
| 📚 **Personal Library**    | Add books to your own collection                   |
| 📖 **Reading Status**      | Track your current reading status                  |
| ⭐ **Book Rating**          | Rate books from 1–5 stars                          |
| 📊 **Progress Tracking**   | Keep track of your reading progress                |
| 🔀 **Smart Sorting**       | Sort books by title, rating, or release date       |
| 📄 **Book Details**        | View detailed information about individual books   |
| 🗑️ **Library Management** | Remove books from your collection                  |
| 🎨 **Modern UI**           | Clean, minimal and responsive interface            |
| ✨ **Animated Navigation**  | Smooth sliding navigation indicator                |

---

## 🖼️ Preview

> 📸 Screenshots will be added as the project UI is finalized.

### 🏠 Home

```text
┌─────────────────────────────────────────────────────────┐
│  📖 Bookish              Home     Library                │
│                                                         │
│                  Discover your next                     │
│                       great book                         │
│                                                         │
│                 🔎 Search for books                     │
└─────────────────────────────────────────────────────────┘
```

### 📚 Library

The library provides a centralized place to manage saved books, ratings, reading status, and progress.

### 📖 Book Details

Each book has its own detailed view containing information such as the title, author, publication date, genre, rating, and reading status.

---

## 🛠️ Tech Stack

### 🎨 Frontend

<p>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=white">
</p>

* HTML5
* CSS3
* JavaScript
* EJS
* DM Sans

### ⚙️ Backend

<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white">
</p>

* Node.js
* Express.js
* REST-style routing
* Server-side rendering with EJS

### 🗄️ Database

<p>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white">
</p>

PostgreSQL is used to persist:

* 📚 Saved books
* ⭐ Ratings
* 📖 Reading status
* 📊 Reading progress
* 🔗 Book relationships

### 🔌 External APIs

Bookish communicates with external book APIs to retrieve book metadata and cover images.

---

# 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   BOOKISH UI     │
                    │ HTML / CSS / JS  │
                    │       EJS        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    EXPRESS.JS    │
                    │     SERVER       │
                    └───────┬───┬──────┘
                            │   │
                ┌───────────┘   └────────────┐
                ▼                            ▼
       ┌─────────────────┐          ┌─────────────────┐
       │  BOOK API       │          │   POSTGRESQL    │
       │                 │          │                 │
       │ Book metadata   │          │ Personal data   │
       │ Cover images    │          │ Ratings         │
       └─────────────────┘          │ Progress        │
                                    │ Status          │
                                    └─────────────────┘
```

---

# 🔄 Application Flow

### 🔎 Discover

```text
User searches for a book
        ↓
Express receives request
        ↓
External Book API
        ↓
Book information returned
        ↓
Results displayed
```

### 📚 Add to Library

```text
User selects a book
        ↓
Book data submitted
        ↓
Express route
        ↓
PostgreSQL
        ↓
Book saved to personal library
```

### ⭐ Track a Book

```text
Book
 ├── ⭐ Rating
 ├── 📖 Reading Status
 └── 📊 Progress
```

---

# 📂 Project Structure

```text
Bookish/
│
├── 📁 public/
│   ├── 📁 css/
│   │   └── style.css
│   │
│   ├── 📁 js/
│   │   ├── navbar.js
│   │   └── library.js
│   │
│   └── 📁 images/
│
├── 📁 views/
│   ├── 📁 partials/
│   │   └── header.ejs
│   │
│   ├── 🏠 home.ejs
│   ├── 📚 library.ejs
│   └── 📖 book-details.ejs
│
├── ⚙️ server.js
├── 📦 package.json
├── 🔐 .env
├── 🚫 .gitignore
└── 📖 README.md
```

---

# 🎨 Design System

Bookish follows a simple and modern visual language.

### 🎨 Primary Color

```text
#625FFF
```

Used for:

* Active navigation
* Primary buttons
* Interactive elements
* Highlights

### ⚪ Background

```text
White / Soft neutral tones
```

### ✍️ Typography

**DM Sans**

The interface uses a clean typography system to keep the application modern and readable.

### 🔘 UI Style

* Rounded buttons
* Pill-shaped navigation
* Minimal borders
* Subtle shadows
* Smooth transitions
* Clean spacing
* Responsive layouts

---

# ✨ Interactive Navigation

Bookish includes a custom animated navigation indicator.

Instead of giving every navigation link its own background, a single animated **pill element** moves between the active links.

```text
Home       Library
 ────►      ███████
```

The pill dynamically changes:

* 📍 Position
* ↔️ Width
* ✨ Transition

This creates a smooth navigation experience.

---

# 🗄️ Data Management

Bookish separates **external book information** from **personal user tracking data**.

### External information

```text
📚 Book
├── Title
├── Author
├── Cover
├── Publication Date
└── Genre
```

### Personal information

```text
👤 User Data
├── ⭐ Rating
├── 📖 Reading Status
└── 📊 Reading Progress
```

This approach keeps the application data organized and makes the system easier to extend.

---

# 🚀 Getting Started

## 📋 Prerequisites

Make sure you have:

* 🟢 Node.js
* 📦 npm
* 🐘 PostgreSQL
* 🔧 Git

---

## 1️⃣ Clone the repository

```bash
git clone <your-repository-url>
```

## 2️⃣ Open the project

```bash
cd Bookish
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Configure environment variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=your_database_connection
API_KEY=your_api_key
```

> ⚠️ Never commit your `.env` file to GitHub.

## 5️⃣ Start the application

```bash
npm start
```

For development:

```bash
npm run dev
```

---

# 🧪 Development Goals

Bookish was built as a practical full-stack project to strengthen real-world development skills.

### Frontend

* ✅ HTML
* ✅ CSS
* ✅ JavaScript
* ✅ EJS
* ✅ DOM manipulation
* ✅ CSS animations
* 🚧 Responsive design improvements

### Backend

* ✅ Node.js
* ✅ Express.js
* ✅ Routing
* ✅ Forms
* ✅ API integration
* ✅ Server-side rendering

### Database

* ✅ PostgreSQL
* ✅ SQL queries
* ✅ Relationships
* ✅ CRUD operations
* ✅ Sorting

---

# 🗺️ Roadmap

### ✅ Completed

* [x] Basic application structure
* [x] Express server
* [x] PostgreSQL integration
* [x] Book API integration
* [x] Book search
* [x] Add books
* [x] Personal library
* [x] Sorting
* [x] Book ratings
* [x] Reading status
* [x] Delete books
* [x] Animated navbar

### 🚧 In Progress

* [ ] Improve responsive design
* [ ] Improve book image quality
* [ ] Complete book details UI
* [ ] Refine animations
* [ ] Improve mobile experience

### 🔮 Future

* [ ] 🔐 Authentication
* [ ] 👤 Multiple users
* [ ] ❤️ Favorites
* [ ] 🌙 Dark mode
* [ ] 📈 Reading statistics
* [ ] 🔔 Reading reminders
* [ ] 🤖 AI-powered recommendations
* [ ] 📱 Progressive Web App support

---

# 📈 Future Vision

Bookish can eventually evolve from a simple library tracker into a complete **personal reading platform**.

Possible future capabilities include:

```text
                 📚 BOOKISH
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     Discover      Track       Analyze
        │            │            │
        ▼            ▼            ▼
      Books        Progress     Statistics
        │            │            │
        └────────────┼────────────┘
                     ▼
              🤖 AI Recommendations
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you'd like to contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and open a pull request.

---

# 📄 License

This project is currently intended for **learning, experimentation, and portfolio purposes**.

---

# 👨‍💻 Author

**Sree Ahillan**

Full-Stack Developer

Built with:

**☕ + 💻 + 📚 + JavaScript + Node.js + Express + PostgreSQL**

---

<p align="center">
  <strong>📚 Bookish — Discover. Organize. Read.</strong>
</p>

<p align="center">
  ⭐ If you found this project interesting, consider giving it a star!
</p>
