import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use("/users", userRouter);
app.use("/tour",tourRouter)
app.get("/",(req,res) => {
    res.send("welcome to tour API")
});

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => console.log(`server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`))
