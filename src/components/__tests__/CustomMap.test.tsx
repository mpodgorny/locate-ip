import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CustomMap from 'components/CustomMap';

test('CustomMap test', () => {
  render(<CustomMap />);

  const map = screen.getByText(/Leaflet/i);

  expect(map).toBeInTheDocument();
});
