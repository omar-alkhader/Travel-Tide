import React from 'react';

function ProfileForm() {
  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  return (
    <section className="ProfilePage-profile-container">
      <h1 className="ProfilePage-profile-header">My Profile</h1>
      <form className="ProfilePage-form-container">
        <div className="ProfilePage-input-row">
          <div className="ProfilePage-input-group">
            <label htmlFor="title" className="ProfilePage-input-label">Title</label>
            <select id="title" className="ProfilePage-select-field">
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div className="ProfilePage-input-group">
            <label htmlFor="name" className="ProfilePage-input-label">Name</label>
            <input type="text" id="name" className="ProfilePage-input-field" placeholder="Enter your name" />
          </div>
          <div className="ProfilePage-input-group">
            <label htmlFor="email" className="ProfilePage-input-label">Email</label>
            <input type="email" id="email" className="ProfilePage-input-field" placeholder="Enter your email" />
          </div>
        </div>

        <div className="ProfilePage-input-row">
          <div className="ProfilePage-input-group">
            <label htmlFor="address" className="ProfilePage-input-label">Address</label>
            <textarea id="address" className="ProfilePage-textarea-field" placeholder="Enter your address"></textarea>
          </div>
          <div className="ProfilePage-input-group">
            <label htmlFor="country" className="ProfilePage-input-label">Country</label>
            <input type="text" id="country" className="ProfilePage-input-field" placeholder="Enter your country" />
          </div>
        </div>

        <div className="ProfilePage-input-row">
          <div className="ProfilePage-input-group">
            <label htmlFor="city" className="ProfilePage-input-label">City</label>
            <input type="text" id="city" className="ProfilePage-input-field" placeholder="Enter your city" />
          </div>
          <div className="ProfilePage-input-group">
            <label htmlFor="phone" className="ProfilePage-input-label">Phone Number</label>
            <input type="text" id="phone" className="ProfilePage-input-field" placeholder="Enter your phone number" />
          </div>
        </div>

        <div className="ProfilePage-input-row">
          <div className="ProfilePage-input-group">
            <label htmlFor="state" className="ProfilePage-input-label">State</label>
            <input type="text" id="state" className="ProfilePage-input-field" placeholder="Enter your state" />
          </div>
          <div className="ProfilePage-input-group">
            <label htmlFor="zipcode" className="ProfilePage-input-label">Zip Code</label>
            <input type="text" id="zipcode" className="ProfilePage-input-field" placeholder="Enter your zip code" />
          </div>
        </div>

        <button type="button" className="ProfilePage-submit-button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </section>
  );
}

export default ProfileForm;