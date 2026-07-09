# 📝 Blog-App — AI Powered Medium Clone

A full-stack blogging platform inspired by **Medium**, built with a modern web stack. The application allows users to create, manage, and interact with blog posts while providing AI-powered writing assistance features like title generation, summaries, tags, grammar correction, and writing improvements.

---

# 🚀 Features

## 🔐 Authentication

* User signup and login
* JWT-based authentication
* Protected routes
* Secure password hashing
* User session management

---

# 👤 User Features

* Create user profile
* Update profile information
* Add bio and avatar
* View user profiles
* View user's posts
* Manage account settings

---

# ✍️ Post Management

Complete CRUD functionality:

* Create posts
* Read posts
* Update posts
* Delete posts
* Publish drafts
* Save draft posts
* View published posts
* View posts by user
* Search posts

Post features:

* Title
* Slug generation
* Rich content
* Publishing status
* Like count
* Comment count
* Tags

---

# 💬 Comment System

Users can:

* Add comments
* View comments on posts
* Update comments
* Delete comments

---

# ❤️ Like System

Implemented many-to-many relationship between users and posts.

Features:

* Like posts
* Unlike posts
* Prevent duplicate likes
* Track post popularity

---

# 🏷️ Tag System

Features:

* Create tags
* Attach tags to posts
* Filter posts by tags
* Discover related content

---

# 🔍 Search, Sorting & Filtering

Supported queries:

### Pagination

```
GET /posts?page=1&limit=10
```

### Sorting

```
GET /posts?sortBy=like_count&order=desc
```

### Filtering

```
GET /posts?status=published
```

```
GET /posts?userId=5
```

### Combined Query

```
GET /posts?page=1&limit=10&sortBy=like_count&order=desc&status=published
```

---

# 🤖 AI Writing Assistant

The application includes AI-powered writing tools.

## Features

### Generate Title

Creates relevant blog titles from content.

---

### Generate Summary

Creates short summaries of long articles.

---

### Generate Tags

Automatically suggests suitable tags.

---

### Improve Writing

Enhances readability and writing quality.

---

### Grammar Correction

Fixes grammar and sentence structure.

---

# 🏗️ Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Zustand
* TanStack Query
* React Hook Form
* Zod
* Tiptap Editor

---

## Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* Middleware-based architecture

---

## Database

* PostgreSQL
* Neon PostgreSQL

---

## Deployment

| Application Part | Platform        |
| ---------------- | --------------- |
| Frontend         | Vercel          |
| Backend          | Render          |
| Database         | Neon PostgreSQL |
| Source Code      | GitHub          |

---

# 🏛️ System Architecture

```
                 User

                  |
                  |

          React + Vite Frontend

              (Vercel)

                  |

              REST API

                  |

       Node.js + Express Backend

              (Render)

                  |

           PostgreSQL Database

              (Neon)
```

---

# 🗄️ Database Design

## Entity Relationship

```
User
 |
 | One-to-Many
 |
Post
 |
 | One-to-Many
 |
Comment


User
 |
 | Many-to-Many
 |
Post
 |
 |
Like


Post
 |
 | Many-to-Many
 |
Tag
```

---

# Database Tables

## Users

Stores user information.

Fields:

```
id
username
email
password_hash
bio
avatar_url
created_at
updated_at
```

---

## Posts

Stores blog content.

Fields:

```
id
author_id
title
slug
content
status
like_count
comment_count
published_at
created_at
updated_at
```

---

## Comments

Stores user comments.

Fields:

```
id
post_id
author_id
content
created_at
updated_at
```

---

## Likes

Stores post likes.

Composite Primary Key:

```
(user_id, post_id)
```

---

## Tags

Stores post categories.

Fields:

```
id
name
created_at
```

---

## Post Tags

Join table:

```
post_id
tag_id
```

---

# 🔌 API Documentation

## Authentication API

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/login
```

---

# User API

### Get User

```
GET /api/users/:id
```

### Update Profile

```
PUT /api/users/profile
```

### Delete User

```
DELETE /api/users/:id
```

---

# Post API

### Create Post

```
POST /api/posts
```

### Get All Posts

```
GET /api/posts
```

### Get Single Post

```
GET /api/posts/:slug
```

### Update Post

```
PUT /api/posts/:id
```

### Delete Post

```
DELETE /api/posts/:id
```

### Publish Draft

```
PATCH /api/posts/:id/publish
```

---

# Comment API

### Create Comment

```
POST /api/posts/:id/comments
```

### Get Comments

```
GET /api/posts/:id/comments
```

### Update Comment

```
PUT /api/comments/:id
```

### Delete Comment

```
DELETE /api/comments/:id
```

---

# Like API

### Like Post

```
POST /api/posts/:id/like
```

### Unlike Post

```
DELETE /api/posts/:id/like
```

---

# Tag API

### Create Tag

```
POST /api/tags
```

### Attach Tag

```
POST /api/posts/:id/tags
```

### Filter By Tags

```
GET /api/posts?tag=technology
```

---

# 📂 Frontend Structure

```
src
|
├── api
|
├── components
|
├── features
│   |
│   ├── auth
│   ├── posts
│   ├── comments
│   └── ai
|
├── hooks
|
├── pages
|
├── store
|
├── routes
|
└── layouts
```

---

# 📂 Backend Structure

```
backend
|
├── controllers
|
├── routes
|
├── middleware
|
├── services
|
├── models
|
├── validators
|
├── utils
|
└── config
```

---

# 🔒 Security Features

Implemented:

* JWT authentication
* Password hashing
* Protected API routes
* Environment variables
* CORS configuration
* Database constraints

---

# 🚀 Deployment Architecture

```
GitHub

 |
 |

Frontend Repository

 |
 |

Vercel Deployment


Backend Repository

 |
 |

Render Deployment


Render Backend

 |
 |

Neon PostgreSQL
```

---

# ⚙️ Environment Variables

## Backend

`.env`

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

---

## Frontend

`.env`

```env
VITE_API_URL=
```

---

# 📦 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Future Improvements

## Planned Features

* TypeScript migration
* Next.js version
* GraphQL API
* Refresh token authentication
* Email verification
* Password reset
* Role-based authentication
* Image uploads
* Infinite scrolling
* Draft autosave
* Notifications
* Real-time comments
* AI streaming responses
* Dark mode
* Advanced animations

---

# Learning Outcomes

This project demonstrates:

* Full-stack application development
* REST API design
* Database modeling
* Authentication systems
* Cloud deployment
* Modern React architecture
* AI feature integration
* Production-oriented engineering practices

---

# Author

Built as a full-stack portfolio project demonstrating modern web development and AI-powered user experiences.

## Guide from start

# 🚀 BLOG FRONTEND SETUP (React + Vite + Tailwind + TanStack Query)

## 🧠 Project Goal
Build a Medium-like blog platform with:
- Infinite scroll feed
- Rich text editor
- Authentication
- Future AI features

---

# ⚙️ FINAL WORKING VERSIONS

```txt
React: 18.2.0
React DOM: 18.2.0
Vite: 8.0.14
Tailwind CSS: 4.3.0
Node: LTS recommended

# STEPS

🚀 1. PROJECT CREATION
npm create vite@latest frontend
cd frontend
npm install

Select:

React
JavaScript
⚛️ 2. REACT VERSION FIX (IMPORTANT)

If React 19 installed:

npm install react@18.2.0 react-dom@18.2.0

Fix types:

npm install -D @types/react@18 @types/react-dom@18
🎨 3. TAILWIND CSS (v4 SETUP)
Install
npm install -D tailwindcss postcss autoprefixer @tailwindcss/vite
vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
src/index.css
@import "tailwindcss";

❌ DO NOT use:
@tailwind base;
@tailwind components;
@tailwind utilities;

🌐 4. ENV VARIABLES (VITE RULE)
.env
VITE_API_URL=http://localhost:5000/api
Usage
import.meta.env.VITE_API_URL

❌ DO NOT use process.env

🌐 5. AXIOS SETUP
src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
⚡ 6. TANSTACK QUERY SETUP
Install
npm install @tanstack/react-query
main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
🧠 7. FINAL STACK
Core
React 18
Vite
React Router
Data
Axios
TanStack Query
State
Zustand
UI
Tailwind CSS (v4)
Forms
React Hook Form
Zod
Extras
react-hot-toast
react-icons
date-fns
Tiptap (editor)
📁 8. PROJECT STRUCTURE
src/
├── api/
├── components/
├── features/
│   ├── posts/
│   ├── auth/
│   ├── ai/
├── hooks/
├── pages/
├── store/
├── routes/
├── layouts/
⚠️ 9. COMMON ISSUES & FIXES
❌ React 19 installed
npm install react@18.2.0 react-dom@18.2.0
❌ Tailwind not working

Fix:

use @import "tailwindcss"
add @tailwindcss/vite
restart server
❌ PostCSS error
npm install -D @tailwindcss/postcss
❌ Env not working
must use VITE_ prefix
restart dev server
🧠 10. IMPORTANT RULES
NEVER use useEffect for API data → use TanStack Query
NEVER use process.env in Vite
ALWAYS use pagination for feeds
ALWAYS keep UI state separate (Zustand)
🚀 11. DEVELOPMENT FLOW
Setup project
Fix Tailwind
Setup Axios + env
Setup TanStack Query
Build posts feed
Add infinite scroll
Add auth (Zustand)
Add rich editor (Tiptap)
Add AI features later


💡 REAL PROJECT FLOW
User opens homepage
useInfiniteQuery fetches posts
Axios calls backend
TanStack Query caches result
UI renders posts
Scroll triggers next page
More posts load automatically



src/
│
├── api/
│   ├── axios.js          → Axios instance (baseURL, interceptors, auth token handling)
│   └── apiClient.js      → Wrapper for GET/POST/PATCH/DELETE requests
│
├── constants/
│   └── apiEndpoints.js   → All backend API routes (auth, posts, comments, etc.)
│
├── features/
│
│   ├── auth/
│   │   ├── Login.jsx         → Login UI + form handling
│   │   ├── Register.jsx      → Register UI + form handling
│   │   ├── authService.js    → API calls (login, register, logout, me)
│   │   └── authStore.js      → Auth state (user, token, login/logout)
│   │
│   ├── posts/
│   │   ├── Home.jsx          → Feed page (list of posts)
│   │   ├── PostDetails.jsx   → Single post view page
│   │   ├── CreatePost.jsx    → Create post form + editor
│   │   ├── EditPost.jsx      → Edit existing post form
│   │   ├── PostCard.jsx      → Single post preview UI
│   │   ├── PostList.jsx      → List of posts renderer
│   │   ├── postService.js    → Post APIs (CRUD, publish, fetch, etc.)
│   │   │
│   │   ├── comments/
│   │   │   ├── CommentSection.jsx → Show + manage comments UI
│   │   │   ├── CommentForm.jsx    → Add comment UI form
│   │   │   └── commentService.js  → Comment APIs
│   │   │
│   │   ├── likes/
│   │   │   ├── LikeButton.jsx     → Like/unlike button UI
│   │   │   └── likeService.js     → Like APIs
│   │   │
│   │   └── tags/
│   │       ├── TagList.jsx        → Display post tags UI
│   │       └── tagService.js      → Tag APIs
│   │
│   ├── profile/
│   │   ├── Profile.jsx        → User profile page UI
│   │   └── userService.js     → User APIs (profile, update, fetch)
│
├── store/
│   ├── authStore.js      → Auth state (user session, login/logout)
│   ├── postStore.js      → UI state for posts (selected post, filters, etc.)
│   └── uiStore.js        → Global UI state (modals, loaders, theme, etc.)
│
├── components/
│   └── common/
│       ├── Navbar.jsx        → Navigation bar UI
│       ├── Loader.jsx        → Loading spinner UI
│       ├── Pagination.jsx    → Page navigation UI
│       └── Button.jsx        → Reusable button component
│
├── layouts/
│   ├── MainLayout.jsx     → Layout for logged-in pages (Navbar + content)
│   └── AuthLayout.jsx     → Layout for login/register pages
│
├── routes/
│   └── AppRoutes.jsx      → React Router configuration (all routes)
│
├── hooks/
│   └── useDebounce.js     → Debounce input values (search optimization)
│
├── utils/
│   ├── formatDate.js      → Format timestamps to readable date
│   └── slugify.js         → Convert title → URL-friendly slug
│
└── main.jsx              → App entry point (React root rendering)
