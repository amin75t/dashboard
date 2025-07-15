import { renderHook, act } from '@testing-library/react';
import { useCounterStore } from './store';

describe('useCounterStore', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounterStore());
    act(() => {
      result.current.increase();
    });
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounterStore());
    act(() => {
      result.current.decrease();
    });
    expect(result.current.count).toBe(-1);
  });

  it('resets count', () => {
    const { result } = renderHook(() => useCounterStore());
    act(() => {
      result.current.increase();
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
