import React from "react";

function RoomDetails({ roomCount }) {
  const rooms = [];
  for (let i = 1; i <= roomCount; i++) {
    rooms.push(
      <div className="room" key={i}>
        <div className="form-group">
          <label>Room #{i} - Adults</label>
          <input type="number" min="1" placeholder="Enter number of adults" />
        </div>
        <div className="form-group">
          <label>Extra Bed</label>
          <select>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      </div>
    );
  }

  return <div id="roomDetails">{rooms}</div>;
}

export default RoomDetails;
