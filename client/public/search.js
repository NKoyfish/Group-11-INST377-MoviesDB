async function moviesReq() {
  const searchinput = document.querySelector('.search');
  let page = 0;
  const allData = await fetch('/api/movies', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  });
  logData = await allData.json();
  let filterData = logData;

  // function for when user clicks on a poster/poster text
  async function initBack() {
    const result = document.querySelector('.results');
    document.querySelector('#back').addEventListener('click', ()=> {
      result.innerHTML = ""
      const slice = filterData.slice(50 * page, 50 * (page + 1));
      slice.forEach((movie) => {
        result.innerHTML += `<li id="${movie.film_id}"class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
        </li>`;
      });
      posterEvents(slice);
    });
  }
  async function click(id) {
    console.log(id, 'clicked poster');
    try {
      const response = await fetch(`/api/movies/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const movie = await response.json();
      const movieData = movie.data;
      const result = document.querySelector('.results');
      const html = `<ul class='moviestatlist' style ="text-align: right">
        Film Title: ${movieData.name}<br>
        Year: ${movieData.year}<br>
        Rated: ${movieData.rating}<br>
        Score: ${movieData.score}<br>
        Studio: ${movieData.studio_id}<br>
        Country: ${movieData.country}<br>
        Writer: ${movieData.writer_id}<br>
        Director: ${movieData.director_id}<br>
        Actor: ${movieData.actor_id}<br>
        Votes: ${movieData.votes}<br>
        Budget: ${movieData.budget}<br>
        </ul>
        <div id="back" class="button"style="width: 10%">Go Back</div>`;
      result.innerHTML = html;
      await initBack();
    } catch (err) {
      console.log(err);
    }
  }

  async function posterEvents(list) {
    list.forEach((elm) => {
      const movieElm = document.querySelector(`[id='${elm.film_id}']`);
      movieElm.addEventListener('click', (event) => {
        // console.log(event);
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
    const result = document.querySelector('.results');
    if (list) {
      if (page < 0) page = 0;
      if (page > list.length / 50) page = list.length / 50 - 1;
      const slice = list.slice(50 * page, 50 * (page + 1));
      slice.forEach((movie) => {
        result.innerHTML += `<li id="${movie.film_id}"class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
        </li>`;
      });
      //add event listeners to posters
      posterEvents(slice);
      //console.log('display', slice);
    }
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
    page = 0;
    displayMatches(evt);
  });
}

window.onload = moviesReq;
