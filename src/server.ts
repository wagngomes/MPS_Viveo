import express, { Request, Response } from "express";
import configureRoutes from "../src/Routes/index";
import { Express } from "express";

const app: Express = express();

configureRoutes(app);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json("appplication On");
});
app.use("/files", express.static("uploads"));

app.listen(3000, () => {
  console.log("Server on port 3000");
});

export default app;
