import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// fetchAPI is loaded via the external script tag in index.html;
// mock it here so tests don't make network requests.
beforeEach(() => {
  window.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00', '20:00', '21:00']);
  window.submitAPI = jest.fn(() => true);
});

test('renders the site navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Navigation renders links in both desktop nav and mobile drawer
  const reservationLinks = screen.getAllByRole('link', { name: /reservations/i });
  expect(reservationLinks.length).toBeGreaterThan(0);
  const homeLinks = screen.getAllByRole('link', { name: /home/i });
  expect(homeLinks.length).toBeGreaterThan(0);
});
