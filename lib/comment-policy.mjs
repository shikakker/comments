export function validateCommentText(value) {
  if (typeof value !== 'string') throw new TypeError('Comment text is required.');
  const text = value.trim();
  if (text.length === 0) throw new TypeError('Comment text is required.');
  if (text.length > 2000) throw new RangeError('Comment text must be 2000 characters or fewer.');
  return text;
}

export function canDeleteStoredComment({ actorSub, storedOwnerSub, isAdmin }) {
  if (isAdmin) return true;
  return (
    typeof actorSub === 'string' &&
    actorSub.length > 0 &&
    typeof storedOwnerSub === 'string' &&
    actorSub === storedOwnerSub
  );
}
