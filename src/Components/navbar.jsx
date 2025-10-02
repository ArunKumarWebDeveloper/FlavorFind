//work is pending for responsive and mobile version//
function Navbar() {


  return (
  <div className="main-nav">
    <img className="recipe" src="./rrecipe.png"></img>
  <nav className="navbar">
    
    <div className="logo">
      <h1>FLAVORFIND</h1>
    </div>
    <ul>
      <li><a href="#main">Home</a></li>
      <li><a href="#recipe">Recipe</a></li>
      <li><a href="#feedback">Feedback</a></li>
    </ul>

  </nav>
  <a href="#recipe">
  <img  className="rlogo" src="./rlogo.png"></img>
  </a>
</div>
  );
}

export default Navbar;
