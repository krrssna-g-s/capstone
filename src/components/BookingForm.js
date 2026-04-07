import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

const STORAGE_KEY = 'll_booking_draft';
const today = new Date().toISOString().split('T')[0];

const validate = (values) => {
  const errors = {};

  if (!values.date) {
    errors.date = 'Date is required';
  } else if (values.date < today) {
    errors.date = 'Please choose a date from today onward';
  }

  if (!values.time) {
    errors.time = 'Please select a time slot';
  }

  const guestsNum = Number(values.guests);
  if (values.guests === '' || values.guests === null || values.guests === undefined) {
    errors.guests = 'Number of guests is required';
  } else if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 10) {
    errors.guests = 'We accommodate 1–10 guests per booking. For larger groups, please call us.';
  }

  if (!values.occasion) {
    errors.occasion = 'Please select an occasion';
  }

  return errors;
};

const getSavedDraft = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const BookingForm = ({ availableTimes, onDateChange, onSubmit, onBack }) => {
  const formRef = useRef(null);
  const draft = getSavedDraft();

  const formik = useFormik({
    initialValues: draft ?? {
      date: '',
      time: '',
      guests: '',
      occasion: '',
    },
    validate,
    onSubmit: (values) => {
      sessionStorage.removeItem(STORAGE_KEY);
      onSubmit(values);
    },
  });

  // Persist to sessionStorage on every change
  useEffect(() => {
    if (formik.dirty) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formik.values));
    }
  }, [formik.values, formik.dirty]);

  // Warn before leaving if form has been touched
  useEffect(() => {
    const handler = (e) => {
      if (formik.dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [formik.dirty]);

  // Scroll to first invalid field after a failed submit attempt
  useEffect(() => {
    if (formik.submitCount > 0 && !formik.isValid && formRef.current) {
      const firstInvalid = formRef.current.querySelector('.field-invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formik.submitCount, formik.isValid]);

  const fieldClass = (name) => {
    if (!formik.touched[name]) return '';
    return formik.errors[name] ? 'field-invalid' : 'field-valid';
  };

  return (
    <form
      ref={formRef}
      className="reservation-form"
      onSubmit={formik.handleSubmit}
      noValidate
      aria-label="Reservation booking form"
    >
      <h2>Book Now</h2>

      {/* Step indicator */}
      <div className="step-indicator" aria-label="Booking progress">
        <span className="step step--active">① Booking Details</span>
        <span className="step-sep" aria-hidden="true">→</span>
        <span className="step">② Confirmation</span>
      </div>

      {/* Operating hours */}
      <p className="operating-hours">
        Little Lemon is open <strong>Monday–Sunday, 5:00 PM – 10:00 PM</strong>.
      </p>

      {/* When group */}
      <fieldset className="form-group">
        <legend>When would you like to visit?</legend>

        <label htmlFor="res-date">
          Choose date <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="date"
          id="res-date"
          name="date"
          aria-label="Choose date"
          aria-required="true"
          className={fieldClass('date')}
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
          <span className="form-error" role="alert">⚠ {formik.errors.date}</span>
        )}
        {formik.touched.date && !formik.errors.date && formik.values.date && (
          <span className="form-success" role="status">✓ Date selected</span>
        )}

        <label>
          Choose time <span className="required" aria-hidden="true">*</span>
        </label>
        <div
          className="time-slots"
          role="group"
          aria-label="Available time slots"
        >
          {(availableTimes ?? []).map((time) => (
            <button
              key={time}
              type="button"
              className={`time-slot${formik.values.time === time ? ' time-slot--selected' : ''}`}
              onClick={() => {
                formik.setFieldValue('time', time);
                formik.setFieldTouched('time', true);
              }}
              aria-pressed={formik.values.time === time}
              aria-label={`Select ${time}`}
            >
              {time}
            </button>
          ))}
        </div>
        {formik.touched.time && formik.errors.time && (
          <span className="form-error" role="alert">⚠ {formik.errors.time}</span>
        )}
      </fieldset>

      {/* Who group */}
      <fieldset className="form-group">
        <legend>Who's coming?</legend>

        <label htmlFor="guests">
          Number of guests <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          aria-label="Number of guests"
          aria-required="true"
          placeholder="e.g. 2"
          min="1"
          max="10"
          required
          className={fieldClass('guests')}
          value={formik.values.guests}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="field-help">We accommodate up to 10 guests per booking. For larger groups, please call us.</span>
        {formik.touched.guests && formik.errors.guests && (
          <span className="form-error" role="alert">⚠ {formik.errors.guests}</span>
        )}
        {formik.touched.guests && !formik.errors.guests && (
          <span className="form-success" role="status">✓</span>
        )}

        <label htmlFor="occasion">
          Occasion <span className="required" aria-hidden="true">*</span>
        </label>
        <select
          id="occasion"
          name="occasion"
          aria-label="Occasion"
          aria-required="true"
          required
          className={fieldClass('occasion')}
          value={formik.values.occasion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled>Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {formik.touched.occasion && formik.errors.occasion && (
          <span className="form-error" role="alert">⚠ {formik.errors.occasion}</span>
        )}
      </fieldset>

      <p className="required-legend">* Required field</p>

      <div className="form-actions">
        <button
          type="button"
          className="btn-back"
          onClick={onBack}
          aria-label="Go back to previous page"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="btn-submit"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          aria-label="On Click"
        >
          {formik.isSubmitting
            ? <><span className="spinner" aria-hidden="true" /> Reserving…</>
            : 'Make Your Reservation'
          }
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
