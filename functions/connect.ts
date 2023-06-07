import { Request, Response } from "express";

const connect = (req: Request, res: Response) => {
  res.send(`Hello ${req.query.name}!`);
};

export default connect;
