import express, { Request, Response, NextFunction } from "express";
import connect from "./db/connection";
import config from "./config/default";
import router from "./controllers/auth_controller";

const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use("/api", router);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    Welcome: "Welcome to Node.TypeScript APP ",
  });
});

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
  connect();
});
