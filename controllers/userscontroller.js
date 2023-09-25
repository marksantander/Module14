// index()
async function index(req, res) {
  const users = await users.findAll();
  res.render('users/index', { users });
}

// show()
async function show(req, res) {
  const user = await user.findById(req.params.id);
  res.render('users/show', { user });
}

// create()
async function create(req, res) {
  const user = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect(`/users/<span class="math-inline">\{user\.id\}\`\);
\}
// update\(\)
async function update\(req, res\) \{
const user \= await User\.findById\(req\.params\.id\);
await user\.update\(\{
name\: req\.body\.name,
email\: req\.body\.email,
\}\);
res\.redirect\(\`/users/</span>{user.id}`);
}

// delete()
async function remove(req, res) {
  const user = await user.findById(req.params.id);
  await user.destroy();
  res.redirect('/users');
}

// login()
async function login(req, res) {
  const user = await user.findOne({ where: { email: req.body.email } });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.render('users/login', { error: 'Invalid email or password' });
  }

  req.session.user = user;
  res.redirect('/');
}

// logout()
function logout(req, res) {
  req.session.destroy();
  res.redirect('/users/login')
};
