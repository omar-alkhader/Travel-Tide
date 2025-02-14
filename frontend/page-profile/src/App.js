import React from 'react';
import './App.css';
import ProfileForm from './components/ProfileForm';

function App() {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">TravelTide</div>
          <ul className="nav-links">
            <li><a href="#">Packages</a></li>
            <li><a href="#">Flight</a></li>
            <li><a href="#">Hotel</a></li>
            <li><a href="#">My Booking</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <ProfileForm />
      </main>
      <footer>
        <p>About Us</p>
        <p>Contact us at: traveltide@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
