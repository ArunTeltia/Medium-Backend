const f = require("faker");
//populate fake data and out them as Mock and then send that data to index.js
//that will be responsivle for getting all the values

//create mock user 
const userMock = () => ({
  username: f.name.firstName(),
  avatar_url: f.internet.avatar(),
});

const storyMock = ({ author, title, body, parent }) => ({
  author,
  title: title || f.company.catchPhrase(),
  body: f.lorem.paragraphs(2),
  parent: parent || null,
});

const clapMock = ({ user, story, count }) => ({
  user,
  story,
  count: count || 0,
});

module.exports = {
  userMock,
  storyMock,
  clapMock,
};
