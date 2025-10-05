# Free Fire Tournament Website 🎮

A modern, dynamic, and feature-rich Free Fire tournament platform with 3D animations, payment integration, and comprehensive tournament management.

## ✨ Features

- **🎨 Modern 3D UI**: Beautiful 3D animated hero section using Three.js and React Three Fiber
- **🔐 User Authentication**: Complete registration and login system
- **🏆 Tournament Management**: Browse, filter, and join tournaments
- **💳 Payment Integration**: Secure payment processing with Stripe/Razorpay
- **📊 User Dashboard**: Track performance, view stats, and manage tournaments
- **👤 Profile Management**: Customizable user profiles with stats
- **🎯 Real-time Updates**: Live tournament status and participant counts
- **📱 Responsive Design**: Fully responsive across all devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Three Fiber (3D graphics)
- React Router
- Zustand (state management)
- Lucide React (icons)

### Backend
- Node.js
- Express
- Stripe (payment processing)
- CORS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your API keys:
     - Stripe keys from https://stripe.com
     - Or Razorpay keys from https://razorpay.com (for India)

4. **Run the development server**
   
   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   npm run server
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
website/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero3D.jsx
│   │   └── TournamentCard.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Tournaments.jsx
│   │   ├── TournamentDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   └── Payment.jsx
│   ├── store/           # State management
│   │   └── authStore.js
│   ├── utils/           # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/              # Backend API
│   └── index.js
├── public/
├── package.json
└── README.md
```

## 🎮 Usage

### For Players

1. **Register an Account**
   - Click "Sign Up" in the navigation
   - Fill in your details including Free Fire ID
   - Verify your email (if implemented)

2. **Browse Tournaments**
   - Navigate to "Tournaments" page
   - Use filters to find tournaments by status, mode, etc.
   - Click on any tournament to view details

3. **Join a Tournament**
   - View tournament details
   - Click "Join Now"
   - Complete payment securely
   - Track your registration in Dashboard

4. **Manage Profile**
   - Update your information
   - View your statistics
   - Track achievements

### For Admins

1. **Tournament Management**
   - Create new tournaments
   - Set entry fees and prize pools
   - Manage participants
   - Update tournament status

## 💳 Payment Integration

### Stripe Setup
1. Create account at https://stripe.com
2. Get API keys from Dashboard
3. Add to `.env` file
4. Test with card: 4242 4242 4242 4242

### Razorpay Setup (for India)
1. Create account at https://razorpay.com
2. Get API keys
3. Add to `.env` file
4. Configure webhook for payment verification

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... },
  gaming: { ... }
}
```

### Animations
Modify animation settings in `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 3s ease-in-out infinite',
  // Add your custom animations
}
```

## 🔒 Security Notes

⚠️ **Important for Production:**

1. **Never commit `.env` file**
2. **Use proper password hashing** (bcrypt)
3. **Implement JWT** for authentication
4. **Add rate limiting**
5. **Validate all inputs**
6. **Use HTTPS** in production
7. **Implement CSRF protection**
8. **Set up proper database** (MongoDB, PostgreSQL)

## 📱 Features to Add

- [ ] Email verification
- [ ] Password reset
- [ ] Live chat support
- [ ] Tournament brackets
- [ ] Live streaming integration
- [ ] Social media sharing
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Analytics dashboard

## 🐛 Known Issues

- Mock data is used for tournaments (integrate real database)
- Payment is simulated (integrate actual payment gateway)
- No email service (add SendGrid or similar)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@fftournaments.com or join our Discord server.

## 🌟 Acknowledgments

- Free Fire by Garena
- Stripe for payment processing
- Three.js community
- React ecosystem

---

Made with ❤️ for the Free Fire gaming community
