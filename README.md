
# GrowCoach App

This is a modular React project for the GrowCoach platform.

## 🛠 Structure

- `src/pages/` – Page views like CoachLanding, Signup, Login, etc.
- `src/components/` – Shared UI components (StickyHeader, FixedCTA)
- `src/routes/` – React Router logic
- `src/styles/` – Global styling (`App.css`)
- `src/assets/` – Static assets like images

## 🚀 How to Run

1. Make sure Node.js is installed
2. In terminal:
```bash
npm install
npm install react-router-dom
npm start
```

3. Project will be available at `http://localhost:3000`

## 🧩 Routing Overview

| URL Path           | Page Component           |
|--------------------|--------------------------|
| `/`                | HomeParentLanding        |
| `/coach`           | CoachLanding             |
| `/coach-signup`    | CoachSignupForm          |
| `/login`           | Login                    |
| `/dashboard`       | CoachDashboard           |
| `/contact`         | ContactForm              |
| `/parent-form`     | ParentForm               |
| `/message`         | Message48Hours           |

---

💡 For styling, edit `src/styles/App.css`.

