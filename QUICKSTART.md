# 🚀 Quick Start Guide

## Prerequisites Check
- [ ] Node.js v18+ installed (`node --version`)
- [ ] MongoDB Atlas account created
- [ ] Git installed

## 📦 Installation (5 minutes)

### 1. Clone & Navigate
```bash
cd thor_x
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/user-management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
```

Start backend:
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```
✅ Frontend running on http://localhost:3000

## 🧪 Testing the App

1. **Open browser**: http://localhost:3000

2. **Sign up new user**:
   - Click "Sign up"
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test123
   - Confirm Password: Test123
   - Click "Sign Up"

3. **View Profile**:
   - After signup, you'll be redirected to profile
   - Try editing your name/email
   - Try changing password

4. **Create Admin User** (MongoDB Compass or Atlas):
   - Connect to your database
   - Find the `users` collection
   - Edit a user document
   - Change `role: "user"` to `role: "admin"`

5. **Test Admin Dashboard**:
   - Logout and login with admin account
   - Click "Dashboard" in navbar
   - View all users with pagination
   - Try activating/deactivating users

## 🎯 Common Issues

### Backend won't start
```bash
# Check if MongoDB URI is correct
# Make sure .env file exists in backend folder
# Verify port 5000 is not in use
```

### Frontend can't connect
```bash
# Verify backend is running
# Check VITE_API_URL in frontend/.env
# Clear browser localStorage and reload
```

### Authentication errors
```bash
# Clear localStorage: Open DevTools > Application > Local Storage > Clear
# Verify JWT_SECRET is set in backend/.env
# Make sure user account is "active" status
```

## 📝 Test Credentials

After creating users, you can test with:

**Regular User**:
- Email: test@example.com
- Password: Test123

**Admin User** (after manual role change):
- Email: admin@example.com  
- Password: Admin123

## 🧪 Run Tests
```bash
cd backend
npm test
```

Expected: 6 tests passing ✅

## 🌐 Next Steps

1. ✅ Local development working
2. 🚀 Deploy to production (see README.md)
3. 📹 Record walkthrough video
4. 📤 Submit GitHub repo

## 📚 Full Documentation

See [README.md](file:///c:/Users/Aditya/Desktop/thor_x/README.md) for:
- Complete API documentation
- Deployment instructions
- Full feature list
- Architecture details

---

**⚽ Happy coding!**
