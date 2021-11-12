const garage = "lewagon-garage";
const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`

// Selections
const form = document.getElementById('new-car');
const carsList = document.querySelector('.cars-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const brand = document.querySelector('#brand').value;
  const model = document.querySelector('#model').value;
  const plate = document.querySelector('#plate').value;
  const owner = document.querySelector('#owner').value;

  const formObject = {
    brand: brand,
    model: model,
    plate: plate,
    owner: owner
  }
  addCarsToGarage(formObject);
  fetchCarsInGarage();
})

const fetchCarsInGarage = () => {
  carsList.innerHTML = ''
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach(element => {
        const newItem = `<div class="car-image">
        <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
      </div>
      <div class="car-info">
        <h4>${element.brand} ${element.model}</h4>
        <p><strong>Owner:</strong> ${element.owner}</p>
        <p><strong>Plate:</strong> ${element.plate}</p>
      </div>
`;
        carsList.insertAdjacentHTML("afterbegin", newItem);
      })
    });
};

const addCarsToGarage = (object) => {

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ brand: object.brand, model: object.model, plate: object.plate, owner: object.owner})
  })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
    });
};
