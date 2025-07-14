// hooks/useApi.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const methodMap = {
  post: api.post,
  put: api.put,
  patch: api.patch,
  delete: api.delete,
  get: api.get,
}

export const useApi = (key: string, url: string, options: any = {}) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => api.get(url).then(res => res.data),
    ...options,
  })
}

export const useApiMutation = (url: string, method = 'POST') => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { url: string; body?: any; params?: any }) => {
      const { url, body, params } = data
      if (method.toLowerCase() === 'get') {
        return api.get(url, { params }).then(res => res.data)
      }
      return api[method.toLowerCase() as 'post' | 'put' | 'patch' | 'delete'](url, body).then(res => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}