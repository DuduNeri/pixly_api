import express from "express";
import cors from "cors";
import routes from "./routes/test";
import { userRoute } from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api", userRoute);

export default app;
