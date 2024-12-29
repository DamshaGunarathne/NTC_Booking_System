// Import required libraries
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swaggerConfig");
 
// Load environment variables
dotenv.config();
 
// Import route handlers
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const operatorRoutes = require("./routes/OperatorRoutes");
const commuterRoutes = require("./routes/CommuterRoutes");
const reservationRoutes = require("./routes/ReservationRoutes");
const routeRoutes = require("./routes/RouteRoutes");
 
// Import middleware
const errorMiddleware = require("./middleware/errorMiddleware");
 
// Initialize Express app
const app = express();
 
// Middleware for parsing JSON requests
app.use(express.json());
 
 
// Route handlers
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/commuters", commuterRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/routes", routeRoutes);
 
// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the RESTful API for the National Transport Commission!");
});
 
// Error middleware for centralized error handling
app.use(errorMiddleware);
 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

swaggerConfig(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});