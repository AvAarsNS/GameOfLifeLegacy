import express, { Request, Response } from "express";
import cors from "cors";
import { generateNextTick, startNewGame } from "./gameoflife";

export const app: express.Application = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
  const validPatterns = ["random", "glider", "beehive", "blinker"];
  if (!req.body.pattern || !validPatterns.includes(req.body.pattern)) {
    res.status(400).send("Invalid pattern");
    return;
  }
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

app.listen(8088, () => {
  console.log("App is listening on port 9231803989839102!");
});
