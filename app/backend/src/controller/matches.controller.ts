import { Request, Response } from 'express';
import matchesService from '../service/matches.service';
import customError from '../helpers/customError';
import { decodeToken } from '../helpers/token';

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

  // POST
  static async addMatch(req: Request, res:Response) {
    const match = req.body;
    const { authorization } = req.headers;

    if (!authorization) throw customError('BadRequest', 'Token not found');

    try {
      const decodedAuth = decodeToken(authorization);
      await matchesService.validateToken(decodedAuth);
    } catch (error: any) {
      error.message = 'Token must be a valid token';

      return res.status(401).json({ message: error.message });
    }

    if (match.homeTeam === match.awayTeam) {
      throw customError(
        'Unauthorized',
        'It is not possible to create a match with two equal teams',
      );
    }

    const result = await matchesService.addMatch(match);

    return res.status(201).json(result);
  }

  // PATCH
  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    const result = await matchesService.finishMatch(id);

    return res.status(200).json(result);
  }
}
