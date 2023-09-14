require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoute = require("./routes/budgetRoute");
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//transaction
app.use("/api/transactions", transactionRoutes);

//transaction
app.use("/api/budget", budgetRoute);

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Listening on port ${port}...`));