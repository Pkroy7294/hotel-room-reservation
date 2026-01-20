import React, { useState } from "react";

const FLOORS = 10;

const generateRooms = () => {
  const rooms = [];
  for (let floor = 1; floor <= 9; floor++) {
    for (let i = 1; i <= 10; i++) {
      rooms.push({
        roomNumber: floor * 100 + i,
        floor,
        position: i,
        isBooked: false,
        isSelected: false,
      });
    }
  }
  for (let i = 1; i <= 7; i++) {
    rooms.push({
      roomNumber: 1000 + i,
      floor: 10,
      position: i,
      isBooked: false,
      isSelected: false,
    });
  }
  return rooms;
};

export default function App() {
  const [rooms, setRooms] = useState(generateRooms());
  const [count, setCount] = useState("");

  const travelTime = (a, b) =>
    Math.abs(a.position - b.position) +
    Math.abs(a.floor - b.floor) * 2;

  const clearSelection = () => {
    setRooms(prev =>
      prev.map(r => ({ ...r, isSelected: false }))
    );
  };

  const bookRooms = () => {
    const n = Number(count);
    if (n < 1 || n > 5) {
      alert("Please enter a number between 1 and 5");
      return;
    }

    clearSelection();

    let bestSet = null;
    let minTime = Infinity;
    let sameFloorFound = false;

    // ✅ STEP 1: SAME FLOOR PRIORITY
    for (let floor = 1; floor <= FLOORS; floor++) {
      const available = rooms
        .filter(r => r.floor === floor && !r.isBooked)
        .sort((a, b) => a.position - b.position);

      for (let i = 0; i <= available.length - n; i++) {
        const subset = available.slice(i, i + n);
        const time = travelTime(subset[0], subset[n - 1]);

        if (time < minTime) {
          minTime = time;
          bestSet = subset;
          sameFloorFound = true;
        }
      }
    }

    // ✅ STEP 2: CROSS FLOOR (ONLY IF SAME FLOOR NOT FOUND)
    if (!sameFloorFound) {
      const available = rooms
        .filter(r => !r.isBooked)
        .sort((a, b) =>
          a.floor !== b.floor
            ? a.floor - b.floor
            : a.position - b.position
        );

      for (let i = 0; i <= available.length - n; i++) {
        const subset = available.slice(i, i + n);
        const time = travelTime(subset[0], subset[n - 1]);

        if (time < minTime) {
          minTime = time;
          bestSet = subset;
        }
      }
    }

    if (!bestSet) {
      alert("Not enough rooms available");
      return;
    }

    setRooms(prev =>
      prev.map(r =>
        bestSet.some(b => b.roomNumber === r.roomNumber)
          ? { ...r, isBooked: true, isSelected: true }
          : r
      )
    );
  };

  const randomOccupancy = () => {
    setRooms(prev =>
      prev.map(r => ({
        ...r,
        isBooked: Math.random() < 0.4,
        isSelected: false,
      }))
    );
  };

  const resetAll = () => {
    setRooms(generateRooms());
    setCount("");
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">
        Hotel Room Reservation System
      </h3>

      <div className="row g-2 justify-content-center mb-4">
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="No of Rooms (1–5)"
            value={count}
            onChange={e => setCount(e.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button
            className="btn btn-success"
            onClick={bookRooms}
            disabled={!count}
          >
            Book
          </button>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-secondary" onClick={resetAll}>
            Reset
          </button>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-warning" onClick={randomOccupancy}>
            Random
          </button>
        </div>
      </div>

      <div className="card p-3">
        {Array.from({ length: FLOORS }, (_, i) => {
          const floor = FLOORS - i;
          return (
            <div key={floor} className="d-flex align-items-center mb-2">
              <strong className="me-3" style={{ width: "80px" }}>
                Floor {floor}
              </strong>
              <div className="d-flex gap-2 flex-wrap">
                {rooms
                  .filter(r => r.floor === floor)
                  .map(r => (
                    <div
                      key={r.roomNumber}
                      className={`badge p-3 border ${
                        r.isBooked
                          ? r.isSelected
                            ? "bg-info text-dark"
                            : "bg-danger"
                          : "bg-light text-dark"
                      }`}
                    >
                      {r.roomNumber}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 d-flex gap-3 justify-content-center">
        <span className="badge bg-light text-dark border">Available</span>
        <span className="badge bg-danger">Booked</span>
        <span className="badge bg-info text-dark">Newly Booked</span>
      </div>
    </div>
  );
}
