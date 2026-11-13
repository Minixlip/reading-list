import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

test('renders a progress bar named Reading progress', () => {
  render(<ProgressBar pagesRead={150} totalPages={300} />);

  const bar = screen.getByRole('progressbar', { name: 'Reading progress' });
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveAttribute('aria-valuemin', '0');
  expect(bar).toHaveAttribute('aria-valuemax', '100');
});

test('shows 50% for 150 of 300 pages', () => {
  render(<ProgressBar pagesRead={150} totalPages={300} />);

  expect(screen.getByText('50%')).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Reading progress' }))
    .toHaveAttribute('aria-valuenow', '50');
});

test('rounds 100 of 300 pages to 33%', () => {
  render(<ProgressBar pagesRead={100} totalPages={300} />);

  expect(screen.getByText('33%')).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Reading progress' }))
    .toHaveAttribute('aria-valuenow', '33');
});

test('shows 0% when no pages have been read', () => {
  render(<ProgressBar pagesRead={0} totalPages={300} />);

  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Reading progress' }))
    .toHaveAttribute('aria-valuenow', '0');
});

test('clamps 400 of 300 pages to 100%', () => {
  render(<ProgressBar pagesRead={400} totalPages={300} />);

  expect(screen.getByText('100%')).toBeInTheDocument();
  expect(screen.queryByText('133%')).not.toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Reading progress' }))
    .toHaveAttribute('aria-valuenow', '100');
});

test('shows 0% when the total is zero', () => {
  render(<ProgressBar pagesRead={0} totalPages={0} />);

  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.queryByText('NaN%')).not.toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Reading progress' }))
    .toHaveAttribute('aria-valuenow', '0');
});
