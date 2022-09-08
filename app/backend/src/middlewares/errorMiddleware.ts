import { NextFunction, Request, Response } from 'express';

export default (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err as Error;

  switch (name) {
    case 'BadRequest':
      res.status(400).json({ message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }
};
