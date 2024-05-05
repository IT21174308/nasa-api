import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers'; // Import individual matcher
import LandingPage from '../LandingPage';

expect.extend({ toBeInTheDocument }); // Extend Jest's expectations with the matcher

jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  writable: true,
});

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ 
    data: {
      hdurl: 'https://example.com/image.jpg',
      title: 'Test Title',
      explanation: 'Test Explanation',
      date: '2024-05-04',
      copyright: 'Test Copyright'
    }
  }))
}));

describe('LandingPage Component', () => {
  it('renders without crashing', async () => {
    render(<LandingPage />);
    await waitFor(() => expect(document.querySelector('.ant-typography')).toBeInTheDocument());
  });

  it('displays loader while fetching data', async () => {
    const { getByTestId } = render(<LandingPage />);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('loader')).not.toBeInTheDocument());
  });

  it('displays error message if fetch fails', async () => {
    const errorMessage = 'Failed to fetch data';
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(null);
    jest.spyOn(window.localStorage, 'setItem').mockReturnValueOnce(null);

    jest.mock('axios', () => ({
      get: jest.fn(() => Promise.reject(new Error(errorMessage)))
    }));

    const { getByText } = render(<LandingPage />);
    await waitFor(() => expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
  });

  it('displays fetched data', async () => {
    const { getByText, getByAltText } = render(<LandingPage />);
    await waitFor(() => {
      expect(getByText('Test Title')).toBeInTheDocument();
      expect(getByText('Test Explanation')).toBeInTheDocument();
      expect(getByText('Date: 2024-05-04')).toBeInTheDocument();
      expect(getByAltText('Test Title')).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(getByText('©Test Copyright')).toBeInTheDocument();
    });
  });
});
