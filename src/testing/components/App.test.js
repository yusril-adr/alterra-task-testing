import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../../App';

describe('When App Component is rendered', () => {
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

  it('will renders learn react link', () => {
    act(() => {
      render(<App />, container);
    });
    expect(container.querySelector('a.App-link').textContent).toBe('Learn React');
  });
});
