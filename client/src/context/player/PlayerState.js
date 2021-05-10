import React, { useReducer } from "react";
import axios from "axios";
import uuid from "uuid";
import PlayerContext from "./playerContext";
import playerReducer from "./playerReducer";
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

const PlayerState = (props) => {
  const initialState = {
    players: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const getPlayers = async () => {
    try {
      const res = await axios.get("/api/players");

      dispatch({
        type: GET_PLAYERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PLAYER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add player
  const addPlayer = async (player) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/players", player, config);

      dispatch({
        type: ADD_PLAYER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PLAYER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete player
  const deletePlayer = async (id) => {
    try {
      await axios.delete(`/api/players/${id}`);

      dispatch({
        type: DELETE_PLAYER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: PLAYER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update player
  const updatePlayer = async (player) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/players/${player._id}`, player, config);

      dispatch({
        type: UPDATE_PLAYER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PLAYER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear players
  const clearPlayers = () => {
    dispatch({ type: CLEAR_PLAYERS });
  };

  // Set Current player
  const setCurrent = (player) => {
    dispatch({ type: SET_CURRENT, payload: player });
  };

  // Clear Current player
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter players
  const filterPlayers = (text) => {
    dispatch({ type: FILTER_PLAYERS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <PlayerContext.Provider
      value={{
        players: state.players,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addPlayer,
        deletePlayer,
        setCurrent,
        clearCurrent,
        updatePlayer,
        filterPlayers,
        clearFilter,
        getPlayers,
        clearPlayers,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerState;
