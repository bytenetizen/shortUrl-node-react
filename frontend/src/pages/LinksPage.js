import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET')
      setLinks(fetched.links)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}
