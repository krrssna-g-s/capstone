import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { fetchAPI } from '../api';

export const initializeTimes = () => fetchAPI(new Date());

export const updateTimes = (state, action) => fetchAPI(new Date(action.date));

function ReservationsPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);
  const navigate = useNavigate();

  const handleDateChange = (date) => dispatch({ date });

  const handleBookingSubmit = (formData) => {
    navigate('/guest-details', { state: { booking: formData } });
  };

  return (
    <main className="main-content">
      <div className="reservation-page">
        <h1>Reserve a Table</h1>
        <BookingForm
          availableTimes={availableTimes}
          onDateChange={handleDateChange}
          onSubmit={handleBookingSubmit}
          onBack={() => navigate(-1)}
        />
      </div>
    </main>
  );
}

export default ReservationsPage;
