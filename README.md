# Student Manager

A clean, modern Student Manager web app built with **vanilla HTML, CSS and JavaScript** — no frameworks, no backend, no build step required.

## Features

- ➕ **Add** students with Name, Mobile Number, and Address
- ✏️ **Edit** any student inline (form switches to edit mode)
- 🗑️ **Delete** students with a confirmation prompt
- 🔍 **Search** students live by name or mobile number
- ✅ **Validation** — required fields, 10-digit mobile check, duplicate mobile detection
- 💾 **Persistence** — data is saved to the browser's `localStorage`, so it survives page reloads
- 🔔 Toast notifications for add/update/delete actions
- 📱 Fully responsive layout (works on mobile and desktop)
- 🎨 Polished UI — gradient accents, card-based layout, avatars with initials, smooth animations

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Flexbox + Grid, custom properties, Google Fonts — Poppins) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` (no backend/database needed) |

## Project Structure

```
student-manager/
├── index.html      # App markup
├── style.css        # Styling
├── script.js         # CRUD logic + localStorage
└── README.md
```

## How to Run

No installation needed:

1. Unzip the project folder.
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox).

That's it — the app runs entirely client-side.

## How it Works

- All student records are stored as an array of objects in `localStorage` under the key `students_data_v1`.
- Each student has a unique `id` generated from a timestamp + random string.
- The form doubles as both the "Add" and "Edit" form — clicking the ✏️ edit icon on a student card populates the form and switches it into edit mode (with a Cancel option).
- Deleting a student asks for confirmation before removing it from storage.
- The search box filters the visible list in real time by name or mobile number, without touching the underlying stored data.

## Possible Extensions

If you want to take this further for extra credit:
- Add sorting (by name / most recently added)
- Add pagination for large student lists
- Export the student list to CSV
- Add a student photo/avatar upload
- Move storage to a real backend (e.g. Node.js + Express + MongoDB) for multi-device sync
