import React, { useState } from 'react';
import { DoctorTable } from "./components/DoctorTable";
import { LocationControls } from "./components/LocationControls"; 
import "./app.css";

const Header = () => (
  <header>
    <h1> Doctor finder </h1>
    <h3> Find doctors in your area </h3>
  </header>
);

const App = () => {
  const [nearbyDoctors, setNearbyDoctors] = useState([]);

  return (
    <div className="container">
      <Header />
      <LocationControls setNearbyDoctors={setNearbyDoctors} />
      <DoctorTable nearbyDoctors={nearbyDoctors} />
    </div>
  );
}

export default App;
