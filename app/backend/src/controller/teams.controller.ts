import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  // GET
  static async list(req: Request, res: Response) {
    const allTeams = await TeamsService.list();

    return res.status(200).json(allTeams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(id);
    console.log(team);

    return res.status(200).json(team);
  }
}
