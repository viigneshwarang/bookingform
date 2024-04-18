import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ formData, onNext }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetchBookedDatesFromAPI();
  }, []);

  const fetchBookedDatesFromAPI = () => {
    // Make API call 2 fetch booked dates
    fetch('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const dates = data.map(item => ({
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate)
          }));
          setBookedDates(dates);
        } else {
          console.error('Error fetching booked dates: Response data is not an array');
        }
      })
      .catch(error => console.error('Error fetching booked dates:', error));
  };

  const handleNext = () => {
    if (!startDate || !endDate) {
      window.alert('Please select both start and end dates.'); //  browser aler for start/end date is not selected
      return;
    }
    onNext({ startDate, endDate });
  };

  return (
    <div>
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DateRangePicker;
