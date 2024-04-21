import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const NumberOfWheels = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wheelOptions, setWheelOptions] = useState([]);

  useEffect(() => {
    const fetchWheelOptions = async () => {
      try {
        const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
        setWheelOptions(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchWheelOptions();
  }, []);

  const handleNext = () => {
    if (!selectedOption) {
      alert('Please select the number of wheels.');
      return;
    }
    onNext(selectedOption); // Pass the selected number of wheels to the onNext function
  };

  return (
    <Box p={2} boxShadow={3}>
      <Typography variant="h5" align="center" gutterBottom>Number of Wheels</Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
          <Typography variant="body1">Loading...</Typography>
        </Box>
      ) : (
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="wheels"
            name="wheelOption"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {wheelOptions.map(option => (
              <FormControlLabel
                key={option.id}
                value={option.wheels}
                control={<Radio color="primary" />}
                label={`${option.wheels} wheel`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <Box mt={2} display="flex" justifyContent="flex-end"> {/* Adjusted to align the button to the right */}
        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default NumberOfWheels;

