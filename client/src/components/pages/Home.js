import React from "react";
import Players from "../players/Players";
import PlayerForm from "../players/PlayerForm";
import PlayerFilter from "../players/PlayerFilter";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <PlayerForm />
      </div>
      <div>
        <PlayerFilter />
        <Players />
      </div>
    </div>
  );
};

export default Home;
