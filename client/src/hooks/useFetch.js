import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../api'

export default function useFetch(path) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(Boolean(path))
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(0)

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    if (!path) {
      setData([])
      setLoading(false)
      return
    }

    let cancelled = false

    fetch(`${API_URL}${path}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setError(null)
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load data')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [path, version])

  return { data, loading, error, reload }
}