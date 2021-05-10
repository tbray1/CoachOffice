import {
  GET_PLAYERS,
  ADD_PLAYER,
  DELETE_PLAYER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PLAYER,
  FILTER_PLAYERS,
  CLEAR_FILTER,
  PLAYER_ERROR,
  CLEAR_PLAYERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
        loading: false,
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [action.payload, ...state.players],
        loading: false,
      };
    case UPDATE_PLAYER:
      return {
        ...state,
        players: state.players.map((player) =>
          player._id === action.payload._id ? action.payload : player
        ),
        loading: false,
      };
    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter(
          (player) => player._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_PLAYERS:
      return {
        ...state,
        players: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_PLAYERS:
      return {
        ...state,
        filtered: state.players.filter((player) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return player.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case PLAYER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
