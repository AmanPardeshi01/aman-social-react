export const isLikedByReqUser = (reqUserId, post) => {
  // Check if post.liked is an array
  if (!Array.isArray(post.liked)) {
    console.error('Expected post.liked to be an array but got:', typeof post.liked);
    return false;
  }

  // Use Array.prototype.some for more concise code
  return post.liked.some(user => user.id === reqUserId);
}
