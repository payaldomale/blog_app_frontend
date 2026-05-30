# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


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
