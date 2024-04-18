import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const VehicleType = ({ onNext, selectedWheels }) => {
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [openError, setOpenError] = useState(false); // State for error popup

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
        // Filter the vehicle types based on selected number of wheels
        const filteredTypes = response.data.data.filter(type => type.wheels === parseInt(selectedWheels));
        setVehicleTypes(filteredTypes);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        setOpenError(true); // Open error popup when an error occurs
      }
    };

    fetchVehicleTypes();
  }, [selectedWheels]);

  const handleNext = () => {
    if (selectedType === '') {
      window.alert('Please choose a vehicle type.'); // Displaybrowser alert if no vehicle is choosed
      return;
    }
    onNext(selectedType);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box>
      <h3>Type of Vehicle</h3>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="vehicleType"
          name="vehicleType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {vehicleTypes.map(type => (
            <FormControlLabel
              key={type.id}
              value={type.id}
              control={<Radio />}
              label={`${type.title} - ${type.name}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>

      {/* Display the images based on the number of wheels selected */}
      {selectedWheels === '2' && (
        <img
          src={`${process.env.PUBLIC_URL}/Bike.jpg`} 
          alt="Bike"
          style={{ marginTop: '20px', maxWidth: '100%' }}
        />
      )}
      {selectedWheels === '4' && (
        <img
          src={`${process.env.PUBLIC_URL}/Car.jpg`} 
          alt="Car"
          style={{ marginTop: '20px', maxWidth: '100%' }}
        />
      )}
      {selectedWheels === '6' && (
        <img
          src={`${process.env.PUBLIC_URL}/Truck.jpg`} 
          alt="Truck"
          style={{ marginTop: '20px', maxWidth: '100%' }}
        />
      )}
    </Box>
  );
};

export default VehicleType;
