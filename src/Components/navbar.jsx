
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
              <img src="/public/home.png" alt="home" />
            </a>
          </li>
          <li>
            <a href="#recipe">
              <img src="/public/recipe.png" alt="recipe" />
            </a>
          </li>
          <li>
            <a href="#feedback">
              <img src="/public/feedback.png" alt="feedback" />
            </a>
          </li>
        </ul>
        
      </nav>
    </div>
  );
}

export default Navbar;
