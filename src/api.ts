import express, { Request, Response } from "express";
import { generateNextTick, startNewGame } from "./gameoflife";

export const app: express.Application = express();

app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
  const universe = startNewGame(req.body.height, req.body.width, req.body.pattern);

  res.json({
    tickNumber: 0,
    universe,
  });
});

app.post("/tick", (req: Request, res: Response) => {
  const nextUniverse = generateNextTick(req.body.universe);
  const tickNumber = req.body.tickNumber + 1;

  res.json({
    tickNumber,
    universe: nextUniverse,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});