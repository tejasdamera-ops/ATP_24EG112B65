# Week 7 - Capstone Blog Application

## Objective

Build a full-stack blog application using the MERN stack with authentication, role-based authorization, article management, comments, admin controls, image upload, and protected frontend routes.



## Backend Blog App

Location: `BlogApp/Backend-BlogApp`

Files:

- `server.js`
- `APIs/UserAPI.js`
- `APIs/AuthorAPI.js`
- `APIs/AdminAPI.js`
- `APIs/CommonAPI.js`
- `models/UserModel.js`
- `models/ArticleModel.js`
- `middlewares/verifyToken.js`
- `config/cloudinary.js`
- `config/cloudinaryUpload.js`
- `config/multer.js`

- Public article reading.
- User comments on articles.
- Author article creation and editing.


## Frontend Blog App

Location: `BlogApp/Frontend-BlogApp`

Files:

- `src/App.jsx`
- `src/components/RootLayout.jsx`
- `src/components/Home.jsx`
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/components/Register.jsx`
- `src/components/Login.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/components/Unauthorized.jsx`
- `src/components/UserProfile.jsx`
- `src/components/UserList.jsx`
- `src/components/AuthorsList.jsx`
- `src/components/AuthorProfile.jsx`
- `src/components/AuthorArticles.jsx`
- `src/components/Articles.jsx`
- `src/components/ArticleByID.jsx`
- `src/components/WriteArticles.jsx`
- `src/components/EditArticle.jsx`
- `src/components/AdminProfile.jsx`
- `src/stores/authStore.js`
- `src/styles/common.js`

## Frontend Features

- React app using Vite.
- Client-side routing using React Router.
- Nested routes for author profile pages.
- Protected routes for `USER`, `AUTHOR`, and `ADMIN`.
- Login and logout using Zustand auth store.

## Outcome

This capstone combines backend APIs, database models, authentication, authorization, frontend routing, state management, and UI pages into one complete blog application.