import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useAuth0 } from '@auth0/auth0-react'

export default function useComments() {
  const { getAccessTokenSilently } = useAuth0()
  const [text, setText] = useState('')
  const [url, setUrl] = useState(null)

  const { data: comments, mutate } = useSWR(
    () => {
      const query = new URLSearchParams({ url })
      return `/api/comment?${query.toString()}`
    },
    {
      initialData: [],
    }
  )

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = await getAccessTokenSilently()

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ url, text }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Unable to create comment')
      setText('')
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (comment) => {
    const token = await getAccessTokenSilently()

    try {
      const response = await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({ url, id: comment.id }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Unable to delete comment')
      await mutate()
    } catch (err) {
      console.error(err)
    }
  }

  return { text, setText, comments, onSubmit, onDelete }
}
