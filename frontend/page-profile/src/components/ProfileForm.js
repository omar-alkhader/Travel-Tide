import React from 'react';

function ProfileForm() {
  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  return (
    <section className="profile-section">
      <h1>My Profile:</h1>
      <form id="profile-form">
        <div className="row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select id="title">
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Mail</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" placeholder="Enter your address"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" placeholder="Enter your country" />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Enter your city" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" placeholder="Enter your phone number" />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" placeholder="Enter your state" />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" id="zipcode" placeholder="Enter your zip code" />
          </div>
        </div>
        
        <button type="button" id="update-button" onClick={handleUpdate}>Update</button>
      </form>
    </section>
  );
}

export default ProfileForm;
