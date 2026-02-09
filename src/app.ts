import express from "express";
import cors from "cors";
import routes from "./routes/test";
import { userRoute } from "./routes/user.routes";
import { loginRouter } from "./routes/login.routes";
import { postRouter } from "./routes/post.routes";
import router from "./routes/test";
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api", userRoute);
app.use("/api", loginRouter);
app.use("/api", postRouter);
app.use("/test", router)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

export default app;
