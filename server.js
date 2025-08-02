require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const appointmentLogRoutes = require('./routes/appointmentLogRoutes');

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', appointmentLogRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/receptionist', require('./routes/receptionistRoutes'));
app.get('/', (req, res) => {
  res.send('Clinic API running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});