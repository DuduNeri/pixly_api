import express from "express";
import cors from "cors";
import routes from "./routes/test";
import { userRoute } from "./routes/user.routes";
import { loginRouter } from "./routes/login.routes";
import { postRouter } from "./routes/post.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api", userRoute);
app.use("/api", loginRouter);
app.use("/api", postRouter);

export default app;
