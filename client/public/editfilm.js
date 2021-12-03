/* eslint-disable camelcase */
async function editFilmLoad() {
  const lookup = document.querySelector('#lookup');
  const id = document.querySelector('#id');
  const editform = document.querySelector('#editform');
  const name = document.querySelector('#title');
  const genre_id = document.querySelector('#genre');
  const score = document.querySelector('#score');
  const writer_id = document.querySelector('#writer');
  const director_id = document.querySelector('#director');
  const year = document.querySelector('#year');
  const country = document.querySelector('#country');
  const studio_id = document.querySelector('#studio');
  const gross = document.querySelector('#gross');
  const budget = document.querySelector('#budget');
  const released = document.querySelector('#released');
  const votes = document.querySelector('#votes');
  const runtime = document.querySelector('#runtime');
  const actor_id = document.querySelector('#actor');
  const rating = document.querySelector('#rating');
  list = [name, genre_id, score, writer_id, director_id, year, country, studio_id, gross,
    budget, released, votes, runtime, actor_id, rating];
  async function populateForm(list, data) {
   
  }
  async function loadForm(evt) {
    try {
      const response = await fetch(`/api/movies/${id.value}`);
      const json = await response.json();
      const {data} = json;
      if (data) {
        lookup.innerHTML = 'Look Up Other';
        editform.classList.remove('hide');
        await populateForm(list, data);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  lookup.addEventListener('click', (event) => {
    loadForm(event);
  });
}

window.onload = editFilmLoad;
