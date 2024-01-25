// Option + sift + downArrow for copy 
// Fetch Funtion return a promiise.
console.log("Running script");
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-close-btn");


// Function to get recipes
// const fetchRecipes = async (query) =>{
//     const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();
//     console.log(response);
// }

const fetchRecipes = (query) => {

    recipeContainer.innerHTML = '<h2>Fetching your meal....</h2>';

    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((data) => data.json())
        .then((response) => {
            // console.log(response);
            // console.log(response.meals[0].idMeal);
            recipeContainer.innerHTML ='';

            // While   response is not  null or meal isn't available.
            if(response.meals && Array.isArray(response.meals)){

                response.meals.forEach(meal => {
                    console.log(meal , "meal is here  yeahhh");
                    // Use to give class and create html elements in js
                    const recipeDiv  = document.createElement('div');
                    recipeDiv.classList.add('recipe');
                    recipeDiv.innerHTML = `
                        <img src="${meal.strMealThumb}">
                        <h3>${meal.strMeal}</h3>
                        <p> <span>${meal.strArea}</span> Dish</p>
                        <p>Blongs to <span>${meal.strCategory}</span> Category </p>
                    `
                    const viewRecipeBtn = document.createElement('button');
                    viewRecipeBtn.classList.add('viewRecipeBtn');
                    viewRecipeBtn.textContent = "View More.."
                    recipeDiv.appendChild(viewRecipeBtn);
    
                    viewRecipeBtn.addEventListener('click', ()=>{
                        // console.log("happened");
                        openRecipePopup(meal);
                    });
    
    
    
                    recipeContainer.appendChild(recipeDiv);
                });

            }
            else {
                console.log("No meals found.");
                recipeContainer.innerHTML = '<h2>No Result Found :( Please try another Meal.</h2>';
            }
        })
        
    // .catch((error) => {
    //     console.error(error);
    //     recipeContainer.innerHTML = '<h2>No Result Found. Please try another Meal.</h2>';

    // });
};


// Fetch Ingredient Inside View Recipe Button.
const fetchIngredient=(meal)=>{
    // console.log(meal);
    let ingredientList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measureMent = meal[`strMeasure${i}`];
            ingredientList += `<li>${measureMent} ${ingredient}</li>`
        }
        else{
            break;
        }
       
    }
    return ingredientList;

}

// OpenRecipe Popup will contains the more details about search meal ---> (single meal)
const openRecipePopup = (meal) => {
    console.log("happened");
    recipeDetailsContent.innerHTML=`
        <h2 class='recipeName'> ${meal.strMeal} </h2>
        <h3> Ingredient: </h3>
        <ul class='ingredientListItem'>${fetchIngredient(meal)}</ul>
        <div  class='recipeInstructions'>
            <h4>Instructions</h4>
            <p>${meal.strInstructions}</p>
        </div>
    `
    // parentElement is recipe-details div 
    recipeDetailsContent.parentElement.style.cssText=`
        display: block;
    `

}

// Close Recipe Details Popup on Click 
recipeClosebtn.addEventListener('click' , ()=>{
    // console.log("button closed");
    recipeDetailsContent.parentElement.style.display = 'none';
})

searchButton.addEventListener('click' , (e)=>{
    // console.log("button clicked");
    // Sometime Console blink the js response that why even.prevvent default written here.
    e.preventDefault(); 
    const searchInput = searchBox.value.trim();
    if(searchInput===""){
        // window.alert("Input box can't be empty");
        recipeContainer.innerHTML = `<h2> Search Box can't be Empty, Please Enter Meal You Want Search !! </h2>`
        return;
    }
    fetchRecipes(searchInput);
})