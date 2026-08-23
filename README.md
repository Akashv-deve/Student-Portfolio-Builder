# 🚀 Student Portfolio Builder

A full-stack SaaS platform that helps students and developers create, customize, and publish professional portfolios without building a portfolio website from scratch.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=111111)](https://render.com/)

## 🌐 Live Application

**[Open Student Portfolio Builder](https://student-portfolio-builder-eta.vercel.app/)**

---

## 📸 Screenshots

### Landing Page

![Landing Page](./screenshots/landing.png)

### Builder Dashboard

![Builder Dashboard](./screenshots/dashboard.png)

---

## 🎯 What the Project Does

Student Portfolio Builder is a full-stack SaaS application that allows users to:

- Create and manage their portfolio
- Edit portfolio information through a builder interface
- Preview portfolio changes in real time
- Publish a portfolio using a unique URL slug
- Upload profile and project images
- Sign in using email/password or GitHub
- Upgrade to a Pro tier through Razorpay
- Track visits to published portfolios

---

## ✨ Key Features

### 🔐 Dual Authentication

- Email/password authentication using JWT
- GitHub OAuth login
- Protected backend routes

### 🔗 Dynamic Portfolio URLs

Each user receives a unique public slug, for example:

```text
https://student-portfolio-builder-eta.vercel.app/akash-v
