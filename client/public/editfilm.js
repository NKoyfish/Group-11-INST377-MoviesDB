/* eslint-disable camelcase */
async function editFilmLoad() {
  const lookup = document.querySelector('#lookup');
  const id = document.querySelector('#id');
  const editform = document.querySelector('#editform');
  const fname = document.querySelector('#title');
  const fgenre = document.querySelector('#genre');
  const fscore = document.querySelector('#score');
  const fwriter = document.querySelector('#writer');
  const fdirector = document.querySelector('#director');
  const fyear = document.querySelector('#year');
  const fcountry = document.querySelector('#country');
  const fstudio = document.querySelector('#studio');
  const fgross = document.querySelector('#gross');
  const fbudget = document.querySelector('#budget');
  const freleased = document.querySelector('#released');
  const fvotes = document.querySelector('#votes');
  const fruntime = document.querySelector('#runtime');
  const factor = document.querySelector('#actor');
  const frating = document.querySelector('#rating');
  list = [
    fname,
    fgenre,
    fscore,
    fwriter,
    fdirector,
    fyear,
    fcountry,
    fstudio,
    fgross,
    fbudget,
    freleased,
    fvotes,
    fruntime,
    factor,
    frating
  ];
  async function populateForm(list, ) {}
  async function loadForm(evt) {
    try {
      const response = await fetch(`/api/movies/${id.value}`);
      const json = await response.json();
      const { data } = json;
      if (data) {
        lookup.innerHTML = 'Look Up Other';
        editform.classList.remove('hide');
        const {
          filmid,
          name,
          director,
          writer,
          genre,
          country,
          runtime,
          year,
          studio,
          score,
          votes,
          budget,
          fross,
          released,
          actor,
          rating
        } = { data };
        await populateForm(list,null,
          name,
          director,
          writer,
          genre,
          country,
          runtime,
          year,
          studio,
          score,
          votes,
          budget,
          fross,
          released,
          actor,
          rating);
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
