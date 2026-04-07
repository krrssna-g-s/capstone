import { useLocation, useNavigate } from 'react-router-dom';
import GuestDetailsForm from '../components/GuestDetailsForm';
import { submitAPI } from '../api';

function GuestDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const handleSubmit = (guestData) => {
    const fullData = { ...booking, ...guestData };
    if (submitAPI(fullData)) {
      navigate('/booking-confirmed', { state: { booking, guest: guestData } });
    }
  };

  return (
    <main className="main-content">
      <div className="reservation-page">
        <h1>Almost There!</h1>
        <GuestDetailsForm
          onSubmit={handleSubmit}
          onBack={() => navigate(-1)}
        />
      </div>
    </main>
  );
}

export default GuestDetailsPage;
