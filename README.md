# 🚀 Student Portfolio Builder (SaaS)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)

**Live Application:** [student-portfolio-builder-eta.vercel.app](https://student-portfolio-builder-eta.vercel.app/)

A full-stack Software-as-a-Service (SaaS) platform designed to help students and developers instantly deploy production-grade, ATS-friendly portfolios. The platform features dynamic sub-routing, secure authentication, cloud media storage, and a monetized premium tier.

---

## 📸 Platform Previews

![Landing Page](./screenshots/landing.png)
*Modern, highly responsive landing page.*

![Dashboard & Form](./screenshots/dashboard.png)
*Real-time builder dashboard with live template previews.*

---

## 🎯 Key Features & Architecture

* **Multi-Tenant Dynamic Routing:** Users claim a unique URL slug (e.g., `.../akash-v`). The frontend parses the URL, queries the REST API, and dynamically renders the requested user's data into their selected template.
* **Dual Authentication System:** Secured using JSON Web Tokens (JWT) for standard Email/Password login, alongside GitHub OAuth integration for frictionless developer onboarding.
* **Premium Monetization (Razorpay):** Integrated Razorpay payment gateway with server-side signature verification (HMAC SHA256) to securely handle upgrades to the "Pro" tier, unlocking premium templates.
* **Cloud Media Pipeline:** Implemented `multer` for memory buffering and `Cloudinary` for secure, optimized image hosting (profile avatars and project thumbnails), keeping the MongoDB database lightweight.
* **Real-Time Analytics:** Built-in view tracking that increments via MongoDB `$inc` operators whenever a public portfolio is visited.

---

## 🛠️ Technical Stack

**Frontend:**
* React.js (Vite)
* React Router DOM (Dynamic Routing)
* Fully custom CSS (Zero external UI libraries/Bootstrap)
* Hosted on Vercel

**Backend:**
* Node.js & Express.js
* MongoDB Atlas & Mongoose (Schema validation & aggregation)
* Cloudinary API (Media delivery)
* Razorpay API (Payment processing)
* Hosted on Render

---

## 💻 Local Development Setup

To run this project locally, you will need Node.js and a MongoDB instance running.

### 1. Clone the repository
```bash
git clone [https://github.com/Akashv-deve/Student-Portfolio-Builder.git](https://github.com/Akashv-deve/Student-Portfolio-Builder.git)
cd Student-Portfolio-Builder

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongo_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
FRONTEND_URL=http://localhost:5173
\`\`\`
Run the server: `npm run dev`

### 3. Frontend Setup
\`\`\`bash
cd ../frontend
npm install
\`\`\`
Create a `.env` file in the `frontend` directory:
\`\`\`env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
\`\`\`
Run the client: `npm run dev`

---
*Architected and developed by Akash V.*