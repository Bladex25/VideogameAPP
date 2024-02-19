import SearchBar from "../searchBar/SearchBar";
import { NavLink } from "react-router-dom";
import "./navbar.styles.css";

function Navbar ({showSearchBar, showHomeButton}) {
    return(
        <div>
            <div className="navbar">
                <NavLink to="/" className="navbar-brand"> 
                    <span className="span-games"  >Games</span> 
                    <span className="brand-text">Dungeon</span>
                </NavLink>
                {showHomeButton && (
                    <NavLink to={"/home"}>
                        <a className="home">Home</a>
                    </NavLink>
                )}
               
                {showSearchBar && <SearchBar /> }

                 {showSearchBar && (
                    <NavLink to={"/create"}>
                        <a className="create">Create</a>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Navbar;