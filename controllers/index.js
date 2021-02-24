const authenticationCookie = {};

const endpointMap = {
  user: {
    prefix: ":username",
    followers: [],
    following: {},
    stories: [],
    responses: {},
    claps: {},
  },

  story: {},

  topics: {
    root: {},
  },

  auth: {
    register: {
      method: "POST",
      example: {
        username: "Arun_Teltia",
        password: "password",
        confirmPassword: "password",
      },
    },
    login: {
      method: "POST",
      authorization: null,
      example: {
        username: "Arun_Teltia",
        password: "password",
      },
    },
    logout: {
      method: "GET",
      authentication: authenticationCookie,
    },
  },
};
