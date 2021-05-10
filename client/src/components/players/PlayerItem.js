import React, { useContext } from "react";
import PropTypes from "prop-types";
import PlayerContext from "../../context/player/playerContext";

const PlayerItem = ({ player }) => {
  const playerContext = useContext(PlayerContext);
  const { deletePlayer, setCurrent, clearCurrent } = playerContext;

  const { _id, name, jersey, position, year } = player;

  const onDelete = () => {
    deletePlayer(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} <small>{position}</small>{" "}
      </h3>
      <p>{year}</p>
      <ul className="list">
        {jersey && (
          <li>
            <i className="fas fa-basketball-ball" /> {jersey}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(player)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

PlayerItem.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerItem;
