import redis from './redis'
import { nanoid } from 'nanoid'
import getUser from './getUser'
import { validateCommentText } from './comment-policy.mjs'

export default async function createComments(req, res) {
  const { url } = req.body || {}
  const { authorization } = req.headers

  if (typeof url !== 'string' || url.length === 0 || url.length > 512 || !authorization) {
    return res.status(400).json({ message: 'Invalid request.' })
  }

  let text
  try {
    text = validateCommentText(req.body?.text)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  try {
    const user = await getUser(authorization)
    if (!user?.sub) return res.status(401).json({ message: 'Invalid authorization.' })

    const { name, picture, sub } = user
    const comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: { name, picture, sub },
    }

    await redis.lpush(url, JSON.stringify(comment))
    return res.status(201).json(comment)
  } catch (error) {
    console.error('Comment create failed', error)
    return res.status(500).json({ message: 'Unable to create comment.' })
  }
}
