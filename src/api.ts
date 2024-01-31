import express, { Request, Response } from "express";
import cors from "cors";
import { generateNextTick, startNewGame } from "./gameoflife";

export const app: express.Application = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
  res = startTheGame(req, res);
});

export function startTheGame(req: Request, res: Response): Response {
  const validPatterns = ["random", "glider", "beehive", "blinker"];
  if (isPatternInvalid(req.body.pattern, validPatterns)) {
    res.status(400).send("Invalid pattern");
    return res;
  }
  const universe = startNewGame(req.body.height, req.body.width, req.body.pattern);

  res.status(200);
  res.json({
    tickNumber: 0,
    universe,
  });

  return res;
}

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

function isPatternInvalid(pattern: string, validPatterns: string[]) {
  return !pattern || !validPatterns.includes(pattern);
}
