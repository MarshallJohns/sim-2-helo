require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require('express-session')
const app = express();
const ctrl = require("./controller");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookies: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//auth
app.post("/auth/register", ctrl.registerUser);
app.post("/auth/login", ctrl.login);
app.post('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)

//posts
app.get("/api/posts", ctrl.getPosts);
app.get("/api/post/:postId", ctrl.getPost);
app.post("/api/posts", ctrl.createPost);
app.delete('/api/posts/:postId', ctrl.deletePost)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("DB READY");
  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}`)
  );
});
