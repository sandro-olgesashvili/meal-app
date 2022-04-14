const meals = document.getElementById('meals')


async function getRandomMeal () {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    const randomMeal = data.meals[0]
    console.log(randomMeal)


    addMeal(randomMeal, true)
}

getRandomMeal();

async function getMealById(id) {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php' + id);
    const data = await res.json();

}

async function getMealsBySearch(term) {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php' + term);
    const data = await res.json();

}


function addMeal(mealData, random = false ) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random recipe</span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fa fa-heart"></i>
            </button>
        </div>
    `

    const btn = meal.querySelector('.meal-body .fav-btn')


    btn.addEventListener('click', () => {
        if(btn.classList.contains('active')) {
            removeLS(mealData.idMeal)
            btn.classList.remove('active')
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active')
        }

        btn.classList.toggle('active')
    })

    meals.appendChild(meal);
}

function addMealLS (mealId) {
    const mealIds = getMealLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds, [...mealIds, mealId]))
}

function removeLS (mealId) {
    const mealIds = getMealLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter( id => {
        return id !== mealId
    })))
} 

function getMealLS () {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds
}