const stories = ({ query: { limit, currentPage }, foundUser }, res) =>
  foundUser
    .getStories({ limit, currentPage, onlyStories: true })
    .then((stories) => foundUser.shapeAuthoredStories(stories))
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

const responses = ({ query: { limit, currentPage }, pathUser }, res) =>
  pathUser
    .getStories({ limit, currentPage, onlyResponses: true })
    .then((responses) => pathUser.shapeAuthoredStories(responses))
    .then((responses) =>
      pathUser.addStoriesPagination({ responses, limit, currentPage })
    )
    .then((shapedResponses) => res.json(shapedResponses))
    .catch(console.error);

const following = ({ pathUser }, res) =>
  pathUser.getFollowing().then(res.json).catch(console.error);

const clappedStories = ({ pathUser }, res) =>
  pathUser.getClappedStories().then(res.json).catch(console.error);

module.exports = {
  stories,
  following,
  responses,
  clappedStories,
};
