import db from '../database/models';
import customError from '../helpers/customError';

const homeTeamsQuery = `SELECT tea.team_name as 'name',
SUM(home_team_goals > away_team_goals) * 3 + 
SUM(home_team_goals = away_team_goals) as 'totalPoints',
COUNT(home_team) as 'totalGames',
  SUM(home_team_goals > away_team_goals) as 'totalVictories',
  SUM(home_team_goals = away_team_goals) as 'totalDraws',
  SUM(home_team_goals < away_team_goals) as 'totalLosses',
SUM(home_team_goals) as 'goalsFavor',
  SUM(away_team_goals) as 'goalsOwn',
  SUM(home_team_goals) - SUM(away_team_goals) as 'goalsBalance',
  ROUND((SUM(home_team_goals > away_team_goals) * 3 + 
  SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, 2) as 'efficiency'
FROM TRYBE_FUTEBOL_CLUBE.matches as mat
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as tea
ON mat.home_team = tea.id
WHERE in_progress = 0
GROUP BY home_team
ORDER BY SUM(home_team_goals > away_team_goals) * 3 + SUM(home_team_goals = away_team_goals) DESC, 
SUM(home_team_goals) - SUM(away_team_goals) DESC,
  SUM(home_team_goals) DESC,
  SUM(away_team_goals) ASC
`;

export default class LeaderBoardService {
  static async filterHomeTeams() {
    const [result] = await db.query(homeTeamsQuery);
    console.log(result);

    if (!result) throw customError('NotFoundError', 'There is no team');

    return result;
  }
}
