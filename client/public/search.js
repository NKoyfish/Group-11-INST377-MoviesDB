async function moviesReq() {
  const searchinput = document.querySelector('.search');
  let page = 0;
  const allData = await fetch('/api/movies', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  });
  logData = await allData.json();
  let filterData = logData;

  //function for when user clicks on a poster/poster text
  async function click(id) {
    console.log(id, 'clicked poster');
    try {
      const response = await fetch(`/api/movies/${id}` , {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }});
        let movie = await response.json()
        let movieData = movie.data
        const result = document.querySelector('.results');
        let html = `<ul class='moviestatlist'>${movieData.name}<br>
        ${movieData.year}<br>
        ${movieData.score}<br>
        ${movieData.studio_id}<br>
        ${movieData.country}<br>
        ${movieData.writer_id}<br>
        ${movieData.director_id}<br>
        ${movieData.actor_id}<br>
        ${movieData.votes}<br>
        ${movieData.budget}<br>

        </ul>`
        result.innerHTML=html
    } catch (err) {
      console.log(err);
    }
  }

  async function posterEvents(list) {
    list.forEach((elm) => {
      const movieElm = document.querySelector(`[id='${elm.film_id}']`);
      movieElm.addEventListener('click', (event) => {
        //console.log(event);
        // two cases click on text or "poster image"
        if (event.path.length > 7) {
          clickId = event.path[1].attributes[0].nodeValue;
          click(clickId);
        } else {
          clickId = event.path[0].attributes[0].nodeValue;
          click(clickId);
        }
      });
    });
  }

  async function displayMovieLogs(list) {
    if (page < 0) page = 0;
    if (page > list.length / 50) page = list.length / 50 - 1;
    const slice = list.slice(50 * page, 50 * (page + 1));
    const result = document.querySelector('.results');
    slice.forEach((movie) => {
      result.innerHTML += `<li id="${movie.film_id}"class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
        </li>`;
    });
    posterEvents(slice);
    console.log('display', slice);
  }
 
  
  // console logs all records and displays

  const result = document.querySelector('.results');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  next.addEventListener('click', () => {
    page++;
    result.innerHTML = '';
    displayMovieLogs(filterData);
  });

  prev.addEventListener('click', (evt) => {
    page--;
    result.innerHTML = '';
    displayMovieLogs(filterData);
  });

  function findMatches(wordToMatch, array) {
    if (!wordToMatch) {
      result.innerHTML = '';
    }
    const tempData = logData.data;
    return tempData.filter((search) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return search.name.match(regex);
    });
  }

  function displayMatches(event) {
    console.log(event.value);
    const matchArray = findMatches(event.target.value, logData.data);
    filterData = matchArray;
    displayMovieLogs(filterData);
  }

  searchinput.addEventListener('keyup', (evt) => {
    result.innerHTML = '';
    page = 0
    displayMatches(evt);
  });
}

window.onload = moviesReq;
