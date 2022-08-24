import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderBoard.service';

export default class LeaderBoardController {
  // GET
  static async filterHomeTeams(req: Request, res: Response) {
    const result = await LeaderBoardService.filterHomeTeams();

    return res.status(200).json(result);
  }
}
