import React from 'react';
import ProfileForm from '../components/ProfileForm';
import "./styles/ProfilePage.css"; 
import "./styles/NavBar.css"; 
import "./styles/global.css"; 

function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;