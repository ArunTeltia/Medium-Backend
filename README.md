## Medium Backend Node,Express, MongoDB API

![Node Version](https://img.shields.io/badge/node-v14.15.4-yellow.svg)
![NPM Version](https://img.shields.io/badge/npm-v6.14.10-blue.svg)
![Express Version](https://img.shields.io/badge/express-v4.17.1-red.svg)
![Mongoose Version](https://img.shields.io/badge/mongoose-v5.11.18-orange.svg)

Todos

- [x] Database Connection
- [x] Server connection
- [ ] API creation for all Schema ( ongoing )
- [ ] Set a max claps 50 for each story by one user 
- [ ] Pagination ? 

    -[x] story
    -[ ] followersList
    -[ ] clapsList
    -[ ] userList

- [ ] Think about /me
- [ ] error handling ?

    -[x] basic error handling
    -[ ] server down error handling

- [x] Maybe Webhook or reference for deleting the user from the follow list of another user

    -[x] using reference as virtual and method in schema

- [ ] Write Tests for each model 
- [x] Delete checkAPI and create a check for API

    -[x] No need to delete it

- [x] Authorisation using JWT or Passport ???

    -[x] JWT
    -[ ] Passport !?

- [ ] Cookie 
- [ ] Creating a Dockerfile
- [ ] Running Backend on Docker

A Medium Backend Clone with all its major backend functionality 
like 
1. Users
2. claps
3. story
4. Follow and Followers

This project is in progress

For testing Jest has been used and github actions are integreted for continuous integretion and continuous deployment

How to run this in local environment
1. install Node.
2. Clone this repo
3. install the dependencies with the help of ```npm install```
4. create a file .env and make the structure in the following way
```
MONGO_URI = ""
SALT_LENGTH = 6
JWT_SECRET = ""

```

Add mongouri bcrypt salt length and random jwt secret


