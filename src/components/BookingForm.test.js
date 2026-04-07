import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from '../pages/ReservationsPage';

const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];

const defaultProps = {
  availableTimes: mockTimes,
  onDateChange: jest.fn(),
  onSubmit: jest.fn(),
  onBack: jest.fn(),
};

beforeEach(() => {
  sessionStorage.clear();
});

// ── Static text ──────────────────────────────────────────────────────────────

test('Renders the BookingForm heading', () => {
  render(<BookingForm {...defaultProps} />);
  const headingElement = screen.getByText('Book Now');
  expect(headingElement).toBeInTheDocument();
});

test('renders all form labels', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
});

test('renders the submit button', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /on click/i })).toBeInTheDocument();
});

test('renders the back button', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
});

test('calls onBack when back button is clicked', () => {
  render(<BookingForm {...defaultProps} />);
  fireEvent.click(screen.getByRole('button', { name: /go back/i }));
  expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
});

test('renders step indicator', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByLabelText('Booking progress')).toBeInTheDocument();
});

test('renders operating hours', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByText(/monday.+sunday/i)).toBeInTheDocument();
});

// ── initializeTimes ──────────────────────────────────────────────────────────

test("initializeTimes calls fetchAPI with today's date and returns available times", () => {
  window.fetchAPI = jest.fn(() => mockTimes);
  const result = initializeTimes();
  expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(result).toEqual(mockTimes);
});

// ── updateTimes ──────────────────────────────────────────────────────────────

test('updateTimes calls fetchAPI with the dispatched date and returns available times', () => {
  window.fetchAPI = jest.fn(() => mockTimes);
  const result = updateTimes([], { date: '2025-06-15' });
  expect(window.fetchAPI).toHaveBeenCalledWith(new Date('2025-06-15'));
  expect(result).toEqual(mockTimes);
});

// ── HTML5 validation attributes ──────────────────────────────────────────────

test('date input has required attribute and min set to today', () => {
  render(<BookingForm {...defaultProps} />);
  const dateInput = screen.getByLabelText('Choose date');
  expect(dateInput).toHaveAttribute('required');
  expect(dateInput).toHaveAttribute('min');
});

test('guests input has min="1", max="10", and required', () => {
  render(<BookingForm {...defaultProps} />);
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toHaveAttribute('required');
});

// ── Time slot buttons ─────────────────────────────────────────────────────────

test('renders a button for each available time slot', () => {
  render(<BookingForm {...defaultProps} />);
  mockTimes.forEach((time) => {
    expect(screen.getByRole('button', { name: `Select ${time}` })).toBeInTheDocument();
  });
});

test('time slot button shows as selected (aria-pressed=true) when clicked', () => {
  render(<BookingForm {...defaultProps} />);
  const btn = screen.getByRole('button', { name: 'Select 19:00' });
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-pressed', 'true');
});

// ── Submit button state ───────────────────────────────────────────────────────

test('submit button is disabled when date field is empty', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /on click/i })).toBeDisabled();
});

test('submit button is enabled when all fields are valid', async () => {
  render(<BookingForm {...defaultProps} />);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  fireEvent.change(screen.getByLabelText('Choose date'), {
    target: { name: 'date', value: tomorrowStr },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Select 17:00' }));
  fireEvent.change(screen.getByLabelText('Number of guests'), {
    target: { name: 'guests', value: '2' },
  });
  fireEvent.change(screen.getByLabelText('Occasion'), {
    target: { name: 'occasion', value: 'Birthday' },
  });

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /on click/i })).not.toBeDisabled();
  });
});

// ── Inline validation errors ──────────────────────────────────────────────────

test('shows error message when date is blurred without a value', async () => {
  render(<BookingForm {...defaultProps} />);
  fireEvent.blur(screen.getByLabelText('Choose date'));

  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
