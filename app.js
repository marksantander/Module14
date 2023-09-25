app.get('/users/:id/posts', async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await user.getPosts();
  res.render('user_posts', { user, posts });
});
