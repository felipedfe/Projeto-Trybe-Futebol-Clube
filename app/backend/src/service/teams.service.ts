import TeamsModel from '../database/models/team';

export default class TeamsService {
  static async list() {
    const result = await TeamsModel.findAll();

    const allTeams = result.map((team) => team.get());

    return allTeams;
  }

  static async getById(id: string) {
    const result = await TeamsModel.findOne({
      where: { id },
    });

    // ? para caso ele seja null
    return result?.get();
  }
}
