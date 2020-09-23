const bcrypt = require("bcryptjs");
const { isCompositeComponent } = require("react-dom/test-utils");

module.exports = {
  registerUser: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const [user] = await db.check_user([username]);
    if (user) {
      return res.status(409).send("Username already taken");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const profilePic = `https://robohash.org/${username}`;

    const [newUser] = await db.register_user([username, hash, profilePic]);

    req.session.user = newUser


    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const [existingUser] = await db.check_user([username]);

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.password);

    if (!isAuthenticated) {
      return res.status(403).send("Incorrect email or password");
    }

    delete existingUser.password;

    req.session.user = existingUser
    res.status(200).send(req.session.user);
  },

  logout: async (req, res) => {
    console.log('hit logout')
    await req.session.destroy()
    console.log(req.session.user)
    res.sendStatus(200)
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }

  },

  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { user_posts, search } = req.query;

    const posts = await db.get_posts();

    //* if user_posts is true and there is a search
    if (req.session.user) {
      if (user_posts != "false" && search) {
        const lowerCaseSearch = search.toLowerCase();
        const filteredPosts = posts.filter((post) =>
          post.title.toLowerCase().includes(lowerCaseSearch)
        );
        return res.status(200).send(filteredPosts);
      }

      //* if user_posts is false but there is a search
      if (user_posts === "false" && search) {
        const lowerCaseSearch = search.toLowerCase();
        const filteredPosts = posts.filter(
          (post) =>
            post.author_id != id &&
            post.title.toLowerCase().includes(lowerCaseSearch)
        );
        return res.status(200).send(filteredPosts);
      }

      //* if user_posts if false and no search
      if (user_posts === "false") {
        const filteredPosts = posts.filter((post) => post.author_id != id);
        return res.status(200).send(filteredPosts);
      }

      //* if user_posts is true and no search
      if (user_posts === "true") {
        return res.status(200).send(posts);
      }
    }
  },

  getPost: async (req, res) => {
    const { postId } = req.params;
    const db = req.app.get("db");

    const [post] = await db.get_post_by_id([postId]);

    res.status(200).send(post);
  },

  createPost: async (req, res) => {
    const { title, imgUrl, content } = req.body;
    const { id } = req.session.user;
    const db = req.app.get("db");

    await db.create_post([title, imgUrl, content, id]);
    res.sendStatus(200);
  },

  deletePost: async (req, res) => {
    const { postId } = req.params
    const db = req.app.get('db')

    await db.delete_post([postId])
    res.sendStatus(200)
  }
};
