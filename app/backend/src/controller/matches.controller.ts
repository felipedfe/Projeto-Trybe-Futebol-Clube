import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

export default class MatchesController {
  // GET
  static async list(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches = [];

    switch (inProgress) {
      case 'true': {
        matches = await matchesService.listInProgress();
        break;
      }
      case 'false': {
        matches = await matchesService.listFinished();
        break;
      }
      default:
        matches = await matchesService.listAll();
    }

    return res.status(200).json(matches);
  }

  static async addMatch(req: Request, res:Response) {
    const match = req.body;

    const result = await matchesService.addMatch(match);

    return res.status(201).json(result);
  }
}
