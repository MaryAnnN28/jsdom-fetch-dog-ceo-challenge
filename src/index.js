console.log('%c HI', 'color: firebrick')

// Wait for the DOM to render in the browser 
document.addEventListener('DOMContentLoaded', () => {

   // allBreeds is a variable for the dog breeds so we don't have to fetch each time we need this data
   let allBreeds = []

   // api endpoints
   const imgURL= "https://dog.ceo/api/breeds/image/random/4"   
   const breedUrl = 'https://dog.ceo/api/breeds/list/all'

   //dom nods for attaching event listeners 
   const dogImgContainer = document.getElementById('dog-image-container')
   const dogBreedUl = document.getElementById('dog-breeds')
   const breedDropdown = document.getElementById('breed-dropdown')

   // listen for clicks on the li 
   // event.target will be the node that was clicked. 
   // This will change to blue when clicked. 
   dogBreedUl.addEventListener('click', function (event) {
      event.target.style.color = "blue"
   })


   breedDropdown.addEventListener('change', /*function*/(event) => {
      // filter out the dogs whose names don't match the selected letter 
      const letter = event.target.value  // 'a', 'b', 'c', or 'd' 
      const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letter))
      // set the innerHTML of the unordered list using our render helper function
      dogBreedUl.innerHTML = createDogList(filteredBreeds)
   })

   // fetch will deafult to sending an HTTP GET request 
   fetch(imgURL, { method: 'GET' })
   // the intial 'fetch' returns a promise with a response object inside of it 
      .then(/*function*/(response) => {
      console.log(response)
      // .then takes a callback and passes the return value from the previous promise to it
      if (response.ok) { // if the HTTP status is < 400
         // response.json() return another promise
         // the only way to get the value is with another .then 
         return response.json()  // return the parsed json as a promise 
         }
      })
      .then(/*function*/(dogImgData) => {
      // console.log(dogImgData) // parsed data from our previous .then
         dogImgData.message.forEach(function (imgURL) {
            dogImgContainer.innerHTML += `<img src="${imgURL}">`
         })
         const dogImgString = dogImgData.message.map((imgURL) => {
            return `<img src="${imgURL}">`
         })
      }) 

fetch(breedUrl, { method: 'GET' })
   .then((resp) => resp.json())
   // the return value is our parsed json; the breedDropdown object
   .then((breedData) => {    // breedData is an object whose keys are the breed names
      // set our allBreeds variable so we can hold on to the data in JS instead of fetching each time 
      allBreeds = Object.keys(breedData.message)  // we need access to it
      console.log(allBreeds)  // allBreeds is an array of dog breeds 
      // use our helper function to get the dog breeds onto the page as <li></li>
      dogBreedUl.innerHTML = createDogList(allBreeds)
   }) 

function createDogList(dogBreedArray) {
   const dogLiStringArray = dogBreedArray.map(function (breed) {
      return `<li>${breed}</li>`
   })
   return dogLiStringArray.join('')
}

})
