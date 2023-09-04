function openNav() {

    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    function fetchAPI(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.log(error));
    }
}

async function DisplayRandom() {


    var Meals = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
    final = Meals.json;
    function displayMeals() {

        var cartona = ``;
        for (var i = 0; i < final.length; i++) {

            cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black">
                <div class="card-body">
                <p>rgueuitpgutg</p>
                 <img src="${final[i].strMealThumb}" class="card-img-top" alt="...">
                    <h5 class="card-title">${final[i].strMeal}</h5>


                </div>
                    </div>
                `

        }
        document.getElementById('Data').innerHTML = cartona;

    }
}


function showSearchForm() {
    var cartona = ``;
    cartona += `
    <div class="search-container">
    <input type="text" id="mealNameInput" placeholder="Search by meal name">
    <input type="text" id="firstLetterInput" placeholder="Search by meal first letter">
    <button onclick="searchByMealName(${document.getElementById("mealNameInput")})">Search by Name</button>
    <button onclick="searchByFirstLetter(${document.getElementById("firstLetterInput")})">Search by First Letter</button>
</div>
`;
    document.getElementById('Data').innerHTML = cartona;
}
async function searchByFirstLetter() {
    const letter = document.getElementById('firstLetterInput').value;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`);
        const data = await response.json();
        const meals = data.meals;
        let cartona = '';

        meals.forEach((meals) => {
            cartona += `
                <div class="meal-card col-md-3 shadow-sm p-3 mb-5 text-white bg-black">
                    <img class="w-100" src="${meals.strMealThumb}" alt="${meals.strMeal}">
                    <h5>${meals.strMeal}</h5>
                    <p>Instructions:</p>
                    <p>${meals.strInstructions}</p>
                </div>
            `;
        });

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}

async function searchByCategory(category) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        const meals = data.meals;
        let cartona = '';

        meals.forEach((meal) => {
            cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black onclick="searchByMealName();">
                    <div class="card-body">
                         
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <h5 class="card-title">${meal.strMeal}</h5>   
                    </div>
                </div>
            `;
        });

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}

async function searchByMealName() {
    const name = document.getElementById('mealNameInput').value;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        const meals = data.meals;
        let cartona = '';

        meals.forEach((meal) => {
            cartona += `
                <div class="col-md-3 p-3 mb-5 text-white bg-black onclick="handleClick(${meal.strMeal})")>
                    <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h5>${meal.strMeal}</h5>
                    <p>Instructions:</p>
                    <p>${meal.strInstructions}</p>
                </div>
            `;
        });

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}
function handleClick(meal) {
    getMealDetails(meal);
}
async function getMealDetails(mealName) {
    try {
        console.log("55");
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await response.json();
        const meal = data.meals;
        let cartona = '';
        console.log("meal");
        meal.forEach((meal) => {
            cartona += `
            <div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h5>${meal.strMeal}</h5>
                <p>Instructions: ${meal.strInstructions}</p>
                <p>Area: ${meal.strArea}</p>
                <p>Category: ${meal.strCategory}</p>
                <p>Recipes: ${meal.strIngredient1}, ${meal.strIngredient2}, ...</p>
                <p>Tags: ${meal.strTags}</p>
                <p>Meal Source: ${meal.strSource}</p>
                <p>Meal in YouTube: <a href="https://www.youtube.com/watch?v=${meal.strYoutube.slice(-11)}" target="_blank">${meal.strMeal}</a></p>
            </div>
        `;
        });

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}
async function showCategories() {
    var Categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    var result = await Categories.json();
    var finalResult = result.categories;
    var cartona = ``;
    var l = 15;
    for (var i = 0; i < finalResult.length; i++) {

        cartona += `
                <div class="col-md-3  text-white bg-black" onclick=searchByCategory('${finalResult[i].strCategory}');>
                <div class="card-body ">
                <div class="card-top">
                 <img src="${finalResult[i].strCategoryThumb}" class="card-img-top" alt="...">
                 </div>
                 <div class="card-bottom">
                    <h5 class="card-title">${finalResult[i].strCategory}</h5>
                    <p class="card-text" >${finalResult[i].strCategoryDescription}</p>
                    </div>
                </div>
                    </div>
                `

    }
    document.getElementById('Data').innerHTML = cartona;



}
async function searchByArea(area) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await response.json();
        const meal = data.meals;
        let cartona = '';

        meal.forEach((meal) => {
            cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black onclick=getMealDetails('${meal.strArea}'); >
                    <div class="card-body">
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <h5 class="card-title">${meal.strMeal}</h5>   
                    </div>
                </div>
            `;
        });

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}

async function showArea() {
    var Area = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var result = await Area.json();
    var finalResult = result.meals;
    var cartona = ``;
    for (var i = 0; i < finalResult.length; i++) {

        cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black onclick=" onclick=searchByArea('${finalResult[i].strArea}');>
                <div class="card-body">
                <i class="fa-solid fa-house-laptop"></i>">
                    <h5 class="card-title">${finalResult[i].strArea}</h5>
                 
                </div>
                    </div>
                `

    }
    document.getElementById('Data').innerHTML = cartona;

}

async function searchByIngrediants(In) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${In}`);
        const data = await response.json();
        const meal = data.meals;
        let cartona = '';

        for (var i = 0; i < 12; i++) {
            cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black onclick=getMealDetails('${meal[i].strMeal}'); >
                    <div class="card-body">
                         
                        <img src="${meal[i].strMealThumb}" class="card-img-top" alt="...">
                        <h5 class="card-title">${meal[i].strMeal}</h5>   
                    </div>
                </div>
            `;
        };

        document.getElementById('Data').innerHTML = cartona;
    } catch (error) {
        console.error('An error occurred during the search:', error);
    }
}
async function showIngredients() {
    var Ingredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var result = await Ingredients.json();
    var finalResult = result.meals;

    var cartona = ``;
    for (var i = 0; i < 12; i++) {

        cartona += `
                <div class="col-md-3 shadow-sm p-3 mb-5 text-white bg-black onclick=searchByIngrediants('${finalResult[i].strIngredient}'); ">
                <div class="card-body">
                
                
                    <h5 class="card-title">${finalResult[i].strIngredient}</h5>
                    <p class="card-text">${finalResult[i].strDescription}</p>
                 
                </div>
                    </div>
                `

    }
    document.getElementById('Data').innerHTML = cartona;

}


function showContactForm() {
    const regexName = /^[A-Za-z\s]+$/;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPhone = /^\d{10}$/;
    const regexAge = /^(1[89]|[2-9]\d)$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    const formHTML = `
        <h2>Contact Us - Sign Up Form</h2>
        <form>
            <input type="text" id="nameInput" placeholder="Your Name" required>
            <input type="text" id="emailInput" placeholder="Your Email" required>
            <input type="text" id="phoneInput" placeholder="Your Phone" required>
            <input type="text" id="ageInput" placeholder="Your Age" required>
            <input type="password" id="passwordInput" placeholder="Password" required>
            <input type="password" id="repasswordInput" placeholder="RePassword" required>
            <button type="submit" id="submitButton" disabled>Submit</button>
        </form>
        <p id="errorMessage" style="color: red;"></p>
    `;
    formContainer.innerHTML = formHTML;

    const nameInput = formContainer.querySelector('#nameInput');
    const emailInput = formContainer.querySelector('#emailInput');
    const phoneInput = formContainer.querySelector('#phoneInput');
    const ageInput = formContainer.querySelector('#ageInput');
    const passwordInput = formContainer.querySelector('#passwordInput');
    const repasswordInput = formContainer.querySelector('#repasswordInput');
    const submitButton = formContainer.querySelector('#submitButton');
    const errorMessage = formContainer.querySelector('#errorMessage');

    function validateForm() {
        const isValidName = regexName.test(nameInput.value);
        const isValidEmail = regexEmail.test(emailInput.value);
        const isValidPhone = regexPhone.test(phoneInput.value);
        const isValidAge = regexAge.test(ageInput.value);
        const isValidPassword = regexPassword.test(passwordInput.value);
        const isValidRePassword = regexPassword.test(repasswordInput.value) && repasswordInput.value === passwordInput.value;

        submitButton.disabled = !(isValidName && isValidEmail && isValidPassword && isValidPhone && isValidAge && isValidRePassword);

        errorMessage.textContent = '';

        if (!isValidName) {
            errorMessage.textContent += 'Please enter a valid name.\n';
        }
        if (!isValidEmail) {
            errorMessage.textContent += 'Please enter a valid email address.\n';
        }
        if (!isValidPhone) {
            errorMessage.textContent += 'Please enter a valid phone number.\n';
        }
        if (!isValidAge) {
            errorMessage.textContent += 'Please enter a valid age (18 or older).\n';
        }
        if (!isValidPassword) {
            errorMessage.textContent += 'Please enter a valid password (at least 8 characters with at least one uppercase letter, one lowercase letter, and one digit).\n';
        }
        if (!isValidRePassword) {
            errorMessage.textContent += 'Passwords do not match.\n';
        }
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    phoneInput.addEventListener('input', validateForm);
    ageInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    repasswordInput.addEventListener('input', validateForm);

    document.getElementById('Data').innerHTML = '';
    document.getElementById('Data').appendChild(formContainer);
}


