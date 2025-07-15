import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { vi ,describe,it,expect} from 'vitest';
import { useApi, useApiMutation } from '@/lib/hooks/useApi';

vi.mock('axios');

const getMock = vi.fn(() => Promise.resolve({ data: 'get' }));
const postMock = vi.fn(() => Promise.resolve({ data: 'post' }));

(axios as unknown as { create: any }).create = vi.fn(() => ({
  get: getMock,
  post: postMock,
  put: postMock,
  patch: postMock,
  delete: postMock,
}));

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useApi', () => {
  it('calls axios.get with provided url', async () => {
    renderHook(() => useApi('users', '/users'), { wrapper });
    expect(getMock).toHaveBeenCalledWith('/users');
  });
});

describe('useApiMutation', () => {
  it('calls axios.post on mutate', async () => {
    const { result } = renderHook(() => useApiMutation('/users', 'POST'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ url: '/users', body: { name: 'A' } });
    });
    expect(postMock).toHaveBeenCalledWith('/users', { name: 'A' });
  });

  it('calls axios.get when method is GET', async () => {
    const { result } = renderHook(() => useApiMutation('/users', 'GET'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ url: '/users', params: { q: 1 } });
    });
    expect(getMock).toHaveBeenCalledWith('/users', { params: { q: 1 } });
  });
});
