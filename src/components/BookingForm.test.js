import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from '../pages/ReservationsPage';

const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];

const defaultProps = {
  availableTimes: mockTimes,
  onDateChange: jest.fn(),
  onSubmit: jest.fn(),
};

// ── Static text ──────────────────────────────────────────────────────────────

test('Renders the BookingForm heading', () => {
  render(<BookingForm {...defaultProps} />);
  const headingElement = screen.getByText('Book Now');
  expect(headingElement).toBeInTheDocument();
});

test('renders all form labels', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByText('Choose date')).toBeInTheDocument();
  expect(screen.getByText('Choose time')).toBeInTheDocument();
  expect(screen.getByText('Number of guests')).toBeInTheDocument();
  expect(screen.getByText('Occasion')).toBeInTheDocument();
});

test('renders the submit button', () => {
  render(<BookingForm {...defaultProps} />);
  expect(screen.getByRole('button', { name: /on click/i })).toBeInTheDocument();
});

// ── initializeTimes ──────────────────────────────────────────────────────────

test('initializeTimes calls fetchAPI with today\'s date and returns available times', () => {
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

test('guests input has min="1" and max="10" and required', () => {
  render(<BookingForm {...defaultProps} />);
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toHaveAttribute('required');
});

test('time select has required attribute', () => {
  render(<BookingForm {...defaultProps} />);
  const timeSelect = screen.getByLabelText('Choose time');
  expect(timeSelect).toHaveAttribute('required');
});

// ── Submit button state ───────────────────────────────────────────────────────

test('submit button is disabled when date field is empty', () => {
  render(<BookingForm {...defaultProps} />);
  const button = screen.getByRole('button', { name: /on click/i });
  expect(button).toBeDisabled();
});

test('submit button is enabled when all fields are valid', async () => {
  render(<BookingForm {...defaultProps} />);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  fireEvent.change(screen.getByLabelText('Choose date'), {
    target: { name: 'date', value: tomorrowStr },
  });
  fireEvent.change(screen.getByLabelText('Choose time'), {
    target: { name: 'time', value: '17:00' },
  });
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

test('shows error message when date is cleared after being touched', async () => {
  render(<BookingForm {...defaultProps} />);
  const dateInput = screen.getByLabelText('Choose date');
  fireEvent.blur(dateInput);

  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
