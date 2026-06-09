<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="800" height="120" viewBox="0 0 800 120">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&amp;display=swap');
      .title { font-family: 'Orbitron', monospace; font-size: 52px; font-weight: 900; letter-spacing: 8px; fill: url(#grad); filter: url(#glow); }
      .sub { font-family: 'Orbitron', monospace; font-size: 18px; font-weight: 400; letter-spacing: 12px; fill: #22d3ee; filter: url(#glowCyan); }
    </style>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a855f7">
        <animate attributeName="stop-color" values="#a855f7;#22d3ee;#f472b6;#a855f7" dur="4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" stop-color="#22d3ee">
        <animate attributeName="stop-color" values="#22d3ee;#f472b6;#a855f7;#22d3ee" dur="4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#f472b6">
        <animate attributeName="stop-color" values="#f472b6;#a855f7;#22d3ee;#f472b6" dur="4s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowCyan">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="120" fill="#09050f" rx="12"/>
  <text x="400" y="62" text-anchor="middle" class="title">VARNOX</text>
  <text x="400" y="100" text-anchor="middle" class="sub">WA REPORT</text>
</svg>

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-View%20Site-a855f7?style=for-the-badge&logo=vercel&logoColor=white)](https://varnox-wa-report.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Med12--q-22d3ee?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Med12-q/VARNOX-WA-REPORT)
[![Telegram](https://img.shields.io/badge/Telegram-varnox__official-a855f7?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/varnox_official)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Channel-22d3ee?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F)

</div>

---

<div align="center">

### ◈ ABOUT THIS PROJECT ◈

</div>

**VARNOX WA REPORT** is a sleek, professional platform for reporting suspicious WhatsApp activity. Built with a dark neon-glow aesthetic and smooth animations, it provides a seamless experience for users to submit secure intelligence reports.

---

<div align="center">

### ◈ PREVIEW ◈

</div>

<div align="center">

> **[▶ Watch Demo Video](https://files.catbox.moe/7aujtb.mp4)**

<video src="https://files.catbox.moe/7aujtb.mp4" controls width="700" style="border-radius:12px; border: 1px solid #a855f7; box-shadow: 0 0 30px #a855f730;">
  <a href="https://files.catbox.moe/7aujtb.mp4">Watch the demo video</a>
</video>

</div>

---

<div align="center">

### ◈ FEATURES ◈

</div>

| Feature | Description |
|---------|-------------|
| 🌐 **Cinematic Video Banner** | Auto-playing looped video hero with neon glow border |
| 🛡️ **Secure Report Form** | Target number, reason, evidence upload, detailed description |
| ✨ **Glow Animations** | Smooth framer-motion entrance effects throughout |
| 📱 **Fully Responsive** | Mobile-first layout, works on all screen sizes |
| 🎨 **Glassmorphism UI** | Frosted-glass cards with neon purple/cyan palette |
| ✅ **Form Validation** | Zod schema validation with clear error messages |
| 🚀 **Production Ready** | Deployed via Vercel, zero-config |

---

<div align="center">

### ◈ TECH STACK ◈

</div>

<div align="center">

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square&logo=framer)
![Zod](https://img.shields.io/badge/Zod-3-3068b7?style=flat-square)

</div>

---

<div align="center">

### ◈ DEPLOYMENT ◈

</div>

```bash
# Clone the repository
git clone https://github.com/Med12-q/VARNOX-WA-REPORT.git

# Install dependencies
pnpm install

# Run in development
pnpm --filter @workspace/varnox-wa-report run dev

# Build for production
pnpm --filter @workspace/varnox-wa-report run build
```

**Deploy on Vercel** — import the repo, Vercel will auto-detect the config from `vercel.json`.

---

<div align="center">

### ◈ CONNECT ◈

</div>

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Med12-q/VARNOX-WA-REPORT)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/varnox_official)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:varnoxnovark@gmail.com)

</div>

---

<div align="center">

<sub>© 2025 VARNOX WA REPORT — All rights reserved.</sub>

<sub>Developed by <strong>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵</strong></sub>

</div>
