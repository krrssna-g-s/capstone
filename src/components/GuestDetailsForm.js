import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

const STORAGE_KEY = 'll_guest_draft';

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com)';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s\-().]{7,15}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
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

const GuestDetailsForm = ({ onSubmit, onBack }) => {
  const formRef = useRef(null);
  const draft = getSavedDraft();

  const formik = useFormik({
    initialValues: draft ?? {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
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

  // Scroll to first invalid field after a failed submit
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
      aria-label="Guest details form"
    >
      <h2>Your Details</h2>

      {/* Step indicator */}
      <div className="step-indicator" aria-label="Booking progress">
        <span className="step step--done">① Booking Details ✓</span>
        <span className="step-sep" aria-hidden="true">→</span>
        <span className="step step--active">② Your Details</span>
        <span className="step-sep" aria-hidden="true">→</span>
        <span className="step">③ Confirmation</span>
      </div>

      {/* Contact details group */}
      <fieldset className="form-group">
        <legend>Contact Information</legend>

        <label htmlFor="firstName">
          First name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          aria-label="First name"
          aria-required="true"
          placeholder="e.g. Jane"
          required
          minLength={2}
          className={fieldClass('firstName')}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <span className="form-error" role="alert">⚠ {formik.errors.firstName}</span>
        )}
        {formik.touched.firstName && !formik.errors.firstName && (
          <span className="form-success" role="status">✓</span>
        )}

        <label htmlFor="lastName">
          Last name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          aria-label="Last name"
          aria-required="true"
          placeholder="e.g. Smith"
          required
          minLength={2}
          className={fieldClass('lastName')}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <span className="form-error" role="alert">⚠ {formik.errors.lastName}</span>
        )}
        {formik.touched.lastName && !formik.errors.lastName && (
          <span className="form-success" role="status">✓</span>
        )}

        <label htmlFor="email">
          Email address <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          aria-label="Email address"
          aria-required="true"
          placeholder="e.g. jane@example.com"
          required
          className={fieldClass('email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="form-error" role="alert">⚠ {formik.errors.email}</span>
        )}
        {formik.touched.email && !formik.errors.email && (
          <span className="form-success" role="status">✓</span>
        )}

        <label htmlFor="phone">
          Phone number <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          aria-label="Phone number"
          aria-required="true"
          placeholder="e.g. +1 (312) 555-0192"
          required
          className={fieldClass('phone')}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <span className="form-error" role="alert">⚠ {formik.errors.phone}</span>
        )}
        {formik.touched.phone && !formik.errors.phone && (
          <span className="form-success" role="status">✓</span>
        )}
      </fieldset>

      <p className="required-legend">* Required field</p>

      <div className="form-actions">
        <button
          type="button"
          className="btn-back"
          onClick={onBack}
          aria-label="Go back to booking details"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="btn-submit"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          aria-label="Confirm reservation"
        >
          {formik.isSubmitting
            ? <><span className="spinner" aria-hidden="true" /> Confirming…</>
            : 'Confirm Reservation'
          }
        </button>
      </div>
    </form>
  );
};

export default GuestDetailsForm;
