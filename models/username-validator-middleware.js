// check : https://community.auth0.com/t/username-can-only-contain-alphanumeric-characters-and-or/6645

const usernameValidator = {
  validator: (value) => {
    return /^([A-Za-z0-9_-]){3,20}$/.test(value);
  },

  message:
    'Invalid username. Usernames may only contain alpha-numeric characters, "_", and "-".',
};

module.exports = {
  usernameValidator,
};
