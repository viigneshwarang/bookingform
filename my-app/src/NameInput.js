import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const NameInput = ({ onNext }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleNext = () => {
    if (firstName && lastName) {
      onNext({ firstName, lastName });
    } else {
      alert('Please enter both first name and last name.');
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">What is your name?</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Grid>
    </Grid>
  );
};

export default NameInput;
