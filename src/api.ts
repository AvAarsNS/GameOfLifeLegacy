import express, { Request, Response } from "express";
import { startNewGame } from "./gameoflife";

export const app: express.Application = express();

app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
  const response = startNewGame(req.body.height, req.body.width, req.body.pattern);

  res.json({
    response,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
