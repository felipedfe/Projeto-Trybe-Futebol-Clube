// import { Op } from 'sequelize';
import customError from '../helpers/customError';
import MatchesModel from '../database/models/match';
import Team from '../database/models/team';
import jwtToken from '../interfaces/IjwtToken';
import UserModel from '../database/models/user';

export default class MatchesService {
  static async formatResult(data: MatchesModel[]) {
    return data.map((team) => {
      const obj = team.get();
      obj.inProgress = !!obj.inProgress;
      obj.teamHome = obj.teamHome.get();
      obj.teamAway = obj.teamAway.get();
      return obj;
    });
  }

  static async validateToken(decodedToken: jwtToken) {
    const { data: email } = decodedToken;
    console.log(decodedToken);

    const findUser = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    console.log(findUser);
    if (!findUser) throw customError('Unauthorized', 'Token must be a valid token');
  }

  static async verifyMatchesIds(match: MatchesModel) {
    const result = await Team.findAll({
      where: {
        id: [match.homeTeam, match.awayTeam],
      },
    });

    if (result.length < 2) throw customError('NotFoundError', 'There is no team with such id!');
  }

  static async listAll() {
    const result = await MatchesModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const matches = this.formatResult(result);
    return matches;
  }

  static async listInProgress() {
    const result = await MatchesModel.findAll({
      where: {
        inProgress: 1,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const matches = this.formatResult(result);

    return matches;
  }

  static async listFinished() {
    const result = await MatchesModel.findAll({
      where: {
        inProgress: 0,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const matches = this.formatResult(result);
    console.log(matches);
    return matches;
  }

  // POST
  static async addMatch(match: MatchesModel) {
    await this.verifyMatchesIds(match);

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const result = await MatchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return result.get();
    // return null;
  }

  // PATCH
  static async finishMatch(id: string) {
    await MatchesModel.update({ inProgress: false }, {
      where: { id },
    });
    return { message: 'Finished' };
  }
}
