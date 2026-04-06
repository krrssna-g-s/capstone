import { useFormik } from 'formik';

const today = new Date().toISOString().split('T')[0];

const validate = (values) => {
  const errors = {};

  if (!values.date) {
    errors.date = 'Date is required';
  } else if (values.date < today) {
    errors.date = 'Date cannot be in the past';
  }

  if (!values.time) {
    errors.time = 'Time is required';
  }

  if (!values.guests) {
    errors.guests = 'Number of guests is required';
  } else if (values.guests < 1 || values.guests > 10) {
    errors.guests = 'Must be between 1 and 10 guests';
  }

  if (!values.occasion) {
    errors.occasion = 'Occasion is required';
  }

  return errors;
};

const BookingForm = ({ availableTimes, onDateChange, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      date: '',
      time: availableTimes?.[0] ?? '',
      guests: 1,
      occasion: 'Birthday',
    },
    validate,
    onSubmit: (values) => onSubmit(values),
  });

  const isSubmitDisabled = !formik.isValid || !formik.dirty;

  return (
    <form
      className="reservation-form"
      onSubmit={formik.handleSubmit}
      noValidate
      aria-label="Reservation booking form"
    >
      <h2>Book Now</h2>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        aria-label="Choose date"
        aria-required="true"
        min={today}
        required
        value={formik.values.date}
        onChange={(e) => {
          formik.handleChange(e);
          onDateChange(e.target.value);
        }}
        onBlur={formik.handleBlur}
      />
      {formik.touched.date && formik.errors.date && (
        <span className="form-error" role="alert">{formik.errors.date}</span>
      )}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        aria-label="Choose time"
        aria-required="true"
        required
        value={formik.values.time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {(availableTimes ?? []).map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
      {formik.touched.time && formik.errors.time && (
        <span className="form-error" role="alert">{formik.errors.time}</span>
      )}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        aria-label="Number of guests"
        aria-required="true"
        placeholder="1"
        min="1"
        max="10"
        required
        value={formik.values.guests}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.guests && formik.errors.guests && (
        <span className="form-error" role="alert">{formik.errors.guests}</span>
      )}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        aria-label="Occasion"
        aria-required="true"
        required
        value={formik.values.occasion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {formik.touched.occasion && formik.errors.occasion && (
        <span className="form-error" role="alert">{formik.errors.occasion}</span>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        aria-label="On Click"
      >
        Make Your Reservation
      </button>
    </form>
  );
};

export default BookingForm;
