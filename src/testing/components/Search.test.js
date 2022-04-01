import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import Search from '../../components/Search';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('When Search Component is rendered', () => {
  let container = null;

  beforeEach(() => {
  // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
  // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders search news data by user keyword', async () => {
    const dummyStories = [
      {
        objectID: 1,
        title: 'A Message to Our Customers',
        url: 'https://google.com',
      },
      {
        objectID: 2,
        title: 'A Message to Our Employee',
        url: 'https://google.com',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: { hits: dummyStories } });

    act(() => {
      render(<Search />, container);
    });

    const inputElem = container.querySelector('input');
    fireEvent.change(inputElem, { target: { value: 'A Message to Our Customers' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button'));
    });

    expect(container.querySelector('ul').textContent).toContain('A Message to Our Customers');
  });
});
