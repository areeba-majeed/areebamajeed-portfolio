# 🚀 Areeba Majeed - Portfolio Website

<div align="center">

  ### **Full Stack Web Developer & Computer Science Undergraduate**
  *Building scalable, pixel-perfect, and modern web experiences.*

  [![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Server-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](LICENSE)

  [**Live Portfolio**](https://areebamajeed-portfolio.vercel.app/) • [**Download Resume**](public/Areeba_Majeed_Resume.pdf) • [**Contact Me**](https://areebamajeed-portfolio.vercel.app/contact)

</div>

---

## 📌 Overview

Welcome to the official repository of **Areeba Majeed's Personal Portfolio Website**. This project showcases my journey as a Full Stack Developer, highlighting my featured web projects, technical skill set, education at **FAST-NUCES**, and direct contact integrations.

Built with a fast, modern frontend stack powered by **Vite** and a **Node.js/Express** backend for secure contact form mail delivery via **Nodemailer**.

---

## ✨ Key Features

- **⚡ Fast Multi-Page Architecture**: High performance and seamless page navigation across `Home`, `Resume`, `Contact`, and `CV`.
- **🎨 Glassmorphism & Modern UI Aesthetics**: Tailored dark mode styling with sleek glow effects, CSS variables, and modern typography (*Plus Jakarta Sans & Inter*).
- **🌌 Dynamic Particle Canvas Background**: Interactive background particles responding dynamically to user interactions.
- **🌓 Theme Mode Toggle**: Instant dark and light theme switcher with state persistence.
- **📄 Downloadable PDF Resume**: Direct access to view and download the official CV (`Areeba_Majeed_Resume.pdf`).
- **📬 Automated Email Delivery API**: Integrated Express & Nodemailer backend API (`/api/send-email`) for direct email notifications.
- **📱 Fully Responsive**: Flawlessly optimized across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack & Tools

### **Frontend**
- **Core**: HTML5, CSS3, Modern JavaScript (ES6+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *Inter*)

### **Backend & APIs**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Mail Service**: Nodemailer (Gmail SMTP Integration)
- **Deployment**: Vercel / Node Server

---

## 💼 Featured Projects Showcase

| Project | Stack | Repository |
| :--- | :--- | :--- |
| **HrConnect** *(Multi-Branch Recruitment & ATS)* | MongoDB, Express.js, React, Node.js | [GitHub Repo](https://github.com/mirza1272/Multi-Branch-Recruitment-and-Applicant-Tracking-System.git) |
| **Football Live Scoreboard** | React.js, Express.js, Node.js, REST APIs | [GitHub Repo](https://github.com/areeba-majeed/Football-Live-Scoreboard.git) |
| **FormFlow** *(AI Form Builder)* | Next.js, TypeScript, Node.js, MongoDB, Cloudinary | [GitHub Repo](https://github.com/areeba-majeed/Form-Flow.git) |

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### **Prerequisites**
- Node.js (`v16.x` or higher)
- npm (`v8.x` or higher)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/areeba-majeed/areebamajeed-portfolio.git
   cd areebamajeed-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. **Start Development Server**:
   ```bash
   # Run Vite Dev Server
   npm run dev

   # Run Express Backend Mail Server
   npm run server
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
areebamajeed-portfolio/
├── api/                   # Vercel serverless function endpoints
│   └── send-email.js
├── public/                # Static public assets (e.g. CV PDF)
│   └── Areeba_Majeed_Resume.pdf
├── dist/                  # Production build output
├── index.html             # Landing page
├── resume.html            # Career & education detailed resume page
├── contact.html           # Contact form page
├── cv.html                # Quick CV view page
├── style.css              # Custom design system & styles
├── script.js              # Interactivity & particle engine
├── server.js              # Express backend server
├── vite.config.js         # Vite multi-page build configuration
└── package.json           # Dependencies & scripts
```

---

## 📬 Contact & Connect

- **Name**: Areeba Majeed
- **Education**: B.S. Computer Science @ FAST-NUCES
- **Email**: [areebamajeed212@gmail.com](mailto:areebamajeed212@gmail.com)
- **LinkedIn**: [linkedin.com/in/areeba-majeed-9283aa28a](https://www.linkedin.com/in/areeba-majeed-9283aa28a/)
- **GitHub**: [@areeba-majeed](https://github.com/areeba-majeed)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by <strong>Areeba Majeed</strong></sub>
</div>
