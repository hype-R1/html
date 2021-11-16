window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed')
  fetchParks()
  addEventListeners()
})


// Fetch
let parks

function fetchParks() {
const url = 'https://developer.nps.gov/api/v1/parks?api_key=wSlcKl1LSOpHXf164FTShbQZC4cmu1VWTJiipnFk&limit=500'
fetch(url)
  .then(res => {
    return res.json() 
  })
  .then(data => {
    parks = data
    console.log(parks)
  })
}


// Event Listener for Submit and Selected State
function addEventListeners() {
const routeBtn = document.getElementById('submit')

routeBtn.addEventListener('click', () => {
    const state = document.getElementById('states-dropdown')
    const stateSelect = [state].map(option => option.value) // array with the state selected
    console.log(stateSelect)
    renderParks(stateSelect) 
})
}


// Render Parks Function
const noLike = '♡'
const meLike = '♥'

function renderParks(stateSelect) {
console.log("hello")
  const parkDiv = document.getElementById('park-results')
  parkDiv.innerHTML = ' '
  console.log(stateSelect)
  let parkFltr = parks.data.filter(el => {
          return el.states.includes(stateSelect)
      }
  )
  console.log(parkFltr)

  for (let i = 0; i < parkFltr.length; i++) {
          const ul = document.createElement('ul')
          const img = document.createElement('img')
          const descrip = document.createElement('p')
          const directions = document.createElement('a')
          const liker = document.createElement('button')
          liker.textContent = noLike
          directions.textContent = 'Get Directions'
          directions.href = parkFltr[i].directionsUrl
          directions.target = '_blank'
          img.src = parkFltr[i].images[0].url
          ul.textContent = parkFltr[i].fullName
          descrip.textContent = parkFltr[i].description
          parkDiv.append(img, ul, descrip, directions, liker) 
          liker.addEventListener('click', likePark)
          //click like park 
          }
      }  

//like button
const likePark = (e) => {
  const liker = e.target
  const like = liker.textContent
  if(like===noLike) {
    liker.textContent = meLike
  } else {
    //unlike or no like part
    liker.textContent = noLike
  }
}

