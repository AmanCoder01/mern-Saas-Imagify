import express from 'express'
import cors from "cors"
import "dotenv/config"
import connectDb from './config/mongoDb.js';
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello its Working !");
})

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });