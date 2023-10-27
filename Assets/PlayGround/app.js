// Option + sift + downArrow for copy 
// Fetch Funtion return a promiise.
console.log("Running script");
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const recipeContainer = document.querySelector(".recipe-container");

// Function to get recipes
const fetchRecipes = async (query) =>{
    const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);
}

searchButton.addEventListener('click' , (e)=>{
    console.log("button clicked");
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
})