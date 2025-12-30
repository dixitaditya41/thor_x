# ⚽ User Management System

A full-stack web application for managing user accounts with authentication, role-based access control (RBAC), and a football-themed UI. Built for the Mini User Management System assessment.

## 🎯 Project Overview

This system provides comprehensive user management capabilities including:
- User authentication (signup/login) with JWT tokens
- Role-based authorization (admin/user roles)
- Admin dashboard for user lifecycle management
- User profile management with password change
- Pagination and status management
- Modern, responsive football-themed UI

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs for password hashing
- **Validation**: express-validator
- **Security**: CORS, environment variables via dotenv

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Icons**: React Icons
- **Styling**: Vanilla CSS with football theme

### Deployment
- **Backend**: Render
- **Frontend**: Vercel
- **Database**: MongoDB Atlas

## 📋 Features

### Authentication
- ✅ User signup with email/password validation
- ✅ Password strength requirements (min 6 chars + number)
- ✅ Email format validation
- ✅ Login with credentials verification
- ✅ JWT token-based authentication
- ✅ Protected routes with role-based access

### Admin Functions
- ✅ View all users with pagination (10 per page)
- ✅ Activate user accounts
- ✅ Deactivate user accounts
- ✅ Confirmation dialogs before actions
- ✅ Real-time status updates

### User Functions
- ✅ View own profile information
- ✅ Update full name and email
- ✅ Change password with validation
- ✅ Success/error notifications

### Security
- ✅ bcrypt password hashing
- ✅ JWT token verification middleware
- ✅ RBAC middleware for admin-only routes
- ✅ Input validation on all endpoints
- ✅ Environment variables for secrets
- ✅ CORS configuration

## 📁 Project Structure

```
thor_x/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (signup, login, logout)
│   │   └── userController.js  # User CRUD operations
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── rbac.js            # Role-based access control
│   ├── models/
│   │   └── User.js            # User schema with hooks
│   ├── routes/
│   │   └── index.js           # Centralized routes
│   ├── tests/
│   │   └── auth.test.js       # Unit tests
│   ├── utils/
│   │   └── generateToken.js   # JWT utilities
│   ├── .env.example           # Environment template
│   ├── server.js              # Express server entry
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── store/
│   │   │   └── authStore.js   # Zustand global state
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Football theme styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`**
```env
VITE_API_URL=http://localhost:5000
```

5. **Start the development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Testing

Run backend tests:
```bash
cd backend
npm test
```

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `JWT_EXPIRE` | Token expiration time | `7d` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

**⚠️ IMPORTANT**: Never commit `.env` files. Use `.env.example` as templates.

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user
```json
Request:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Pass123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c8b1f8e4e1a1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### POST /api/auth/login
Login existing user
```json
Request:
{
  "email": "john@example.com",
  "password": "Pass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c8b1f8e4e1a1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### GET /api/auth/me
Get current logged-in user (Protected)
```
Headers:
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "60d5ec49f1b2c8b1f8e4e1a1",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "lastLogin": "2024-01-15T10:30:00.000Z"
}
```

#### POST /api/auth/logout
Logout user (Protected)
```
Headers:
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Logout successful"
}
```

### User Management Endpoints

#### GET /api/users
Get all users with pagination (Admin only)
```
Headers:
Authorization: Bearer <admin_token>

Query Parameters:
?page=1&limit=10

Response: 200 OK
{
  "users": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalUsers": 50
}
```

#### PUT /api/users/:id/activate
Activate a user account (Admin only)
```
Headers:
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "message": "User activated successfully",
  "user": {...}
}
```

#### PUT /api/users/:id/deactivate
Deactivate a user account (Admin only)
```
Headers:
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "message": "User deactivated successfully",
  "user": {...}
}
```

### Profile Endpoints

#### GET /api/users/profile
Get user profile (Protected)
```
Headers:
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "60d5ec49f1b2c8b1f8e4e1a1",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /api/users/profile
Update user profile (Protected)
```json
Headers:
Authorization: Bearer <token>

Request:
{
  "fullName": "John Updated",
  "email": "newemail@example.com"
}

Response: 200 OK
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

#### PUT /api/users/password
Change password (Protected)
```json
Headers:
Authorization: Bearer <token>

Request:
{
  "currentPassword": "Pass123",
  "newPassword": "NewPass456"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

### Error Responses
All endpoints return consistent error formats:
```json
400 Bad Request:
{
  "message": "Validation error message"
}

401 Unauthorized:
{
  "message": "Not authorized, no token"
}

403 Forbidden:
{
  "message": "Access denied. Admin only."
}

404 Not Found:
{
  "message": "User not found"
}

500 Internal Server Error:
{
  "message": "Error message"
}
```

## 🌐 Deployment Instructions

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard
5. Deploy and note the public URL

### Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory
3. Run: `vercel`
4. Follow prompts and configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
5. Add environment variable `VITE_API_URL` with backend URL
6. Deploy: `vercel --prod`

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses (or use 0.0.0.0/0 for all)
4. Get connection string
5. Update `MONGO_URI` in backend environment

## 🎨 UI Features

### Football Theme
- ⚽ Pitch green color scheme (#1a7f37)
- 🏟️ Stadium-inspired gradients
- 🎯 Goal yellow accents (#fbbf24)
- 🟥 Red card danger buttons (#dc2626)
- Modern glassmorphism effects
- Smooth animations and transitions

### Responsive Design
- Mobile-friendly layout
- Responsive tables
- Touch-optimized buttons
- Adaptive navigation

## 🧪 Testing Coverage

Backend unit tests cover:
- ✅ Password hashing and comparison
- ✅ JWT token generation and verification
- ✅ Email format validation
- ✅ Password strength validation
- ✅ Authentication middleware
- ✅ RBAC authorization

Run tests: `cd backend && npm test`

## 🔒 Security Best Practices

1. **Password Security**: bcrypt hashing with salt rounds
2. **Token Security**: JWT with expiration and secret key
3. **Input Validation**: express-validator on all inputs
4. **CORS**: Configured for secure cross-origin requests
5. **Environment Variables**: Sensitive data in .env files
6. **Protected Routes**: Middleware authentication checks
7. **Status Checks**: Inactive users cannot login

## 📝 Default Users

To test admin functionality, you can create an admin user manually in MongoDB:
```javascript
{
  "fullName": "Admin User",
  "email": "admin@example.com",
  "password": "<hashed_password>",
  "role": "admin",
  "status": "active"
}
```

Or modify a regular user's role to "admin" after signup.

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Ensure port 5000 is available

### Frontend can't connect to backend
- Verify `VITE_API_URL` points to correct backend URL
- Check CORS configuration
- Ensure backend is running

### Authentication issues
- Clear localStorage and try again
- Check JWT_SECRET matches between requests
- Verify token hasn't expired

## 📚 Additional Notes

- All routes use centralized routing in `backend/routes/index.js`
- Server uses `connectDb().then()` pattern as requested
- RBAC implemented via middleware for clean separation
- Code is concise but covers essential edge cases
- Football theme provides engaging, modern UI

## 👨‍💻 Author

Built for the Purple Merit Technologies assessment

---

⚽ **Enjoy managing your team!**
