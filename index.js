require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./src/config/database');
const connectMongo = require('./src/config/mongodb');
const defineUser = require('./src/models/mysql/User');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sensorRoutes = require('./src/routes/sensorRoutes');

app.use(cors());
app.use(express.json());
sequelize.sync({ alter: true }).then(() => {
  console.log("Banco de dados sincronizado!");
});
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/api', sensorRoutes);

app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));