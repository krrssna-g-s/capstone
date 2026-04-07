import { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

function ConfirmedBooking() {
  const { state } = useLocation();
  const booking = state?.booking;
  const bookingRef = useRef(`LL-${Date.now().toString(36).toUpperCase()}`);

  return (
    <main className="main-content">
      <div className="confirmation-page">
        <div className="confirmation-icon" aria-hidden="true">✓</div>
        <h1>Your table is booked!</h1>
        <p className="booking-ref">
          Booking Reference: <strong>{bookingRef.current}</strong>
        </p>

        {booking && (
          <dl className="booking-summary" aria-label="Booking details">
            <div className="booking-summary__row">
              <dt>Date</dt>
              <dd>{booking.date}</dd>
            </div>
            <div className="booking-summary__row">
              <dt>Time</dt>
              <dd>{booking.time}</dd>
            </div>
            <div className="booking-summary__row">
              <dt>Guests</dt>
              <dd>{booking.guests}</dd>
            </div>
            <div className="booking-summary__row">
              <dt>Occasion</dt>
              <dd>{booking.occasion}</dd>
            </div>
          </dl>
        )}

        <p className="confirmation-note">
          We look forward to seeing you at Little Lemon!
        </p>
        <Link to="/" className="btn btn-dark">Back to Home</Link>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
