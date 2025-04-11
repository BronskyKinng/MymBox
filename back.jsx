const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // { email, password, favorites: [{ id, title, poster_path }] }
const SECRET_KEY = 'secret_key';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, favorites: [] });
  res.status(201).json({ message: 'User created' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/favorites', authenticateToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email);
  res.json(user.favorites);
});

app.post('/api/favorites', authenticateToken, (req, res) => {
  const { id, title, poster_path } = req.body;
  const user = users.find((u) => u.email === req.user.email);
  if (!user.favorites.some((fav) => fav.id === id)) {
    user.favorites.push({ id, title, poster_path });
  }
  res.status(201).json({ message: 'Added to favorites' });
});

app.delete('/api/favorites/:id', authenticateToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email);
  user.favorites = user.favorites.filter((fav) => fav.id !== parseInt(req.params.id));
  res.json({ message: 'Removed from favorites' });
});

app.listen(5000, () => console.log('Server running on port 5000'));