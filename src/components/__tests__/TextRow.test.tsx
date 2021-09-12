import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TextRow from 'components/TextRow';

test('TextRow test', () => {
  render(<TextRow title="title1_title12" value="value"/>);

  const title = screen.getByText(/title1 title12/i);
  const value = screen.getByText(/value/i);

  expect(title).toBeInTheDocument();
  expect(value).toBeInTheDocument();
});
