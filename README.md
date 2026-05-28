<!-- @format -->

# 🎨✨ React Portfolio - Cartoon Edition! ✨🎨

```
   ╔═══════════════════════════════════════════════════════════╗
   ║   🚀 Welcome to my Awesome Portfolio Website! 🎯         ║
   ║   Built with React, Vite & Tailwind CSS ✨        ║
   ╚═══════════════════════════════════════════════════════════╝
```

---

## 🌟 What's This All About?

> A **super cool**, **super interactive** portfolio website showcasing my projects, skills, certificates, and shenanigans! 🎭
>
> _"It's not just a portfolio... it's an experience!"_ 🎪

### ✨ Features That'll Blow Your Mind

- 🎯 **Hero Section** - Eye-catching intro with animated text effects
- 📂 **Project Showcase** - Browse through my coolest creations
- 🏆 **Certificates** - Look at all those achievements!
- 💼 **Skills Dashboard** - See what superpowers I have
- 🎨 **Dark/Light Mode** - Because your eyes matter! 👀
- 🔗 **Contact Form** - Powered by Supabase (no spam, promise!)
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ✨ **Smooth Animations** - AOS (Animate On Scroll) + Morphing blobs
- 🎪 **Admin Dashboard** - Manage projects, skills & messages like a boss

---

## 🛠️ Tech Stack (The Magic Wand)

```
⚡ Frontend Framework:     React 19
🔥 Build Tool:            Vite
🎨 Styling:               Tailwind CSS 4
🎯 Router:                React Router v7
💾 Backend/Database:      Supabase
✍️ Form Animations:       React Type Animation
📜 Scroll Magic:          AOS (Animate On Scroll)
🎠 Carousel:              Swiper
🎭 Icons:                React Icons
🍞 Notifications:        React Hot Toast
```

---

## 🚀 Quick Start (Buckle Up!)

### 1️⃣ **Clone the Repo**

```bash
git clone https://github.com/DiandraFrza/PortofolioV2.git
cd PortofolioV2
```

### 2️⃣ **Install Dependencies**

```bash
npm install
```

### 3️⃣ **Set Up Environment Variables** 🔐

Create a `.env.local` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ **Start the Dev Server** 🎮

```bash
npm run dev
```

Then open your browser to: **http://localhost:5173** 🌐

```
🎉 Congratulations! Your portfolio is now running! 🎉
```

---

## 📁 Project Structure (The Blueprint)

```
📦 ReactPortofolio/
├── 📄 index.html              # Main HTML entry
├── 📄 package.json            # Dependencies manifest
├── 🎨 vite.config.js          # Vite configuration
├── 🔧 eslint.config.js        # Code quality rules
│
├── 📂 public/                 # Static assets
│
└── 📂 src/                    # The Main Event! 🎪
    ├── 🎯 main.jsx           # App entry point
    ├── 🎨 App.jsx            # Main component
    ├── 💾 context/           # React Context magic
    │   └── ThemeContext.jsx   # Dark/Light mode
    │
    ├── 🔧 components/        # Reusable components (The building blocks!)
    │   ├── Hero.jsx          # The grand entrance
    │   ├── About.jsx         # About you!
    │   ├── Skills.jsx        # Your superpowers
    │   ├── Projects.jsx      # Your creations
    │   ├── Certificates.jsx  # Your badges
    │   ├── Contact.jsx       # Talk to me!
    │   ├── Footer.jsx        # The goodbye
    │   └── [Other components...]
    │
    ├── 📄 pages/             # Page components
    │   ├── LandingPage.jsx   # The main stage
    │   └── admin/            # Admin controls! 🛡️
    │       ├── AdminDashboard.jsx
    │       ├── Login.jsx
    │       ├── ManageProjects.jsx
    │       └── [Other admin pages...]
    │
    ├── 🔐 supabase/          # Backend integration
    │   ├── client.js         # Supabase config
    │   ├── auth.js           # Authentication
    │   └── services.js       # API services
    │
    ├── 🧰 utils/             # Helper functions
    │   └── toastHelpers.jsx  # Notification helpers
    │
    └── 🎨 assets/            # Images & media
        ├── img/
        ├── certificate/
        └── project/
```

---

## 🎮 Available Commands

```bash
# 🚀 Start development server
npm run dev

# 📦 Build for production
npm run build

# 🔍 Check code quality
npm run lint

# 👀 Preview production build
npm run preview
```

---

## 🌐 Features Deep Dive

### 🎨 **Dark/Light Mode**

- Smooth theme switching with context API
- Persisted preferences (uses localStorage)
- Beautiful transitions! ✨

### 🛡️ **Admin Dashboard**

- Login system with Supabase Auth
- Manage your projects, skills & certificates
- Real-time message management
- Comment moderation

### 📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS responsive utilities
- Works perfectly on all devices

### 🎪 **Interactive Animations**

- Morphing blobs for visual appeal
- Parallax effects
- Scroll animations with AOS
- Text reveal effects

---

## 📊 Data Management

All data is managed through **Supabase** with the following services:

- 🔐 User Authentication
- 💾 Project Storage
- 🎯 Skill Management
- 🏆 Certificate Tracking
- 💬 Message & Comment Handling

---

## 🤝 Contributing

Want to make this portfolio even cooler? Here's how:

1. Fork it! 🍴
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 🎉

---

## 📝 Environment Setup

### Required Supabase Tables:

- `projects` - Your portfolio projects
- `skills` - Your technical skills
- `certificates` - Your achievements
- `messages` - Contact form messages
- `comments` - Comments on projects

Each with appropriate fields for data management.

---

## 🐛 Troubleshooting

### **Port Already in Use?**

```bash
# Kill the process using port 5173
# Or specify a different port
npm run dev -- --port 3000
```

### **Supabase Connection Issues?**

- Check your `.env.local` file
- Verify Supabase URL and keys
- Make sure your project is running on Supabase

### **Animations Not Working?**

- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check if AOS is loaded

---

## 📞 Let's Connect!

Feel free to reach out:

- 💌 **Email**: diandraafirzanasywan@gmail.com
- 🐙 **GitHub**: [@DiandraFrza](https://github.com/DiandraFrza)
- 💼 **LinkedIn**: [Diandra Firza Nasywan](https://linkedin.com/in/diandra-firza-nasywa)

---

## 📜 License

This project is licensed under the **MIT License** - feel free to use it, modify it, and make it your own! 🚀

```
╔════════════════════════════════════════════════════════╗
║  Made with ❤️, Coffee ☕, and lots of Code Magic ✨   ║
║          Have Fun Exploring! Happy Coding! 🎉         ║
╚════════════════════════════════════════════════════════╝
```

---

<div align="center">

**⭐ If you like this portfolio, give it a star on GitHub!**

_Built with love using React & Vite_ 🚀

</div>
