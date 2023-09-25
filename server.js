const express = require('express');
const handlebars = require('handlebars');
const sequelize = require('sequelize');
const app = express();

app.engine('.hbs', handlebars.engine);
helpers: {
};
app.set('view engine', '.hbs');

const db = sequelize.connect('mysql://localhost:3306/blog_site', {
  username: 'root',
  password: 'root',
});

const Post = db.define('post', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

app.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.render('index', { posts });
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
  
});
