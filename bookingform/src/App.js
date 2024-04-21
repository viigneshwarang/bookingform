import React, { useState } from 'react';
import NameInput from './NameInput';
import NumberOfWheels from './NumberOfWheels';
import VehicleType from './VehicleType';
import VehicleModel from './VehicleModel';
import DateRangePicker from './DateRangePicker';
import BookingAppBar from './BookingAppBar';
import { lightTheme, darkTheme } from './Theme';
import jsPDF from 'jspdf';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedWheels, setSelectedWheels] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [startDate, setStartDate] = useState(null); // Define startDate state
  const [endDate, setEndDate] = useState(null); // Define endDate state

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNumberOfWheelsNext = (selectedOption) => {
    setSelectedWheels(selectedOption);
    handleNext({ numberOfWheels: selectedOption });
  };

  const handleVehicleTypeNext = (selectedType) => {
    setSelectedVehicleType(selectedType);
    handleNext({ vehicleType: selectedType });
  };

  const handleFormSubmit = () => {
    const currentDate = new Date().toLocaleDateString();
    const formattedStartDate = startDate ? startDate.toLocaleDateString() : null;
    const formattedEndDate = endDate ? endDate.toLocaleDateString() : null;
    setFormData({ 
      ...formData, 
      date: currentDate, 
      startDate: formattedStartDate, 
      endDate: formattedEndDate 
    });
    setShowPopup(true);
    setFormSubmitted(true);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text('Booking Details', 10, 10);
    let yPos = 20;
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        doc.text(`${key}: ${formData[key]}`, 10, yPos);
        yPos += 10;
      }
    }
    doc.save('booking_details.pdf');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <BookingAppBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} handleBack={handleBack} step={step} />
        <div style={{ paddingTop: '64px', backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <h1 style={{ textAlign: 'center' }}>Booking Form</h1>
            {step === 1 && <NameInput onNext={handleNext} />}
            {step === 2 && <NumberOfWheels onNext={handleNumberOfWheelsNext} />}
            {step === 3 && <VehicleType onNext={handleVehicleTypeNext} selectedWheels={selectedWheels} />}
            {step === 4 && <VehicleModel vehicleType={selectedVehicleType} onNext={handleNext} />}
            {step === 5 && <DateRangePicker onNext={handleFormSubmit} setShowPopup={setShowPopup} setFormSubmitted={setFormSubmitted} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />}
            {showPopup && (
              <div className="popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="popup-inner" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                  <h2 style={{ textAlign: 'center' }}>Form Submitted</h2>
                  <p style={{ textAlign: 'center' }}>Your form has been submitted successfully!</p>
                  <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={handlePrint}>Print</Button>
                    <Button variant="contained" onClick={closePopup}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
