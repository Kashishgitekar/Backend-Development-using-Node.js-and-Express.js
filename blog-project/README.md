# 📝 Full Stack Blog Application

A complete full-stack blog platform built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and a vanilla **HTML/CSS/JavaScript** frontend. Features secure JWT authentication, full CRUD for blog posts, search, and category filtering — with a responsive, mobile-friendly UI.

## ✨ Features

- **User Authentication** — Register & login with bcrypt-hashed passwords and JWT tokens
- **Full CRUD** — Create, read, update, and delete blog posts (authors only)
- **My Dashboard** — View and manage your own posts
- **Search** — Live, case-insensitive search across titles and content
- **Categories** — 7 categories (general, tech, lifestyle, education, travel, food, other) with filtering
- **Responsive UI** — Works on desktop, tablet, and mobile
- **XSS-safe rendering** — All user content is HTML-escaped in the frontend

## 🛠 Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB with Mongoose ODM           |
| Auth      | bcryptjs (hashing), JWT (tokens)    |
| Frontend  | Vanilla HTML5, CSS3, JavaScript     |

## 📁 Project Structure

```
blog-project/
├── server.js                  # Express app + DB connection + static hosting
├── models/
│   ├── User.js                # User schema (name, email, hashed password)
│   └── Blog.js                # Blog schema (title, content, author, category)
├── controllers/
│   ├── userController.js      # register, login
│   └── blogController.js      # CRUD + search + my-blogs
├── routes/
│   ├── userRoutes.js          # /api/register, /api/login
│   └── blogRoutes.js          # /api/blogs routes (protected where needed)
├── middleware/
│   └── auth.js                # JWT verification middleware
├── frontend/                  # Static client served by Express
│   ├── index.html             # Login / Register
│   ├── blogs.html             # All blogs + search + category filter
│   ├── blog.html              # Single blog details
│   ├── dashboard.html         # My blogs (edit/delete)
│   ├── create.html            # New blog form
│   ├── edit.html              # Edit blog form
│   ├── config.js              # Shared API URL + esc() helper
│   └── style.css              # Shared responsive styles
└── .env                       # Environment variables (not committed)
```

## 🔌 API Endpoints

| Method | Endpoint             | Auth | Description                          |
| ------ | -------------------- | ---- | ------------------------------------ |
| POST   | `/api/register`      | ❌   | Register a new user                  |
| POST   | `/api/login`         | ❌   | Login, returns JWT                   |
| GET    | `/api/blogs`         | ❌   | All blogs (`?search=`, `?category=`) |
| GET    | `/api/blogs/:id`     | ❌   | Single blog details                  |
| GET    | `/api/blogs/my`      | ✅   | Logged-in user's blogs               |
| POST   | `/api/blogs`         | ✅   | Create a blog                        |
| PUT    | `/api/blogs/:id`     | ✅   | Update own blog                      |
| DELETE | `/api/blogs/:id`     | ✅   | Delete own blog                      |

## 🚀 Getting Started (Local)

### Prerequisites
- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### Setup

```bash
git clone https://github.com/Kashishgitekar/Backend-Development-using-Node.js-and-Express.js.git
cd Backend-Development-using-Node.js-and-Express.js/blog-project
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/blog-project
JWT_SECRET=your_secret_here
```

Run the server:

```bash
npm start        # production
npm run dev      # nodemon for development
```

Open **http://localhost:5000** — the frontend is served by the same server.

## ☁️ Deployment

### Render (recommended for this app — serves API + frontend together)

1. Push this repo to GitHub.
2. On [render.com](https://render.com), create a **New Web Service** connected to the repo.
3. Configure:
   - **Root Directory:** `blog-project`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `MONGODB_URI` = your MongoDB Atlas connection string
     - `JWT_SECRET` = a strong random secret
4. Deploy. Your app is live at `https://your-app.onrender.com`.

### MongoDB Atlas (free cloud database)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Add a database user and allow network access from `0.0.0.0/0` (or Render's IPs).
3. Use the connection string as `MONGODB_URI`.

> **Note:** `frontend/config.js` auto-detects the API URL — on localhost it calls `http://localhost:5000/api`, and when deployed it calls the same origin (`/api`), so no code changes are needed after deployment.

## 🔒 Security Notes

- Passwords are never stored in plain text — hashed with bcrypt (10 salt rounds)
- Password field is excluded from all default queries (`select: false`)
- JWTs expire after 1 day
- Update/delete operations are scoped to the authenticated author
- Frontend escapes all rendered user content to prevent XSS

## 📄 License

MIT
