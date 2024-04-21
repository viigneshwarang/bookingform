import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box, makeStyles, CircularProgress } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  checkedRadio: {
    color: theme.palette.primary.main,
  },
  container: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Add white shadow
    borderRadius: '8px',
    padding: '20px',
    margin: '20px auto', // Center the container
    maxWidth: '400px', // Limit container width
  },
}));

const VehicleModel = ({ onNext, vehicleType }) => {
  const classes = useStyles();
  const [selectedModel, setSelectedModel] = useState('');
  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModelDetails, setSelectedModelDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes`);
        const vehicleTypes = response.data.data;
        const selectedType = vehicleTypes.find(type => type.id === vehicleType);
        if (selectedType) {
          setVehicleModels(selectedType.vehicles);
        } else {
          setError(new Error('Vehicle type not found'));
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleType]);

  const handleNext = () => {
    if (!selectedModel) {
      alert('Please select a vehicle model.');
      return;
    }
    const selectedVehicleModel = vehicleModels.find(model => model.id === selectedModel);
    onNext(selectedVehicleModel);
  };

  const handleModelSelect = (modelId) => {
    const selectedModel = vehicleModels.find(model => model.id === modelId);
    setSelectedModel(modelId);
    setSelectedModelDetails(selectedModel); // Update selectedModelDetails with the selected model
  };

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box className={classes.container}>
      <h3>Select {vehicleType} Model</h3>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="vehicleModel"
          name="vehicleModel"
          value={selectedModel}
          onChange={(e) => handleModelSelect(e.target.value)}
        >
          {vehicleModels.map(model => (
            <FormControlLabel
              key={model.id}
              value={model.id}
              control={<Radio classes={{ checked: classes.checkedRadio }} />}
              label={model.name}
              checked={selectedModel === model.id}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {selectedModelDetails && (
        <div>
          <h4>Selected Model Details:</h4>
          <p>ID: {selectedModelDetails.id}</p>
          <p>Name: {selectedModelDetails.name}</p>
          <p>Vehicle Type ID: {selectedModelDetails.vehicleTypeId}</p>
          <p>Created At: {selectedModelDetails.createdAt}</p>
          <p>Updated At: {selectedModelDetails.updatedAt}</p>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
    </Box>
  );
};

export default VehicleModel;
