
$(document).ready(function(){
  fetchGarbage();
});

const fetchGarbage = () => {
  fetch('/api/v1/model')
  .then((response) => response.json())
  .then((json) => {
    appendGarbage(json)
  });
};

const appendGarbage = (json) => {
  json.map((obj) => {
    $('.garbage').append( `
      <div class="garbage-card">
        <p>Name: ${obj.name}</p>
        <p>Reason: ${obj.reason}</p>
        <p>Cleanliness: ${obj.cleanliness}</p>
      </div>
    ` );
  });
};
