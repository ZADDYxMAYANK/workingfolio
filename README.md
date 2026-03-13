## Mayank – Full Stack Portfolio

Modern full stack portfolio website for **Mayank**, a developer based in Butwal, Nepal.  
Dark glassmorphism UI with smooth animations and a Node.js + Express backend that delivers contact form submissions to email via Nodemailer.

### ✨ Features

- **Modern UI**: Dark theme, gold/blue gradient accents, glassmorphism cards, responsive layout.
- **Hero section**: Typewriter effect cycling through “Frontend Developer”, “UI Designer”, “Full Stack Developer”.
- **About / Skills / Projects**: Professional copy with animated skill bars and project cards.
- **Contact form**: Sends messages to Mayank’s inbox using a secure backend API.
- **Tech stack**: HTML, CSS, JavaScript, Node.js, Express, Nodemailer, CORS, dotenv.

---

### 1. Prerequisites

- **Node.js** (v18+ recommended)
- A **Gmail account** and an **App Password** (for Nodemailer):
  - In Google Account → Security, enable 2FA.
  - Create an **App password** for “Mail”.
  - Use that app password in your `.env` file.

---

### 2. Install dependencies

In the project root (`c:\web dev\work\porto for work`):

```bash
npm install
```

This installs:

- `express` – HTTP server & API
- `nodemailer` – sends emails from the contact form
- `cors` – enables CORS (safe to keep on)
- `dotenv` – loads environment variables from `.env`
- `nodemon` (dev) – optional auto-reload for development

---

### 3. Configure environment variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_app_password_here
PORT=3000
```

- `EMAIL_USER` – your Gmail address (must match the account used for the app password).
- `EMAIL_PASS` – the Gmail **app password**, not your normal password.
- `PORT` – (optional) change if 3000 is taken.

All contact form submissions are sent to **`mayanksinjali159@gmail.com`** (configured in `server.js`).

---

### 4. Run the project

#### Start in development (with auto-reload)

```bash
npx nodemon server.js
```

#### Or start normally

```bash
npm start
```

The server will start on:

```text
http://localhost:3000
```

Open this URL in your browser — you should see the portfolio homepage.

---

### 5. Project structure

- `index.html` – main frontend page (hero, about, skills, projects, contact).
- `styles.css` – dark, glassmorphism styling and animations.
- `script.js` – typewriter effect, scroll reveal, hamburger menu, and contact form logic.
- `server.js` – Express server with `/api/contact` endpoint and email sending via Nodemailer.
- `package.json` – dependencies and NPM scripts.
- `.env.example` – template for environment variables.

---

### 6. Contact API (backend)

- **Endpoint**: `POST /api/contact`
- **Body (JSON)**:

```json
{
  "name": "Client name",
  "email": "client@example.com",
  "message": "Details about the project..."
}
```

- **Success response** (`200`):

```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

- **Error response** (`4xx/5xx`):

```json
{
  "success": false,
  "error": "Error description..."
}
```

The frontend `contact` form already posts to this endpoint using `fetch` and shows success/error messages in the UI.

---

### 7. Customization tips

- **Change copy / sections**: Edit `index.html` text in the relevant sections.
- **Adjust skills**: Update skill names and levels via the `data-skill-level` attributes in `index.html`.
- **Update projects**: Replace the three project cards in the Projects section with your real work and actual links.
- **Branding**: Tweak the gold/blue gradients and colors in `styles.css` to match your personal branding.

---

### 8. Production notes

For deployment:

- Keep your `.env` file **private**; never commit it.
- On platforms like Render, Railway, or a VPS:
  - Set `EMAIL_USER` and `EMAIL_PASS` as environment variables in the dashboard.
  - Run `npm install` once, then `npm start` as the app’s start command.

This gives you a complete, production-ready full stack portfolio that makes Mayank look like a reliable, modern, and trustworthy developer for clients and teams.

