import redis from './redis'
import getUser from './getUser'
import { canDeleteStoredComment } from './comment-policy.mjs'

export default async function deleteComments(req, res) {
  const { url, id } = req.body || {}
  const { authorization } = req.headers

  if (typeof url !== 'string' || url.length === 0 || url.length > 512 || typeof id !== 'string' || !authorization) {
    return res.status(400).json({ message: 'Invalid request.' })
  }

  try {
    const user = await getUser(authorization)
    if (!user?.sub) return res.status(401).json({ message: 'Invalid authorization.' })

    const rawComments = await redis.lrange(url, 0, -1)
    const storedRaw = rawComments.find((raw) => {
      try {
        return JSON.parse(raw)?.id === id
      } catch {
        return false
      }
    })

    if (!storedRaw) return res.status(404).json({ message: 'Comment not found.' })

    const storedComment = JSON.parse(storedRaw)
    const isAdmin = Boolean(process.env.AUTH0_ADMIN_EMAIL) && process.env.AUTH0_ADMIN_EMAIL === user.email
    const allowed = canDeleteStoredComment({
      actorSub: user.sub,
      storedOwnerSub: storedComment?.user?.sub,
      isAdmin,
    })

    if (!allowed) return res.status(403).json({ message: 'Forbidden.' })

    await redis.lrem(url, 1, storedRaw)
    return res.status(204).end()
  } catch (error) {
    console.error('Comment delete failed', error)
    return res.status(500).json({ message: 'Unable to delete comment.' })
  }
}
