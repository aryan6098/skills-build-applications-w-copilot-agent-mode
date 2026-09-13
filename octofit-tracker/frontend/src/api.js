const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiEndpoint(component) {
  return `${API_BASE_URL}/${component}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'data', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  if (payload.data && typeof payload.data === 'object') {
    return normalizeCollection(payload.data)
  }

  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return normalizeCollection(await response.json())
}

export function formatDate(value) {
  if (!value) return 'Not available'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
}