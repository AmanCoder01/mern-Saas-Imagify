import express from 'express'
import "dotenv/config"
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"
import postRouter from "./routes/post.route.js"
import connectDb from './database/mongoDb.js'
import { configureCors } from './config/corsConfig.js'
import { createBasicRateLimiter } from './middlewares/rateLimiting.js'

const PORT = process.env.PORT || 4000;
const app = express();

app.use(configureCors());
app.use(createBasicRateLimiter(100, 15 * 60 * 1000)); //100 request per 15 minutes
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello its Working !");
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/post", postRouter);


connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });