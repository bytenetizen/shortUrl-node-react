import {useState, useCallback,useContext} from 'react'
import {AuthContext} from "../context/AuthContext";

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const auth = useContext(AuthContext);
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      headers['Authorization'] ='Bearer ' + auth.token;
      headers['Content-Type'] =  'application/json';
      if (body) {
        body = JSON.stringify(body)
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Oh, error')
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])
  const clearError = useCallback(() => setError(null), [])
  return { loading, request, error, clearError }
}
