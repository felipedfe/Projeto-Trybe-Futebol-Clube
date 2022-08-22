// import customError from '../helpers/customError';
import TeamsModel from '../database/models/team';

export default class TeamsService {
  static async list() {
    const result = await TeamsModel.findAll();

    const allTeams = result.map((team) => team.get());

    return allTeams;
  }
}
