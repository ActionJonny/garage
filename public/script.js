let sparklingCount = 0;
let dustyCount = 0;
let rancidCount = 0;
let fetchArray = []

$(document).ready(() => {
  fetchGarbage();
})

const fetchGarbage = () => {
  $('.garbage-card').remove()
  const objArray = []
  fetch('/api/v1/model', {
    async:false,
  })
  .then((response) => response.json())
  .then((json) => {
    fetchArray.push(json)
    json.map(garbage => {
      objArray.push(garbage)
      appendGarbage(garbage)
    })
    numberOfItems(objArray)
  });
};

const numberOfItems = (array) => {
  appendNumberOfItemsDiv(array.length)
  checkCleanlinessQuantity(array)
}

const checkCleanlinessQuantity = (array) => {
  array.map((obj, index) => {
    if(obj.cleanliness === 'sparkling') {
      sparklingCount++
    } else if(obj.cleanliness === 'dusty') {
      dustyCount++
    } else if(obj.cleanliness === 'rancid') {
      rancidCount++
    }
  })
  updateQuantity()
}

const updateQuantity = () => {
  $('.counter').remove()
  $('.count').append(`
    <div class="counter">
      <div class="sparkling-count">Sparkling: ${sparklingCount}</div>
      <div class="dusty-count">Dusty: ${dustyCount}</div>
      <div class="rancid-count">Rancid: ${rancidCount}</div>
    </div>
    `)
}

const appendNumberOfItemsDiv = (length) => {
  $('.array-length').remove()
  $('.count').append(`
    <div class="array-length">Number of Items: ${length}<div>
  `)
}

const addNewGarbage = () => {
  let nameVal = $('.new-name').val()
  let reasonVal = $('.new-reason').val()
  let cleanlinessVal = $('.new-cleanliness').val()

  if(cleanlinessVal === 'sparkling') {
    sparklingCount++
  } else if(cleanlinessVal === 'dusty') {
    dustyCount++
  } else if(cleanlinessVal === 'rancid') {
    rancidCount++
  }

  updateQuantity()

  checkForEmptyString(nameVal, reasonVal, cleanlinessVal)

  clearInput()
}

const clearInput = () => {
  $('.new-name').val('')
  $('.new-reason').val('')
}

const checkForEmptyString = (name, reason, cleanliness) => {
  $('.error-message').remove()
  if(name === '' || reason === '') {
    displayError()
  } else {
    postModel(name, reason, cleanliness)
  }
}

const postModel = (nameVal, reasonVal, cleanlinessVal) => {
  fetch('/api/v1/model', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nameVal, reason: reasonVal, cleanliness: cleanlinessVal })
  })
  .then(response => {
    return response.json()
  })
  .then(json => {
    fetchArray.push(json)
    appendGarbage(json)
    fetchGarbage()
  })
  .catch(error => displayError(error))
}

const appendGarbage = (obj) => {
  $('.garbage').append(`
    <div class="garbage-card">
    <p>Name: ${obj.name}</p>
    <p>Reason: ${obj.reason}</p>
    <p>Cleanliness: ${obj.cleanliness}</p>
    </div>
  `);
}

const displayError = () => {
  $('.add-new-card').append(`
    <p class="error-message">You are missing information</p>
  `)
}

$('.sort').on('click', () => {
  fetchArray.map((array) => {
    array.map((a, b) => {
      compareName(a, b)
    })
  })
})

const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0
}

$('.add-new').on('click', () => {
  addNewGarbage()
})
