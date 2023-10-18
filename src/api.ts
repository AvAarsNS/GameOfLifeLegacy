import express, { Request, Response } from "express";

export const app: express.Application = express();

app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
  const response = `Welcome to the galaxy`;

  res.json({
    response,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
