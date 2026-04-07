import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GuestDetailsForm from './GuestDetailsForm';

const defaultProps = {
  onSubmit: jest.fn(),
  onBack: jest.fn(),
};

beforeEach(() => {
  sessionStorage.clear();
  jest.clearAllMocks();
});

// ── Static text ──────────────────────────────────────────────────────────────

test('renders the GuestDetailsForm heading', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByText('Your Details')).toBeInTheDocument();
});

test('renders all form labels', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByLabelText('First name')).toBeInTheDocument();
  expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
});

test('renders the confirm reservation button', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeInTheDocument();
});

test('renders the back button', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /go back to booking details/i })).toBeInTheDocument();
});

test('renders step indicator with 3 steps', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  const indicator = screen.getByLabelText('Booking progress');
  expect(indicator).toBeInTheDocument();
  expect(indicator).toHaveTextContent('Booking Details');
  expect(indicator).toHaveTextContent('Your Details');
  expect(indicator).toHaveTextContent('Confirmation');
});

// ── HTML5 attributes ──────────────────────────────────────────────────────────

test('all inputs have required attribute', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByLabelText('First name')).toHaveAttribute('required');
  expect(screen.getByLabelText('Last name')).toHaveAttribute('required');
  expect(screen.getByLabelText('Email address')).toHaveAttribute('required');
  expect(screen.getByLabelText('Phone number')).toHaveAttribute('required');
});

test('name inputs have minLength="2"', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByLabelText('First name')).toHaveAttribute('minLength', '2');
  expect(screen.getByLabelText('Last name')).toHaveAttribute('minLength', '2');
});

test('email input has type="email"', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email');
});

test('phone input has type="tel"', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByLabelText('Phone number')).toHaveAttribute('type', 'tel');
});

// ── Submit button state ───────────────────────────────────────────────────────

test('confirm button is disabled when form is empty', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeDisabled();
});

test('confirm button is enabled when all fields are valid', async () => {
  render(<GuestDetailsForm {...defaultProps} />);

  fireEvent.change(screen.getByLabelText('First name'), {
    target: { name: 'firstName', value: 'Jane' },
  });
  fireEvent.change(screen.getByLabelText('Last name'), {
    target: { name: 'lastName', value: 'Smith' },
  });
  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { name: 'email', value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Phone number'), {
    target: { name: 'phone', value: '+1 312 555 0192' },
  });

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /confirm reservation/i })).not.toBeDisabled();
  });
});

// ── Inline validation errors ──────────────────────────────────────────────────

test('shows error when first name is too short', async () => {
  render(<GuestDetailsForm {...defaultProps} />);
  const input = screen.getByLabelText('First name');
  fireEvent.change(input, { target: { name: 'firstName', value: 'A' } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 2 characters/i);
  });
});

test('shows error for invalid email', async () => {
  render(<GuestDetailsForm {...defaultProps} />);
  const input = screen.getByLabelText('Email address');
  fireEvent.change(input, { target: { name: 'email', value: 'notanemail' } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email address/i);
  });
});

test('shows error when email is empty on blur', async () => {
  render(<GuestDetailsForm {...defaultProps} />);
  fireEvent.blur(screen.getByLabelText('Email address'));

  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

// ── Back button ───────────────────────────────────────────────────────────────

test('calls onBack when back button is clicked', () => {
  render(<GuestDetailsForm {...defaultProps} />);
  fireEvent.click(screen.getByRole('button', { name: /go back to booking details/i }));
  expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
});

// ── sessionStorage draft ──────────────────────────────────────────────────────

test('restores saved draft from sessionStorage on mount', () => {
  const draft = { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+1 312 555 0192' };
  sessionStorage.setItem('ll_guest_draft', JSON.stringify(draft));

  render(<GuestDetailsForm {...defaultProps} />);

  expect(screen.getByLabelText('First name')).toHaveValue('Jane');
  expect(screen.getByLabelText('Email address')).toHaveValue('jane@example.com');
});
