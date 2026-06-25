export const useApi = () => {
  const config = useRuntimeConfig()

  const baseURL = config.public.apiBase
  const apiKey = config.public.apiKey

  const apiFetch = $fetch.create({
    baseURL,
    headers: {
      // if you later use API key auth
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
  })

  return {
    get: <T>(url: string) => apiFetch<T>(url, { method: 'GET' }),
    post: <T>(url: string, body: any) =>
      apiFetch<T>(url, { method: 'POST', body }),
  }
}