import { CREATE_PLAYER, SAVE_PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SAVE_PLAYER_SCORE:
    return {
      ...state,
      score: Number(state.score + action.points),
      assertions: Number(state.assertions + action.assertions),
    };
  default:
    return state;
  }
};

export default player;
