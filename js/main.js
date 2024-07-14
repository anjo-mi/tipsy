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
            let carousel = document.querySelector('.carousel')
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
                section.classList.add('swiper-slide')
                let heading = document.createElement('h3')
                heading.innerText = arrOfDrinks[i].name
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
            // sections[0].classList.replace('hidden', 'featured')
            // sections[1].classList.replace('hidden', 'next')
            // sections[sections.length - 1].classList.replace('hidden', 'prev')
            // sections[2].classList.replace('hidden', 'twoNext')
            // sections[sections.length-2].classList.replace('hidden', 'twoFrom')
            // document.querySelector('.goBack').addEventListener('click', () => {
            //     prev(sections)
            // })
            // document.querySelector('.goForward').addEventListener('click', () => {
            //     next(sections)
            // })
            const swiper = new Swiper('.carousel', {
                loop: true,
              
                // If we need pagination
                pagination: {
                  el: '.swiper-pagination',
                },
              
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              });
        })
        // .catch(err =>
        //     console.log(`the error '${err} occurred`)
        // )
}


function prev(drinkArr){
    drinkArr[0].classList.replace('featured', 'next')
    drinkArr[1].classList.replace('next', 'twoNext')
    drinkArr[2].classList.replace('twoNext', 'hidden')
    drinkArr[drinkArr.length-3].classList.replace('hidden', 'twoFrom')
    drinkArr[drinkArr.length-1].classList.replace('prev', 'featured')
    drinkArr[drinkArr.length-2].classList.replace('twoFrom', 'prev')
    let stored = drinkArr.pop()
    drinkArr.unshift(stored)
    console.log('prev' + drinkArr)
}

function next(drinkArr){
    drinkArr[0].classList.replace('featured', 'prev')
    drinkArr[1].classList.replace('next', 'featured')
    drinkArr[2].classList.replace('twoNext', 'next')
    drinkArr[3].classList.replace('hidden', 'twoNext')
    drinkArr[drinkArr.length-1].classList.replace('prev', 'twoFrom')
    drinkArr[drinkArr.length-2].classList.replace('twoFrom', 'hidden')
    let stored = drinkArr.shift()
    drinkArr.push(stored)
    console.log('next' + drinkArr)
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
