/* eslint-disable camelcase */
async function editFilmLoad() {
  const lookup = document.querySelector('#lookup');
  const id = document.querySelector('#id');
  const editform = document.querySelector('#editform');
  const form = document.querySelector('#form');
  const submit = document.querySelector('#submit');

  async function populateForm(data) {
    // console.log(data.data)
    const film_id = document.querySelector('#filmid');
    const name = document.querySelector('#title');
    const director_id = document.querySelector('#director');
    const writer_id = document.querySelector('#writer');
    const genre_id = document.querySelector('#genre');
    const score = document.querySelector('#score');
    const votes = document.querySelector('#votes');
    const year = document.querySelector('#year');
    const country = document.querySelector('#country');
    const studio_id = document.querySelector('#studio');
    const gross = document.querySelector('#gross');
    const budget = document.querySelector('#budget');
    const released = document.querySelector('#released');
    const runtime = document.querySelector('#runtime');
    const actor_id = document.querySelector('#actor');
    const rating = document.querySelector('#rating');
    list = [
      film_id,
      name,
      director_id,
      writer_id,
      genre_id,
      country,
      runtime,
      year,
      studio_id,
      score,
      votes,
      budget,
      gross,
      released,
      actor_id,
      rating
    ];
    count = 0;
    Object.keys(data.data).forEach((elm) => {
      // console.log(elm, data.data[elm])
      field = data.data[elm];
      // weird form interaction NaN
      if (['name', 'released', 'country', 'rating'].includes(elm)) {
        // console.log(elm, count, field)
        newField = String(field);
        list[count].value = newField;
      }
      try {
        newField = parseFloat(field);
        field = newField;
      } catch (err) {
        list[count].value = field;
      }
      list[count].value = field;

      count++;
    });
    // bug here have to regularly do this instead of using loops
    name.value = data.data.name;
    rating.value = data.data.rating;
    country.value = data.data.country;

    submit.addEventListener('click', () => {
      console.log('hello');
      const formobj = formToObject(form);
    });
  }

  async function loadForm(evt) {
    try {
      if (id.value != null && id.value.length !== 0) {
        const response = await fetch(`/api/movies/${id.value}`);
        const json = await response.json();
        const { data } = json;
        if (data) {
          lookup.innerHTML = 'Look Up Other';
          editform.classList.remove('hide');

          await populateForm(json);

          // console.log(data);
        } else {
          console.log('empty');
          // hide the form if the movie DNE
          editform.classList.add('hide');
          alert('ID not valid Search Again');
          lookup.innerHTML = 'Not Found';
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  lookup.addEventListener('click', (event) => {
    loadForm(event);
  });
}

window.onload = editFilmLoad;
