import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box } from '@mui/material';
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <h3>Number of Wheels</h3>
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
              control={<Radio />}
              label={`${option.wheels} wheel`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
    </Box>
  );
};

export default NumberOfWheels;
