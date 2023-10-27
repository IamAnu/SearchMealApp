console.log("JavaScript Running");

// document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
    let hasSearched = false;

    // Function to fetch meals based on a category
    function getMealsByCategory(category) {
        return new Promise((resolve, reject) => {
            fetch(`${apiUrl}filter.php?c=${category}`)
                .then(response => {
                    if (!response.ok) {
                        reject(new Error(`HTTP error! Status: ${response.status}`));
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.meals) {
                        resolve(data.meals);
                    } else {
                        resolve([]); // Resolve with an empty array if no meals are found
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    // Function to display meals on the page
    function displayMeals(meals) {
        const appContainer = document.getElementById('app');

        // Clear previous content
        appContainer.innerHTML = '';

        if (hasSearched) {
            if (meals.length > 0) {
                // Display each meal
                meals.forEach(meal => {
                    const mealElement = document.createElement('div');
                    mealElement.classList.add('meal-container');
                    mealElement.innerHTML = `<h2 class="meal-title">${meal.strMeal}</h2>
                                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                                            <p class="meal-descriptio>${meal.strInstructions}</p>`;
                    appContainer.appendChild(mealElement);
                });
            } else {
                // Handle the case when there are no meals
                const noMealsMessage = document.createElement('p');
                noMealsMessage.textContent = 'No meals found for this category.';
                appContainer.appendChild(noMealsMessage);
            }
        }

        // Show the form after displaying the meals or message
        const form = document.getElementById('searchForm');
        if (form) {
            form.style.display = 'block';
        }
    }

    // Show the form initially
    const form = document.getElementById('searchForm');
    if (form) {
        form.style.display = 'block';
    }

    // Form submission event
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
            hasSearched = true;

            const categoryInput = document.getElementById('categoryInput').value;

            // Fetch and display meals based on the user's input
            getMealsByCategory(categoryInput)
                .then(meals => {
                    displayMeals(meals);
                })
                .catch(error => console.error(error));
        });
    }
// });
