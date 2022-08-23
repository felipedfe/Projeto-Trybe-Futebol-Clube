import { Request, Response } from 'express';
import matchesService from '../service/matches.service';

export default class MatchesController {
  // GET
  static async list(req: Request, res: Response) {
    const allMatches = await matchesService.list();
    // console.log(allMatches);

    return res.status(200).json(allMatches);
  }
}
