# JADE - Setup Guide for Developers

## 🚀 Local Development Setup

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB** account (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/fxeswiftie-hub/JADE.git
cd JADE
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Create Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your API keys:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jade

# NextAuth
NEXTAUTH_SECRET=generate-a-random-string-here
NEXTAUTH_URL=http://localhost:3000

# AI APIs
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_API_KEY=your_gemini_key
DEEPSEEK_API_KEY=your_deepseek_key

# Image Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 4: Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Test the Application

1. **Register** a new account
2. **Add inspiration** items
3. **Start a workshop** conversation with AI
4. **Create portfolio** entries
5. **View public portfolio** at `/portfolio`

---

## 📁 Project Structure Explanation

```
JADE/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (creator)/         # Protected creator routes
│   │   ├── dashboard/     # User dashboard
│   │   ├── inspiration/   # Inspiration library
│   │   ├── workshop/      # AI creative workshop
│   │   └── portfolio/     # Portfolio showcase
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── inspiration/   # Inspiration CRUD
│   │   ├── portfolio/     # Portfolio endpoints
│   │   ├── comments/      # Comment management
│   │   └── ai/            # AI service integration
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Top navigation
│   └── Footer.tsx         # Footer
├── lib/                   # Utility functions
│   ├── db.ts             # MongoDB connection
│   ├── auth.ts           # Authentication utilities
│   ├── models.ts         # Database schemas
│   └── ai-service.ts     # AI API calls
├── public/                # Static files
├── docs/                  # Documentation
│   ├── DEPLOY.md         # Deployment guide
│   ├── API.md            # API documentation
│   └── SETUP.md          # This file
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── next.config.js        # Next.js configuration
```

---

## 🔧 Key Technologies

### Frontend
- **React 18** - UI library
- **Next.js 14** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Document Mapper)
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### AI & External Services
- **OpenAI API** - GPT-4 integration
- **Anthropic API** - Claude integration
- **Google AI API** - Gemini integration
- **DeepSeek API** - DeepSeek integration
- **Cloudinary** - Image hosting

---

## 🧪 Testing Endpoints Locally

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Inspirations:**
```bash
curl -X GET http://localhost:3000/api/inspiration \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Download [Postman](https://www.postman.com/)
2. Create a new collection for JADE
3. Add requests for each endpoint
4. Set Authorization header: `Bearer {your_token}`
5. Test each endpoint

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError`

**Solution:**
1. Check MongoDB URI is correct
2. Add your IP to MongoDB Atlas whitelist
3. Verify database password
4. Check network connectivity

### API Key Not Working

**Problem:** 401 Unauthorized from AI APIs

**Solution:**
1. Verify key is correctly copied
2. Check API is enabled in provider console
3. Verify account has credits (for paid APIs)
4. Check key hasn't expired

### Port 3000 Already in Use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Error

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Development Workflow

### Making Changes

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes

3. Test locally
   ```bash
   npm run dev
   ```

4. Commit changes
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```

5. Push to GitHub
   ```bash
   git push origin feature/your-feature
   ```

6. Create a Pull Request

### Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

---

## 🚀 Next Steps

1. ✅ Setup local development environment
2. ✅ Test authentication (register, login)
3. ✅ Add inspiration items
4. ✅ Test AI workshop conversation
5. ✅ Create portfolio entries
6. 📦 Deploy to production (see [DEPLOY.md](./DEPLOY.md))

---

## 💡 Tips

- Use `console.log()` for debugging
- Check browser DevTools (F12) for errors
- Check terminal for server errors
- Use MongoDB Atlas UI to inspect your database
- Test each API endpoint before moving on
- Keep your `.env.local` file private (never commit it)

---

## 🆘 Getting Help

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 📖 [MongoDB Docs](https://docs.mongodb.com/)
- 📖 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🐙 [GitHub Issues](https://github.com/fxeswiftie-hub/JADE/issues)

---

## 🎉 You're Ready!

You now have everything set up to start developing JADE locally. Happy coding! 🚀
