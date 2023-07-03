import path from "path";
import express from "express";
import dotenv from "dotenv";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import customerRoutes from "./routes/customerRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadExelRoutes from "./routes/uploadExelRoutes.js";
import { verifiyCustomers } from "./controllers/customerController.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/users", userRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/data", dataRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/uploads", uploadRoutes);

app.use("/api/uploads/exel", uploadExelRoutes);

app.get("/customer/verify-email", verifiyCustomers);

// app.use("api/customer/otp", sendOtp);
// Create a static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//showing all details of users
// app.get("/api/users", (req, res) => {
//   res.json(users);
// });

// Error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
