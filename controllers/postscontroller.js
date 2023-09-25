const User = require("../models/user");

// index()
async function index(req, res) {
  const posts = await Post.findAll();
  res.render('posts/index', { posts });
}

// show()
async function show(req, res) {
  const post = await post.findById(req.params.id);
  res.render('posts/show', { post });
}

// create()
async function create(req, res) {
  const post = await post.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id,
  });
  res.redirect(`/posts/${post.id}`);
}

// update()
async function update(req, res) {
  const post = await post.findById(req.params.id);
  await post.update({
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect(`/posts/${post.id}`);
}

// delete()
async function remove(req, res) {
  const post = await post.findById(req.params.id);
  await post.destroy();
  res.redirect('/posts');
}

// search()
async function search(req, res) {
  const query = req.query.q;
  const posts = await Post.findAll({
    where: {
      title: {
        [Sequelize.Op.like]: `%${query}%`,
      },
    },
  });
  res.render('posts/search', { posts, query });
}

// getPostsByUser()
async function getPostsByUser(req, res) {
  const user = await user.findById(req.params.userId);
  const posts = await user.getPosts();
  res.render('posts/user', { posts, user });
}

// getMostRecentPosts()
async function getMostRecentPosts(req, res) {
  const posts = await posts.findAll({
    order: [['createdAt', 'DESC']],
    limit: 10,
  });
  res.render('posts/recent', { posts });
};
