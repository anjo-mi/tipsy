//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function getDrink(){
    let instr = ''
    let name = ''
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
            for (let i = 0 ; i < arrOfDrinks.length ; i++){
                let section = document.createElement('section')
                section.style.display = 'inline-block'
                section.style.height = '600px'
                section.style.width = '400px'
                section.style.overflowWrap = 'scroll'
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

        })
        .catch(err =>
            console.log(`the error '${err} occurred`)
        )
}

document.querySelector('button').addEventListener('click', getDrink)

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

/**
 * Deregisters the carousal when either next or previous
 * button is clicked. On button clicks, deregister and 
 * re-register is required to avoid image change collisions.
 * 
 * Callback is executed which changes the order of images
 * array.
 * 
 * setItem is called to apply the image order changes.
 * 
 * registerCarousal registers a new carousal loop, so that the
 * loop continues forever.
 */
// function onButtonClick(callback) {
//     if (typeof callback !== 'function') return;

//     deregisterCarousel();
//     callback();
//     setItem();
//     registerCarousal();
// }

// /**
//  * Responsible for changing the src on the
//  * carousalItems.
//  */
// function setItem() {
//     var img = document.getElementsByClassName('carousalItems');

//     for (let i = 0; i < img.length; li++) {
//         img.src = images[i];
//     }
// }

// /**
//  * Removes the first image and pushes it to the
//  * end of the array.
//  */
// function shiftForNext() {
//     let firstItem = images.shift();
//     images.push(firstItem);
// }

// /**
//  * Deregisters the existing timer.
//  */
// function deregisterCarousel() {

//     if (timer == null) return;

//     clearInterval(timer);
//     timer = null;
// }

// function registerCarousal() {
//     // Remove any existing timer.
//     deregisterCarousel();

//     // Loop every 1.5 seconds and shifts the 
//     // images from 0 to length direction.
//     timer = setInterval(function () {
//         shiftForNext();

//         // Responsible for changing the image src
//         // on carousal list elements.
//         setItem();
//     }, 1500);
// }

// let timer = null;

// // Registers the next button click.
// document.getElementById('next').addEventListener('click', function () {
//     onButtonClick(function () {
//         shiftForNext();
//     });
// });

// // Registers the previous button click.
// document.getElementById('prev').addEventListener('click', function () {
//     onButtonClick(function () {
//         // Removes the last element of the images array
//         let lastItem = images.pop();

//         // And pushes it to the first position.
//         images.unshift(lastItem);
//     });
// });

// // Registers the carousal
// registerCarousal();