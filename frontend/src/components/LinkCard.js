import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>Your link: <a href={link.externalUrl} target="_blank" rel="noopener noreferrer">{link.externalUrl}</a></p>
      <p>From: <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">{link.shortUrl}</a></p>
      <p>Click: <strong>{link.clicks}</strong></p>
      <p>Created: <strong>{new Date(link.created_at).toLocaleDateString()}</strong></p>
    </>
  )
}
