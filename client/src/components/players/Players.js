import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
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
    <>
      {players !== null && !loading ? (
        <>
          {filtered !== null
            ? filtered.map((player) => (
                <motion.div
                  key={player._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <PlayerItem player={player} />
                </motion.div>
              ))
            : players.map((player) => (
                <motion.div
                  key={player._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <PlayerItem player={player} />
                </motion.div>
              ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Players;
