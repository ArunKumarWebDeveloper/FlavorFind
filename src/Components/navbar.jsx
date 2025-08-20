
function Navbar() {


  return (
    <div className="main-nav">
      <nav className="navbar">
        <div className="logo">
          <h1>FLAVORFIND</h1>
        </div>
        <ul>
          <li>
            <a href="#main">
              Home
            </a>
          </li>
          <li>
            <a href="#recipe">
             Recipe
            </a>
          </li>
          <li>
            <a href="#feedback">
              Feedback
            </a>
          </li>
        </ul>
        
      </nav>
    </div>
  );
}

export default Navbar;
