# 🌊 Travel-Tide

A full-stack **travel booking platform** built as a graduation project.  
Travel-Tide allows users to explore destinations, search and book **flights**, **hotels**, and **guided tours**, manage bookings, make secure payments, and leave reviews.

---

## ✨ Features

- **User & Guide Accounts**
  - Sign up / login with JWT authentication.
  - Separate flows for **tourists** and **guides**.
  - Persistent login state with localStorage.

- **Search & Browse**
  - Flights, hotels, countries, cities, and tourist sites.
  - Filtering and dynamic search.

- **Bookings**
  - Create and confirm bookings including flights, hotels, and guides.
  - Track booking history.

- **Payments**
  - Secure **Stripe** integration for payment intents and checkout.

- **Reviews**
  - Users can post reviews and ratings after verified bookings.

- **Guides**
  - Guide profiles and daily itineraries (guide daily sites).
  - Booking integration with tourists.

---

## 🛠️ Tech Stack

### Frontend
- [React 19](https://react.dev/) (CRA)
- React Router, Redux Toolkit, React Query
- Axios, Bootstrap 5, GSAP animations
- Stripe.js + React Stripe
- React Hot Toast, React Icons

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- PostgreSQL (`pg` with connection pooling)
- JWT authentication
- bcryptjs (password hashing)
- Multer (image/file upload)
- Stripe API integration

---

## 📂 Project Structure

```
Travel-Tide/
├── backend/         # Express server & PostgreSQL queries
│   ├── routes/      # API routes (users, guides, hotels, flights, bookings, reviews, payments, etc.)
│   ├── controllers/ # Controllers for domain logic
│   ├── models/      # Database queries
│   ├── db.js        # PostgreSQL connection
│   └── server.js    # App entry point
│
├── FrontEnd/        # React application
│   ├── src/
│   │   ├── components/  # UI components (cards, forms, modals, etc.)
│   │   ├── pages/       # App pages (SignIn, Home, FlightsPage, HotelsPage, ProfilePage, etc.)
│   │   ├── redux/       # State management slices
│   │   └── context/     # Auth context
│   └── public/          # Assets
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) running locally or via Docker
- A [Stripe account](https://stripe.com/) for payment integration

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```
DATABASE_URL=postgres://<user>:<password>@localhost:5432/travel-tide
JSON_WEB_TOKEN_SECRET_KEY=your_jwt_secret
STRIP_SECRET_KEY=your_stripe_secret
```

Run backend:
```bash
npm start
```
Server runs on: **http://127.0.0.1:6600**

### Frontend Setup
```bash
cd FrontEnd
npm install
npm start
```

React app runs on: **http://localhost:3000**

---

## 🔑 API Endpoints

Base URL: `/api`

- **Auth**
  - `POST /users/signup` | `POST /users/login`
  - `POST /guides/login`
- **Flights**: `GET /flights/roundtrips`, `GET /flights/:id`
- **Hotels**: `GET /hotels/`, `POST /hotels/`
- **Bookings**: `POST /bookings`, `PATCH /bookings/confirm/:id`
- **Reviews**: `POST /reviews`, `GET /reviews`
- **Payments**: `POST /create-payment-intent`

---

## 📸 Screenshots (suggested)
- Home page with search box
- Flight/Hotel results
- Booking checkout
- Payment form
- Guide profile & reviews

---

## 📌 Notes
- Current environment variables (`DATABASE_URL`, `STRIP_SECRET_KEY`, `JSON_WEB_TOKEN_SECRET_KEY`) must be set before running.
- Localhost URLs are hardcoded for development (`http://127.0.0.1:6600` for backend).

---

## 👥 Authors
- Developed by **Omar Sami Ali Alkhader** and team as a graduation project.
