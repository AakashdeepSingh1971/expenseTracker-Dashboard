## 🧾 Expense Tracker Dashboard

### 🧩 Summary of Recent Changes

This project has been **migrated from the Lovable Cloud stack** to a **self-hosted full-stack architecture** powered by:

* 🧠 **MongoDB Atlas** for database and data persistence
* ☁️ **UploadThing** for secure, scalable receipt uploads
* ⚙️ **Node.js + Express** backend for RESTful APIs
* ⚡ **React + Vite + ShadCN/UI** frontend for a modern user experience

This migration improves performance, scalability, and developer control while removing dependency on external cloud services.

---

### 🚀 Overview

**Fin Insight Lab** is a personal finance management dashboard that allows users to track expenses, visualize spending trends, upload receipts, and manage budgets — built with a fully modular, type-safe stack.

---

### 🧠 Tech Stack

| Layer          | Tech                                                             |
| -------------- | ---------------------------------------------------------------- |
| **Frontend**   | React 18, TypeScript, Vite, ShadCN/UI, TailwindCSS, Lucide Icons |
| **Backend**    | Node.js, Express, TypeScript                                     |
| **Database**   | MongoDB Atlas (Mongoose)                                         |
| **Uploads**    | UploadThing                                                      |
| **Auth**       | JWT (JSON Web Tokens)                                            |
| **Validation** | Zod                                                              |
| **Animations** | Framer-Motion                                                    |
| **API Calls**  | Axios                                                            |

---

### 📦 Project Structure

```
fin-insight-lab-01/
├── backend/
│   ├── server.ts             # Express server entry
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   └── .env                  # Backend environment variables
│
├── src/                      # Frontend (React)
│   ├── components/           # UI components
│   ├── pages/                # App pages (Dashboard, Login, etc.)
│   ├── lib/                  # Helpers (API fetch, storage)
│   ├── hooks/                # Custom React hooks
│   └── main.tsx              # Frontend entry
│
├── .env                      # Global environment (Frontend)
├── .gitignore
└── README.md
```

---

### ⚙️ Environment Setup

#### 🧩 Frontend `.env`

```bash
VITE_API_URL=http://localhost:4000
UPLOADTHING_APP_ID=your_uploadthing_app_id
UPLOADTHING_SECRET=your_uploadthing_secret
```

#### 🧩 Backend `.env`

```bash
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/expenses
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
JWT_SECRET=your_jwt_secret
```

> ⚠️ **Never commit `.env` files.** Use `.env.example` for placeholders.

---

### 🧠 Installation & Running Locally

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/fin-insight-lab-01.git
cd fin-insight-lab-01
```

#### 2️⃣ Install dependencies

```bash
npm install
cd backend && npm install
cd ..
```

#### 3️⃣ Run development servers (frontend + backend together)

```bash
npm run dev
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:4000](http://localhost:4000)

---

### 🌐 API Endpoints

| Method   | Endpoint             | Description             |
| -------- | -------------------- | ----------------------- |
| `POST`   | `/api/auth/register` | Register a new user     |
| `POST`   | `/api/auth/login`    | Login and get JWT token |
| `GET`    | `/api/expenses`      | Get all user expenses   |
| `POST`   | `/api/expenses`      | Add new expense         |
| `DELETE` | `/api/expenses/:id`  | Delete expense          |
| `GET`    | `/api/stats`         | Get spending statistics |

---

### 🧾 UploadThing (Receipts)

* Upload receipts through the **Add Expense** dialog.
* Files are uploaded securely using **UploadThing** and linked to the MongoDB record.
* Ensure your UploadThing keys are correctly configured in `.env`.

---

### 🧰 Scripts

| Command                        | Description                         |
| ------------------------------ | ----------------------------------- |
| `npm run dev`                  | Run frontend + backend concurrently |
| `npm run dev --prefix backend` | Run backend only                    |
| `npm run build`                | Build frontend                      |
| `npm run start`                | Start production server             |

---

### 📊 Features

✅ Expense tracking with categories, date, and description
✅ Receipt uploads using UploadThing
✅ Real-time analytics dashboard
✅ Secure JWT authentication
✅ MongoDB persistence
✅ Modern responsive UI (ShadCN + TailwindCSS)
✅ Fully TypeScript & Zod-validated codebase

---

### 🧠 Troubleshooting

| Issue                         | Solution                                  |
| ----------------------------- | ----------------------------------------- |
| **Port 4000 already in use**  | `npx kill-port 4000`                      |
| **Uploads not working**       | Check UploadThing keys in `.env`          |
| **MongoDB connection failed** | Verify connection string and IP whitelist |
| **Invalid JWT**               | Logout and login again                    |

---

### 🪪 License
