@echo off
echo ======================================
echo   Git Commit Script - Frontend
echo ======================================
echo.

REM Commit 3: Frontend Setup
echo [Step 3/15] Adding Frontend Setup...
git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/main.jsx frontend/src/App.jsx frontend/public/
git commit -m "feat: initialize React frontend with Vite

- Set up Vite build configuration with React plugin
- Configure development server with API proxy  
- Add React Router for navigation
- Create App component with routing structure
- Install core dependencies (react-router-dom, axios, zustand, react-icons)"
echo.

REM Commit 4: State Management
echo [Step 4/15] Adding State Management...
git add frontend/src/store/ frontend/src/api/
git commit -m "feat: implement Zustand state management and API client

- Create authStore with login, signup, logout actions
- Set up Axios instance with interceptors
- Add JWT token handling in requests
- Implement automatic token refresh logic"
echo.

REM Commit 5: Tailwind CSS
echo [Step 5/15] Adding Tailwind CSS...
git add frontend/tailwin.config.js frontend/postcss.config.js frontend/src/index.css
git commit -m "feat: integrate Tailwind CSS with custom design system

- Configure Tailwind with PostCSS and Autoprefixer
- Define custom color palette (pitch-green, slate tones)
- Add custom animations (slide-in, fade-in, scale-in)
- Set up dark theme foundation"
echo.

REM Commit 6: Auth Pages
echo [Step 6/15] Adding Authentication Pages...
git add frontend/src/pages/Signup.jsx frontend/src/pages/Login.jsx
git commit -m "feat: create premium authentication pages with Tailwind

- Design dark-themed signup page with glassmorphism
- Implement real-time password strength indicator (5 levels)
- Create matching login page with smooth animations
- Add inline loading spinners for form submissions
- Implement client-side validation with error feedback"
echo.

REM Commit 7: Protected Routes
echo [Step 7/15] Adding Protected Routes...
git add frontend/src/components/ProtectedRoute.jsx
git commit -m "feat: implement protected routes and role-based access

- Create ProtectedRoute wrapper component
- Add role-based route protection
- Implement automatic redirect for unauthenticated users"
echo.

REM Commit 8: Navbar
echo [Step 8/15] Adding Navbar Component...
git add frontend/src/components/Navbar.jsx
git commit -m "feat: design premium responsive navbar

- Create sticky navbar with backdrop blur
- Add gradient logo icon with hover effects
- Implement responsive navigation (mobile/desktop)
- Add user info badge with role display
- Style logout button with proper states"
echo.

REM Commit 9: Profile Page
echo [Step 9/15] Adding User Profile Page...
git add frontend/src/pages/UserProfile.jsx
git commit -m "feat: create unified user profile page

- Design single-card layout with avatar header
- Integrate profile editing and password management
- Add role and status badges with color coding
- Implement inline edit mode with save/cancel actions
- Add toast notifications for API feedback"
echo.

REM Commit 10: Admin Dashboard
echo [Step 10/15] Adding Admin Dashboard...
git add frontend/src/pages/AdminDashboard.jsx
git commit -m "feat: implement complete admin dashboard

- Create 4 KPI statistics cards
- Design premium data table with proper headers
- Add color-coded role and status badges
- Implement activate/deactivate actions with modal
- Add pagination controls
- Include responsive layout"
echo.

REM Commit 11: LoadingSpinner
echo [Step 11/15] Adding LoadingSpinner Component...
git add frontend/src/components/LoadingSpinner.jsx
git commit -m "feat: create animated loading spinner component

- Design spinning ring with football icon
- Add pulsing animation for center icon
- Include 'Loading...' text below spinner
- Use pitch-green accent color"
echo.

REM Commit 12: Toast
echo [Step 12/15] Adding Toast Notifications...
git add frontend/src/components/Toast.jsx
git commit -m "feat: implement toast notification system

- Create slide-in animation from right
- Add color-coded backgrounds (success/error/info)
- Include matching icons for each type
- Add close button with smooth transitions
- Implement 4-second auto-dismiss"
echo.

REM Commit 13: Modal
echo [Step 13/15] Adding Modal Dialog...
git add frontend/src/components/Modal.jsx
git commit -m "feat: design confirmation modal dialog

- Add backdrop blur overlay with fade animation
- Create warning icon in header
- Implement scale-in modal appearance
- Style Cancel/Confirm buttons
- Add click-outside-to-close functionality"
echo.

REM Commit 14: README
echo [Step 14/15] Adding Documentation...
git add README.md
git commit -m "docs: add comprehensive project documentation

- Add project overview and features
- Document tech stack and architecture
- Include setup and installation instructions
- Add API endpoints documentation
- Include deployment information"
echo.

REM Commit 15: Config Files
echo [Step 15/15] Adding Configuration Files...
git add .gitignore backend/.gitignore frontend/.gitignore
git commit -m "chore: add configuration and environment files

- Create .gitignore for node_modules and .env
- Add .env.example with required variables
- Document environment setup process"
echo.

echo ======================================
echo   All commits completed!
echo ======================================
echo.
echo To view your commits:
echo   git log --oneline
echo.
echo To push to GitHub:
echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
echo   git push -u origin main
echo.
