import { act, renderHook } from '@testing-library/react-hooks';
import useInputValue from '../../hooks/useInputValue';

describe('When onChange is called', () => {
  it('should return the value', () => {
    const { result } = renderHook(() => useInputValue('Default value'));
    expect(result.current.value).toBe('Default value');
  });

  it('should change the value', () => {
    const { result } = renderHook(() => useInputValue('Default value'));

    act(() => result.current.onChange({ target: { value: 'Changed value' } }));
    expect(result.current.value).toBe('Changed value');
  });

  it('should rerender updated value', () => {
    const { result, rerender } = renderHook(({ text }) => useInputValue(text), { initialProps: { text: 'Default value' } });

    rerender({ text: 'Changed value' });
    expect(result.current.value).toBe('Changed value');
  });
});
