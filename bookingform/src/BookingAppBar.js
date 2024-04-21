import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const BookingAppBar = ({ toggleDarkMode, isDarkMode, handleBack, step }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {step > 1 && ( // Display - back button if the step is greater than 1
          <IconButton
            color="inherit"
            aria-label="back"
            onClick={handleBack}
            sx={{ mr: 2 }} // Add margin to separate it from the title
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Booking Form
        </Typography>
        <IconButton
          color="inherit"
          aria-label="toggle dark mode"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default BookingAppBar;
