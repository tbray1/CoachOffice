import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PlayerContext from "../../context/player/playerContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const playerContext = useContext(PlayerContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearPlayers } = playerContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearPlayers();
  };

  const authLinks = (
    <>
      <li>Hi Coach {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Coach Office",
  icon: "fas fa-basketball-ball",
};
export default Navbar;
