// Option + sift + downArrow for copy 
// Fetch Funtion return a promiise.
console.log("Running script");
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const recipeContainer = document.querySelector(".recipe-container");

// Function to get recipes
// const fetchRecipes = async (query) =>{
//     const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();
//     console.log(response);
// }

const fetchRecipes = (query) => {

    recipeContainer.innerHTML = 'Fetching your meal....';
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((data) => data.json())

        .then((response) => {
            // console.log(response);
            // console.log(response.meals[0].idMeal);
            recipeContainer.innerHTML ='';
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
                const viewRecipe = document.createElement('button');
                viewRecipe.classList.add('viewRecipe');
                viewRecipe.textContent = "View More.."
                recipeDiv.appendChild(viewRecipe);
                recipeContainer.appendChild(recipeDiv);
            });
        })
        
        .catch((error) => {
            console.error(error);
        });
};

searchButton.addEventListener('click' , (e)=>{
    // console.log("button clicked");
    // Sometime Console blink the js response that why even.prevvent default written here.
    e.preventDefault(); 
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
})