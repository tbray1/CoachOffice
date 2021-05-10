import React, { useState, useContext, useEffect } from "react";
import PlayerContext from "../../context/player/playerContext";

const PlayerForm = () => {
  const playerContext = useContext(PlayerContext);

  const { addPlayer, updatePlayer, clearCurrent, current } = playerContext;

  useEffect(() => {
    if (current !== null) {
      setPlayer(current);
    } else {
      setPlayer({
        name: "",
        jersey: "",
        position: "",
        year: "Freshman",
      });
    }
  }, [playerContext, current]);

  const [player, setPlayer] = useState({
    name: "",
    jersey: "",
    position: "",
    year: "",
  });

  const { name, jersey, position, year } = player;

  const onChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addPlayer(player);
    } else {
      updatePlayer(player);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Player" : "Add Player"}</h2>
      <h4>Name</h4>
      <input
        type="text"
        placeholder="Michael Jordan"
        name="name"
        value={name}
        onChange={onChange}
      />
      <h4>Jersey Number</h4>
      <input
        type="number"
        name="jersey"
        placeholder="23"
        min="1"
        max="99"
        value={jersey}
        onChange={onChange}
      />
      <h4>Position</h4>
      <select>
        <option name="position" value="PG" onChange={onChange}>
          Point Guard
        </option>
        <option name="position" value="SG" onChange={onChange}>
          Shooting Guard
        </option>
        <option name="position" value="SF" onChange={onChange}>
          Small Forward
        </option>
        <option name="position" value="PF" onChange={onChange}>
          Power Forward
        </option>
        <option name="position" value="C" onChange={onChange}>
          Center
        </option>
      </select>
      <h4>Year</h4>
      <input
        type="radio"
        name="year"
        value="freshman"
        onChange={onChange}
      />{" "}
      Freshman{" "}
      <input type="radio" name="year" value="sophomore" onChange={onChange} />{" "}
      Sophomore{" "}
      <input type="radio" name="year" value="junior" onChange={onChange} />{" "}
      Junior{" "}
      <input type="radio" name="year" value="senior" onChange={onChange} />{" "}
      Senior{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Player" : "Add Player"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};
export default PlayerForm;
