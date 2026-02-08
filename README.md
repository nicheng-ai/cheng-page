# Cheng Ni - Personal Website

A modern personal website built with React + TypeScript + FastAPI, featuring dark mode, internationalization (Chinese/English), and a clean, responsive design.

## 🚀 Features

- ✨ Modern, clean UI with Tailwind CSS
- 🌓 Dark mode support with system preference detection
- 🌍 Bilingual support (Chinese/English)
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎨 Type-safe with TypeScript
- 🔄 JSON-based content management

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **State Management:** Context API

### Backend
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Validation:** Pydantic
- **Data Storage:** JSON files

## 📁 Project Structure

```
cheng-page/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── api/       # API client configuration
│   │   ├── components/# React components
│   │   ├── context/   # Theme & Language contexts
│   │   ├── hooks/     # Custom React hooks
│   │   ├── i18n/      # Internationalization
│   │   └── types/     # TypeScript type definitions
│   └── package.json
└── backend/           # FastAPI backend
    ├── app/
    │   ├── api/       # API routes
    │   ├── models/    # Pydantic models
    │   ├── services/  # Business logic
    │   └── data/      # JSON data files & images
    └── requirements.txt
```

## 🚀 Quick Start

### One-Command Startup (Recommended)

```bash
./start.sh
```

This will automatically:
- Start the backend server at `http://localhost:8000`
- Start the frontend at `http://localhost:5173`
- Install missing dependencies
- Create log files in `./logs/`

To stop all services:
```bash
./stop.sh
```

Or press `Ctrl+C` in the terminal running `start.sh`

📚 See [SCRIPTS.md](./SCRIPTS.md) for detailed usage instructions.

### Manual Setup

#### Prerequisites

- Python 3.9+
- Node.js 18+
- pip or uv (Python package manager)

#### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # On macOS/Linux
# or
.venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
- API Documentation (Swagger): `http://localhost:8000/docs`

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:5173`

## 📝 Updating Content

Content is stored in JSON files in `backend/app/data/`. Each content type has separate files for Chinese (`_zh.json`) and English (`_en.json`):

- `profile_zh.json` / `profile_en.json` - Personal information
- `research_zh.json` / `research_en.json` - Research interests
- `news_zh.json` / `news_en.json` - News and updates
- `social.json` - Social media links (no translation needed)

### Adding a Profile Image

Place your profile image as `backend/app/data/images/profile.jpg` (recommended: 400x400px, square aspect ratio).

## 🎨 Customization

### Colors

Edit `frontend/tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',  // Main accent color
        // ...
      }
    }
  }
}
```

### Translations

Edit translation files in `frontend/src/i18n/translations/`:
- `zh.json` - Chinese translations
- `en.json` - English translations

## 📦 Production Build

### Frontend

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/`

### Deployment

- **Frontend:** Deploy to Vercel, Netlify, or any static hosting
- **Backend:** Deploy to Railway, Render, or any Python hosting service

## 📄 License

MIT License - feel free to use this for your own personal website!

## 🤝 Contributing

This is a personal website template. Feel free to fork and customize for your own use!

## 📧 Contact

- Email: chengni2001@gmail.com
- GitHub: [@sigeward](https://github.com/sigeward)

---

Built with ❤️ using React, TypeScript, and FastAPI
