import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const {request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {externalUrl: link})
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Add Url</label>
        </div>
      </div>
    </div>
  )
}
