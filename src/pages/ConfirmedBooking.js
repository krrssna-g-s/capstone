import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <main className="main-content">
      <div className="confirmation-page">
        <h1>Booking Confirmed!</h1>
        <p>Your table at Little Lemon has been successfully reserved. We look forward to seeing you!</p>
        <Link to="/" className="btn btn-dark">Back to Home</Link>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
