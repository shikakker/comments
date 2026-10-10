import test from 'node:test';
import assert from 'node:assert/strict';
import { canDeleteStoredComment, validateCommentText } from '../lib/comment-policy.mjs';

test('delete authorization is based on stored ownership, not request payload ownership', () => {
  assert.equal(canDeleteStoredComment({ actorSub: 'attacker', storedOwnerSub: 'author', isAdmin: false }), false);
  assert.equal(canDeleteStoredComment({ actorSub: 'author', storedOwnerSub: 'author', isAdmin: false }), true);
  assert.equal(canDeleteStoredComment({ actorSub: 'admin', storedOwnerSub: 'author', isAdmin: true }), true);
});

test('comment text rejects blank and oversized values', () => {
  assert.throws(() => validateCommentText('   '));
  assert.throws(() => validateCommentText('x'.repeat(2001)));
  assert.equal(validateCommentText(' hello '), 'hello');
});
