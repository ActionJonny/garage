
$(document).ready(() => {
  fetchGarbage();
});

const fetchGarbage = () => {
  fetch('/api/v1/model')
  .then((response) => response.json())
  .then((json) => {
    json.map(garbage => appendGarbage(garbage))
  });
};

$('.add-new').on('click', () => {
  addNewGarbage()
})

const addNewGarbage = () => {
  let nameVal = $('.new-name').val()
  let reasonVal = $('.new-reason').val()
  let cleanlinessVal = $('.new-cleanliness').val()

  checkForEmptyString(nameVal, reasonVal, cleanlinessVal)

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
    return appendGarbage(json)
  })
  .catch(error => displayError(error))
}

const appendGarbage = (obj) => {
  $('.garbage').append( `
    <div class="garbage-card">
      <p>Name: ${obj.name}</p>
      <p>Reason: ${obj.reason}</p>
      <p>Cleanliness: ${obj.cleanliness}</p>
    </div>
  ` );
}

const displayError = () => {
  $('.add-new-card').append(`
    <p class="error-message">You are missing information</p>
  `)
}
