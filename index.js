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

const router = express.Router();
router.use('/api/tasks', tasksRouter);
router.use('/api/ai', aiRouter);

router.get('/', (req, res) => {
  res.send('Lezat AI Backend is running!');
});

app.use('/', router);
app.use('/.netlify/functions/api', router);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
