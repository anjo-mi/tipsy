//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function getDrink(){
    let instr = ''
    let name = ''
    let drink = document.querySelector('input').value
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks)
            instr = document.createElement('p')
            instr.innerText = data.drinks[0].strInstructions
            document.querySelector('h3').append(instr)
            name = document.createElement('p')
            name.innerText = data.drinks[0].strDrink
            document.querySelector('h2').append(name)
            document.querySelector('img').src = data.drinks[0].strDrinkThumb
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


// create an array of objects
// each object contains drink name, ingredients, picture, instructions
//      do so via a constructor

// node express orm vue.js