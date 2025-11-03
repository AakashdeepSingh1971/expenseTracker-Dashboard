## 💰 Expense Tracker Dashboard

A modern, interactive **Spending Analytics Dashboard** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** — helping users manage and visualize their expenses with charts, category breakdowns, and smart insights.

---

### 🚀 Features

- 🔐 **JWT Authentication** (Login & Signup with token-based sessions)
- 📊 **Dynamic Spending Charts** – visualizes monthly expenses and categories
- 💡 **Smart Stats Cards** – total spent, savings, top categories & comparisons
- 📁 **File Uploads** (receipts via `uploadthing`)
- 🧾 **Recent Transactions** – with date formatting and quick previews
- ⚙️ **Fully Modular API** routes under `/app/api`
- 🎨 **UI Components** powered by ShadCN + Framer Motion animations
- 💬 **Toast notifications** using `sonner`
- 💻 **Type-safe** backend & frontend with TypeScript and Zod validation

---

### 🧩 Tech Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| **Frontend**      | Next.js (App Router), React 19, TypeScript |
| **Styling**       | Tailwind CSS, ShadCN/UI, Framer Motion     |
| **Backend**       | Next.js API Routes, JWT Auth, MongoDB      |
| **Validation**    | Zod                                        |
| **Database**      | Mongoose (MongoDB)                         |
| **Notifications** | Sonner                                     |
| **Data Fetching** | React Query + native fetch helper          |

---

### 🛠️ Setup & Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/expenseTracker-Dashboard.git
   cd expenseTracker-Dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Create `.env.local`**

   ```bash
   JWT_SECRET=your-secret-key
   MONGODB_URI=your-mongodb-uri
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   App runs at 👉 [http://localhost:3000](http://localhost:3000)

---

### 🧱 Project Structure

```
app/
 ├── api/              # Backend API routes
 │    ├── auth/        # Login, Signup, Me
 │    └── expenses/    # Expense CRUD + Stats
 ├── components/       # UI and Dashboard Components
 ├── lib/              # API helpers, JWT utils, DB setup
 ├── models/           # MongoDB Models (User, Expense)
 ├── auth/page.tsx     # Auth UI (Login/Signup)
 ├── page.tsx          # Main Dashboard
 ├── layout.tsx        # Root layout
 └── NotFound.tsx      # Custom 404
```

---

### 📈 Future Enhancements

- 🔍 Advanced search & filtering
- 📆 Date range analytics
- 🧾 Export transactions (CSV/PDF)
- 📱 Mobile-friendly PWA support
- 💳 AI-based spending categorization

---

### 🧑‍💻 Author

**Developed by:** [Your Name]
✨ Built with passion for clean design and insightful data visualization.
