function Navbar (){
    return(
        <div class="main-nav">
            <nav class="navbar">
                <div class="h1">
                    <h1>FLAVORFIND</h1>
                </div>
             <ul>
                <li><a href="#main"><img src="../public/home.png"></img></a></li>
                <li><a href="#recipe"><img src="../public/recipe.png"></img></a></li>
                <li><a href="#feedback"><img src="../public/feedback.png"></img></a></li>
             </ul>
             <button class="darkMode"><img src="../public/dark.png"></img></button>
            </nav>
        </div>
    )
}

export default Navbar;