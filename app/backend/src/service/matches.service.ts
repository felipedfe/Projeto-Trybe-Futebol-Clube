// import customError from '../helpers/customError';
import MatchesModel from '../database/models/match';
import Team from '../database/models/team';

// interface typeTrueOrFalse {
//   0: boolean,
//   1: boolean,
// }

// const trueOrFalse: typeTrueOrFalse = {
//   0: false,
//   1: true,
// };

export default class MatchesService {
  static async list() {
    const result = await MatchesModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const allMatches = result.map((team) => {
      const obj = team.get();
      obj.inProgress = !!obj.inProgress;
      obj.teamHome = obj.teamHome.get();
      obj.teamAway = obj.teamAway.get();
      return obj;
    });

    // console.log(allMatches);

    return allMatches;
  }
}
