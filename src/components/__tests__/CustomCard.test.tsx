import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CustomCard from 'components/CustomCard';

test('CustomCard test', () => {
  render(<CustomCard title="test1" />);
  render(
    <CustomCard>
      <span>test2</span>
    </CustomCard>
  );
  const blankCard = screen.getByText(/test1/i);
  const CardChildren = screen.getByText(/test2/i);

  expect(blankCard).toBeInTheDocument();
  expect(CardChildren).toBeInTheDocument();
});
