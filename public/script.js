
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
    json.map(garbage => {
      objArray.push(garbage)
      numberOfItems(objArray)
      appendGarbage(garbage)
    })
  });
};

const numberOfItems = (array) => {
  appendNumberOfItemsDiv(array.length)
  checkCleanlinessQuantity(array)
}

const checkCleanlinessQuantity = (array) => {
  array.map(obj => {
    console.log(obj.cleanliness);
  })
}

const appendNumberOfItemsDiv = (length) => {
  $('.arrayLength').remove()
  $('.count').append(`
    <div class="arrayLength">Number of Items: ${length}<div>
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

$('.add-new').on('click', () => {
  addNewGarbage()
})





      // $('.garbage').on('click', '.garbage-card', () => {
      //   const folderId = $(this).attr('name')
      //   console.log(folderId);
      // })
