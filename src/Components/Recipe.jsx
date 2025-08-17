const Recipe = () => {
    return(
        <div id="recipe" class="recipe-list">
             <input type="search" placeholder="Type Your favorite Food"></input>
                <button class="search" >Search</button>
                <div class="display-section">

                </div>
                <div class="main-recipe">
               <div class="recipe-card">
                <img src="Dosa.png"></img>
                <p>Masala Dosa</p>
                <button>Recipe</button>
               </div>
               <div class="recipe-card">
                <img src="idli.png"></img>
                <p>Idli</p>
                <button>Recipe</button>
               </div>
               <div class="recipe-card">
                <img src="pizza.jpg"></img>
                <p>Margerita Pizza</p>
                <button>Recipe</button>
               </div>
               <div class="recipe-card">
                <img src="noddles.jpg"></img>
                <p>Veg Noodles</p>
                <button>Recipe</button>
               </div>
               <div class="recipe-card">
                <img src="spageti.jpg"></img>
                <p>Spagettei</p>
                <button>Recipe</button>
               </div>
               </div>
        </div>
    )
}

export default Recipe;