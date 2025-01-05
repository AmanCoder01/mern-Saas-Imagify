import express from 'express'
import "dotenv/config"
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"
import postRouter from "./routes/post.route.js"
import connectDb from './database/mongoDb.js'
import { configureCors } from './config/corsConfig.js'

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(configureCors());


app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/post", postRouter);


app.get("/", (req, res) => {
    res.send("Hello its Working !");
})

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });