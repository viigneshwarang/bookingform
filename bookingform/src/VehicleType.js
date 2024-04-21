import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const VehicleType = ({ onNext, selectedWheels }) => {
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
        const filteredTypes = response.data.data.filter(type => type.wheels === parseInt(selectedWheels));
        setVehicleTypes(filteredTypes);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [selectedWheels]);

  const handleNext = () => {
    if (selectedType === '') {
      alert('Please choose a vehicle type.');
      return;
    }
    onNext(selectedType);
  };

  return (
    <Box p={2} boxShadow={3}>
      <h3>Type of Vehicle</h3>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
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
                control={<Radio color="primary" />}
                label={`${type.title} - ${type.name}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
      </Box>

      {/* Displaying images based on the number of wheels selected */}
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
