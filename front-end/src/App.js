import React, { useState } from 'react';
import { Container, Typography } from "@material-ui/core";
import { DoctorTable } from "./components/DoctorTable";
import { LocationControls } from "./components/LocationControls"; 
import "./app.css";

const Header = () => (
  <>
    <Typography variant="h3">
      Doctor finder
    </Typography>
    <Typography variant="subtitle1">
      Find doctors in your area
    </Typography>
  </>
);

const App = () => {
  const [nearbyDoctors, setNearbyDoctors] = useState([]);

  return (
    <Container maxWidth="sm">
      <Header />
      <LocationControls setNearbyDoctors={setNearbyDoctors} />
      <DoctorTable nearbyDoctors={nearbyDoctors} />
    </Container>
  );
}

export default App;
