//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function getDrink(){
    let drink = document.querySelector('input').value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.drinks)
            let arrOfDrinks = []
            for (let i = 0 ; i < data.drinks.length ; i ++){
                let ingreds = []
                for (let key in data.drinks[i]){
                    if ((key.startsWith('strIngredient')) && (data.drinks[i][key] !== null)){
                        ingreds.push(data.drinks[i][key])
                    }
                }
                arrOfDrinks[i] = new DrinkList(data.drinks[i].strDrink, ingreds, data.drinks[i].strDrinkThumb, data.drinks[i].strInstructions)
            }
            console.log(arrOfDrinks)
            let carousel = document.getElementById('carousel')
            let prevButton = document.createElement('button')
            let nextButton = document.createElement('button')
            prevButton.classList.add('goBack')
            nextButton.classList.add('goForward')
            for (let i = 0 ; i < arrOfDrinks.length ; i++){
                let section = document.createElement('section')
                // section.style.display = 'inline-block'
                section.style.height = '600px'
                section.style.width = '400px'
                section.classList.add('hidden')
                section.classList.add('drink')
                let heading = document.createElement('h3')
                heading = arrOfDrinks[i].name
                let pic = document.createElement('img')
                pic.src = arrOfDrinks[i].picture
                let ingredientFigure = document.createElement('figure')
                let ingredCaption = document.createElement('figcaption')
                ingredCaption.innerText = 'Ingredients'
                ingredientFigure.append(ingredCaption)
                let listOfIngreds = document.createElement('ol')
                arrOfDrinks[i].ingredients.forEach(el => {
                    let singleIngred = document.createElement('li')
                    singleIngred.innerText = el
                    listOfIngreds.append(singleIngred)
                })
                ingredCaption.insertAdjacentElement('afterend', listOfIngreds)
                let howToMake = document.createElement('p')
                howToMake.innerText = arrOfDrinks[i].instructions
                section.append(heading, pic, ingredientFigure, howToMake)
                carousel.append(section)
            }
            console.log(carousel)
            const sections = Array.from(carousel.children)
            sections[0].classList.replace('hidden', 'featured')
            // arrOfDrinks[0].classList.toggle('featured')
            sections[1].classList.replace('hidden', 'next')
            // arrOfDrinks[1].classList.toggle('next')
            sections[sections.length - 1].classList.replace('hidden', 'prev')
            // arrOfDrinks[arrOfDrinks.length-1].classList.toggle('prev')
            sections[2].classList.replace('hidden', 'twoNext')
            // arrOfDrinks[2].classList.toggle('twoAway')
            sections[sections.length-2].classList.replace('hidden', 'twoFrom')
            // arrOfDrinks[arrOfDrinks.length-2].classList.toggle('twoAway')
            document.querySelector('.goBack').addEventListener('click', () => {
                prev(sections)
            })
            document.querySelector('.goForward').addEventListener('click', () => {
                next(sections)
            })
        })
        .catch(err =>
            console.log(`the error '${err} occurred`)
        )
}

function prev(drinkArr){
    let stored = drinkArr.pop()
    drinkArr.unshift(stored)
    drinkArr[0].classList.replace('featured', 'next')
    drinkArr[1].classList.replace('next', 'twoNext')
    drinkArr[2].classList.replace('twoNext', 'hidden')
    drinkArr[drinkArr.length-3].classList.replace('hidden', 'twoPrev')
    drinkArr[drinkArr.length-1].classList.replace('prev', 'featured')
    drinkArr[drinkArr.length-2].classList.replace('twoPrev', 'prev')
}

function next(drinkArr){
    drinkArr[0].classList.replace('featured', 'prev')
    drinkArr[1].classList.replace('next', 'featured')
    drinkArr[2].classList.replace('twoNext', 'next')
    drinkArr[3].classList.replace('hidden', 'twoNext')
    drinkArr[drinkArr.length-1].classList.replace('prev', 'twoPrev')
    drinkArr[drinkArr.length-2].classList.replace('twoPrev', 'hidden')
    let stored = drinkArr.shift()
    drinkArr.push(stored)
}



document.querySelector('.find').addEventListener('click', getDrink)


class DrinkList{
    constructor(name, ingredients, picture, instructions){
        this.name = name
        this.ingredients = ingredients
        this.picture = picture
        this.instructions = instructions
    }
    showPic(){
        document.querySelector('').classList.toggle('hidden')
    }
    showDetails(){
        document.querySelector('').classList.toggle('hidden')
    }
    hidePic(){
        document.querySelector('').classList.toggle('hidden')
    }
    hideDetails(){
        document.querySelector('').classList.toggle('hidden')

    }
}
