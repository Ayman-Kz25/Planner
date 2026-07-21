# 📝 Planner

A modern, responsive task management application built with **React** and **Vite**.  
This app helps you organize tasks by category, status, priority, and due date, with support for editing, deleting, and calendar-based viewing.

Designed with clean architecture, reusable components, and scalable state management.

---

## ✨ Features

- ✅ Create, edit, and delete tasks
- 🗂️ Categorize tasks (Work, Personal, Study)
- 🔍 Filter tasks by:
  - Status (Todo, In Progress, Completed)
  - Priority (Low, Medium, High)
  - Due Date (Overdue, Today, Upcoming)
- 📆 Calendar view for task deadlines
- 🧭 Category-specific pages
- 🪟 Edit & confirm delete modals
- ⚡ Optimized filtering using `useMemo`
- 🎨 Clean, responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router
- **State Management:** Context API
- **Date Handling:** date-fns
- **Styling:** CSS / Utility classes
- **Data Source:** Firebase-compatible structure (supports Firestore timestamps)

---

## 📁 Project Structure

```txt
src/
├── components/
│   ├── filters/
│   │   └── FilterBar.jsx
│   ├── layout/
│   │   ├── AppLayout.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── task/
│   │   ├── AddTaskModal.jsx
│   │   └── ConfirmDeleteModal.jsx
│   │   ├── EditTaskModal.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskDetailModal.jsx
│   └── ui/
│       └── EmptyState.jsx
│   └── CalendarView.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── firebase/
│   ├── auth.js
│   ├── firebase.config.js
│   └── firestore.js
│
├── pages/
│   └── CalendarPage.jsx
│   ├── CategoryPage.jsx
│   ├── CompletedPage.jsx
│   ├── DashboardPage.jsx
│   └── InProgressPage.jsx
│
├── services/
│   └── taskService.js
│
├── utils/
│   └── filterTasks.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ by **Ayman Kz**
