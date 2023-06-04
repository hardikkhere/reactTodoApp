import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );
      toast.success("Logged out successfully..!");
      setIsAuthenticated(false);
      setLoading(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>TODO APP</h2>
      </div>
      <article>
        <Link to={"/"}>Home </Link>
        <Link to={"/profile"}>Profile </Link>

        {isAuthenticated ? (
          <Link
            to={"/"}
            disabled={loading}
            className="btn"
            onClick={logoutHandler}
          >
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login </Link>
        )}
      </article>
    </nav>
  );
}

export default Header;
