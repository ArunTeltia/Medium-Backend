const userStoriesHandler = (
  { query: { limit, currentPage }, foundUser },
  res
) =>
  foundUser
    .getStories({ limit, currentPage, onlyStories: true })
    .then((stories) => foundUser.shapeAuthoredStories(stories)) // shape for response
    .then((stories) =>
      foundUser.addStoriesPagination({
        stories,
        onlyStories: true,
        limit,
        currentPage,
      })
    )
    .then(res.json)
    .catch(console.error);

const userFollowingHandler = ({ foundUser }, res) =>
  foundUser.getFollowing().then(res.json).catch(console.error);

const userResponsesHandler = ({ foundUser }, res) =>
  foundUser.getResponses().then(res.json).catch(console.error);

const userClappedHandler = ({ foundUser }, res) =>
  foundUser.getClappedStories().then(res.json).catch(console.error);

module.exports = {
  userStoriesHandler,
  userFollowingHandler,
  userResponsesHandler,
  userClappedHandler,
};
