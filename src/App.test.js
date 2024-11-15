import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Matejs Fruit Machine', () => {
  render(<App />);
  const header = screen.getByText(/Matej's Fruit Machine/i);
  expect(header).toBeInTheDocument();
});
