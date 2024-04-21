import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    padding: theme.spacing(3),
    maxWidth: '400px',
    margin: '20px auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const DateRangePicker = ({ onNext, setStartDate, setEndDate, startDate, endDate }) => {
  const classes = useStyles();
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedDatesFromAPI = async () => {
      try {
        const response = await axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes');
        const data = response.data.data;
        const dates = data.reduce((acc, vehicleType) => {
          const typeDates = vehicleType.vehicles.map(vehicle => ({
            startDate: new Date(vehicle.createdAt),
            endDate: new Date(vehicle.updatedAt)
          }));
          return [...acc, ...typeDates];
        }, []);
        setBookedDates(dates);
        setLoading(false);
      } catch (error) {
        setError('Error fetching booked dates: ' + error.message);
        setLoading(false);
      }
    };

    fetchBookedDatesFromAPI();
  }, []);

  const handleNext = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    onNext({ startDate, endDate });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Paper className={classes.container} elevation={3}>
      <h3>Date Range Picker</h3>
      <div>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          excludeDates={bookedDates.map(dateRange => dateRange.startDate)}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          excludeDates={bookedDates.map(dateRange => dateRange.endDate)}
        />
      </div>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleNext}>Next</Button>
    </Paper>
  );
};

export default DateRangePicker;
