const _express = require('express');
const _dotenv = require('dotenv');
const _mongoose = require('mongoose');
const _swaggerUI = require('swagger-ui-express');
const _swaggerConfig = require('./swaggerConfig');

const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const operatorRoutes = require('./routes/OperatorRoutes');
const commuterRoutes = require('./routes/CommuterRoutes');

_dotenv.config();

const _app = _express();

_app.get('/', (req, res) => {
  res.send('Welcome to the NTC Bus Seat Reservation System API');
});


// Middleware
_app.use(_express.json());

// Swagger Documentation
_app.use('https://ntc-booking-system-1.onrender.com/api-docs', _swaggerUI.serve, _swaggerUI.setup(_swaggerConfig));

// Users
_app.use('/api/users', userRoutes);

// Admin
_app.use('/api/admin', adminRoutes);

// Operator
_app.use('/api/operator', operatorRoutes);

// Commuter
_app.use('/api/commuter', commuterRoutes);

// Error Middleware
_app.use(require('./middleware/errorMiddleware'));

// MongoDB Connection
_mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message); // Correctly log the error
  });

// Start Server
const PORT = process.env.PORT || 3000;
_app.listen(PORT, () => {
  console.log(`Node API is running on port ${PORT}`);
});
