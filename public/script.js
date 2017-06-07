let reverse = 0

$(document).ready(() => {
  fetchGarbage();
})

const fetchGarbage = () => {
  $('.garbage-card').remove()
  fetch('/api/v1/model', {
    async:false,
  })
  .then((response) => response.json())
  .then((json) => {
    json.forEach((garbage) => {
      appendGarbage(garbage)
    })
    numberOfItems(json)
  });
};

const numberOfItems = (array) => {
  appendNumberOfItemsDiv(array.length)
  checkCleanlinessQuantity(array)
}

const checkCleanlinessQuantity = (array) => {
  let sparklingCount = 0;
  let dustyCount = 0;
  let rancidCount = 0;
  array.forEach((obj) => {
    if(obj.cleanliness === 'sparkling') {
      sparklingCount++
    } else if(obj.cleanliness === 'dusty') {
      dustyCount++
    } else if(obj.cleanliness === 'rancid') {
      rancidCount++
    }
    updateQuantity(sparklingCount, dustyCount, rancidCount)
  })
}

const updateQuantity = (sparklingCount, dustyCount, rancidCount) => {
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
    appendGarbage(json)
    fetchGarbage()
  })
  .catch(error => displayError(error))
}

const appendGarbage = (obj) => {
  $('.garbage').append(`
    <div class="garbage-card">
      <p>Name: ${obj.name}</p>
      <div class="hidden">
        <p>Reason: ${obj.reason}</p>
        <p>Cleanliness: ${obj.cleanliness}</p>
      </div>
    </div>
  `);
}

const displayError = () => {
  $('.add-new-card').append(`
    <p class="error-message">You are missing information</p>
  `)
}

const sort = (array) => {
  array.sort((obj1, obj2) => {
    if(obj1.name < obj2.name) {
      return -1
    }
    if (obj1.name > obj2.name) {
      return 1
    }
  })
  if(reverse % 2 === 0) {
    reverse++
    array.reverse()
  } else {
    reverse++
  }
}

$('.sort').on('click', () => {
  $('.garbage-card').remove()
  fetch('/api/v1/model', {
    async:false,
  })
  .then((response) => response.json())
  .then((json) => {
    sort(json)
    json.forEach((garbage) => {
      appendGarbage(garbage)
    })
  });
})

$('.add-new').on('click', () => {
  addNewGarbage()
})

$('.garbage').on('click', '.garbage-card', function() {
  $(this).find('div').toggleClass('hidden')
})
