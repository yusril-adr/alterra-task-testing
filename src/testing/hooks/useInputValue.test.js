import { act, renderHook } from '@testing-library/react-hooks';
import useInputValue from '../../hooks/useInputValue';

describe('When onChange is called', () => {
  it('should show the value first, then change it', () => {
    const { result } = renderHook(() => useInputValue('Default value'));

    expect(result.current.value).toBe('Default value');

    act(() => result.current.onChange({ target: { value: 'Changed value' } }));
    expect(result.current.value).toBe('Changed value');
  });
});
