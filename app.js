const express = require('express');
const { testConnection } = require('./database');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');
const prRoutes = require('./routes/prs');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/prs', prRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

testConnection();

app.listen(PORT, () => console.log('Server running on port ${PORT}'));