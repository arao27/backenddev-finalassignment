const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/prs', require('./routes/prs'));
app.use('/auth', require('./routes/auth'));
app.use('/exercises', require('./routes/exercises'));

// Error handler
app.use(require('./middleware/errorHandler'));

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;