console.log('%c HI', 'color: firebrick')

// Wait for the DOM to render in the browser 
document.addEventListener('DOMContentLoaded', () => {

   // allBreeds is a variable for the dog breeds so we don't have to fetch each time we need this data
   let allBreeds = []

   const imgURL= "https://dog.ceo/api/breeds/image/random/4"   
   const breedUrl = 'https://dog.ceo/api/breeds/list/all'
   const dogImgContainer = document.getElementById('dog-image-container')
   const dogBreedUl = document.getElementById('dog-breeds')
   const breedDropdown = document.getElementById('breed-dropdown')

   dogBreedUl.addEventListener('click', function (event) {
      event.target.style.color = "blue"
   })

   breedDropdown.addEventListener('change', /*function*/(event) => {
      const letter = event.target.value
      const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letter))
      dogBreedUl.innerHTML = createDogList(filteredBreeds)
   })

   fetch(imgURL, { method: 'GET' })

      .then(/*function*/(response) => {
      console.log(response)
      if (response.ok) { // if the HTTP status is < 400
         return response.json()  // return the parsed json as a promise 
         }
      })
      .then(/*function*/(dogImgData) => {
         dogImgData.message.forEach(function (imgURL) {
            dogImgContainer.innerHTML += `<img src="${imgURL}">`
         })
         const dogImgString = dogImgData.message.map((imgURL) => {
            return `<img src="${imgURL}">`
         })
      }) 

fetch(breedUrl, { method: 'GET' })
   .then((resp) => resp.json())
   .then((breedData) => {    
      allBreeds = Object.keys(breedData.message)  
      console.log(allBreeds)  
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
