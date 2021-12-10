import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <div className='nav'>
      <Link to='/'>
        <h1>Home</h1>
      </Link>
    </div>
  );
}
export default Nav;
