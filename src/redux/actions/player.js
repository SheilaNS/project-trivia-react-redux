import { CREATE_PLAYER, SAVE_PLAYER_SCORE } from '.';

export const createUserPlayer = ({ name, assertions, score, email }) => ({
  type: CREATE_PLAYER,
  name,
  assertions,
  score,
  email,
});

export const savePlayerScore = (score) => ({
  type: SAVE_PLAYER_SCORE,
  points: score,
});
