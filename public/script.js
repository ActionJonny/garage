
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

const displayError = (error) => {
  $('.add-new-card').append(`
    <p>${error}</p>
  `)
}
