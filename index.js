const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require('./routes/tasks');
const aiRouter = require('./routes/ai');

app.use('/api/tasks', tasksRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
  res.send('Lezat AI Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
