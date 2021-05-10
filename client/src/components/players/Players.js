import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PlayerItem from "./PlayerItem";
import Spinner from "../layout/Spinner";
import PlayerContext from "../../context/player/playerContext";

const Players = () => {
  const playerContext = useContext(PlayerContext);

  const { players, filtered, getPlayers, loading } = playerContext;

  useEffect(() => {
    getPlayers();
    // eslint-disable-next-line
  }, []);

  if (players !== null && players.length === 0 && !loading) {
    return <h4>Please add a player</h4>;
  }

  return (
    <Fragment>
      {players !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((player) => (
                <CSSTransition key={player._id} timeout={500} classNames="item">
                  <PlayerItem player={player} />
                </CSSTransition>
              ))
            : players.map((player) => (
                <CSSTransition key={player._id} timeout={500} classNames="item">
                  <PlayerItem player={player} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Players;
